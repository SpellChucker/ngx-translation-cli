const fs = require('fs').promises;
const path = require('path');
const recursive = require('recursive-readdir');
const findInFile = require('../utils/find-in-file');
const { removeEmptyKeys } = require('../utils/object-utils');
const { getTranslationKeys } = require('../utils/translations');
const error = require('../utils/error')

function ignoreFunc(file, stats) {
  if (stats.isDirectory()) {
    return false;
  }

  // We use text keys in the menu configuration.
  if (path.basename(file) === 'menu.json') {
    return false;
  }

  // Ignore all other files that are not .html or .ts
  if (path.extname(file) != '.html' && path.extname(file) != '.ts') {
    return true;
  }
}

module.exports = async (args) => {
  const fileName = args.translations || args.t;
  const directory = args.directory || args.d;
  const identifier = args.identifier || args.i;

  if (!fileName || !directory) {
    error('Both translation file (-t option) and directory (-d option) are required', true);
  }

  try {
    const data = await fs.readFile(fileName, { encoding: 'utf-8' });
    const translationObj = JSON.parse(data);
    const translationKeys = getTranslationKeys(translationObj, null, []);

    try {
      const files = await recursive(directory, ['*node_modules*', '*dist*', '*coverage', '*.spec.ts', ignoreFunc]);

      let zombies = [ ...translationKeys ];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        zombies = findInFile(file, zombies);
      } 

      let unzombified = { ...translationObj };
      for (let index = 0; index < zombies.length; index++) {
        const zombie = zombies[index];
        const zombieKeys = zombie.split('.');
        const prop = zombieKeys.pop();
        const parent = zombieKeys.reduce((obj, key) => obj[key], unzombified);
        delete parent[prop];
      }

      removeEmptyKeys(unzombified);

      const content = JSON.stringify(unzombified, null, 2);
      const finalTranslationKeys = getTranslationKeys(unzombified, null, []);
      const output = `output/${identifier ? `${identifier}-` : '' }${path.basename(fileName)}`;

      try {
        await fs.writeFile(output, content);

        console.log(`Cleaned translations output to ${output}`);
        console.log(`Removed ${translationKeys.length - finalTranslationKeys.length} keys. ${finalTranslationKeys.length} keys remain.`);
      } catch(err) {
        error(`Unable to write file ${output}: ${err}`, true);
      }
    } catch(err) {
      error(`Unable to recurse directory ${directory}: ${err}`, true);
    }
  } catch(err) {
    error(`Unable to read file ${fileName}: ${err}`, true)
  }
}