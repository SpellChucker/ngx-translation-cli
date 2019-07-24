function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) return false;
  }

  return true
}

function removeEmptyKeys(obj) {
  for (const key in obj) {
    if(obj[key] !== null && typeof(obj[key]) === 'object'){
      removeEmptyKeys(obj[key]);

      if(isEmpty(obj[key])) {
        delete obj[key]
      }
    }

    if(obj[key] === null){
      delete obj[key]
    }
  }
}

module.exports = {
  isEmpty,
  removeEmptyKeys
}