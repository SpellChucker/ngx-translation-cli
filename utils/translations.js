function getTranslationKeys(obj, cat, tKeys) {
  const currentKeys = [ ...tKeys ];
  if (obj) {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (typeof value === 'object' && !Array.isArray(value)) {
        currentKeys.push(...getTranslationKeys(value, cat === null ? key : cat.concat('.', key), tKeys));
      } else {
        currentKeys.push(cat === null ? key : cat.concat('.', key));
      }
    }
  }

  return currentKeys;
}

module.exports = {
  getTranslationKeys
};
