const fs = require('fs').promises;
const { getTranslationKeys } = require('../utils/translations');
const error = require('../utils/error')

module.exports = async (args) => {
  const fileName = args.translations || args.t;

  if (!fileName) {
    error('Translation file must be specified (-t option).', true);
  }

  const output = args.output || args.o;

  try {
    const data = await fs.readFile(fileName, { encoding: 'utf-8' });
    const translationObj = JSON.parse(data);
    const translationKeys = getTranslationKeys(translationObj, null, []);

    if (output) {
      try {
        await fs.writeFile(output, translationKeys.join('\n'));
        console.log(`Translation keys outputted to ${output}`);
      } catch {
        error(`Unable to write file ${output}: ${err}`, true);
      }
    } else {
      console.log(translationKeys.join('\n'));
    }
  } catch(err) {
    error(`Unable to read file ${fileName}: ${err}`, true)
  }
}