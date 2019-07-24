const fs = require('fs').promises;
const path = require('path');
const { getTranslationKeys } = require('../utils/translations');
const error = require('../utils/error')

module.exports = async (args) => {
  const fileName = args.translations || args.t;

  if (!fileName) {
    error('Translation file must be specified (-t option).', true);
  }

  const identifier = args.identifier || args.i;

  try {
    const data = await fs.readFile(fileName, { encoding: 'utf-8' });
    const translationObj = JSON.parse(data);
    const translationKeys = getTranslationKeys(translationObj, null, []);

    try {
      const output = `output/${identifier ? `${identifier}-` : ''}${path.basename(fileName).split('.').slice(0, -1)}-keys.txt`;
      await fs.writeFile(output, translationKeys.join('\n'));

      console.log(`Translation keys outputted to ${output}`);
    } catch(err) {
      error(`Unable to write file ${output}: ${err}`, true);
    }
  } catch(err) {
    error(`Unable to read file ${fileName}: ${err}`, true)
  }
}