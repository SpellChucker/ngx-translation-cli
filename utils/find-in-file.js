const fs = require('fs');

module.exports = (uri, keys) => {
  const zombies = [ ...keys ];
  try {
    const data = fs.readFileSync(uri, { encoding: 'utf-8' });
    for (const key of keys) {
      const found = data.indexOf(key) !== -1;
      const zombieIndex = zombies.indexOf(key);
      const alreadyZombie = zombieIndex !== -1;
      if (!found && !alreadyZombie) {
        zombies.push(key);
      }
      if (found && alreadyZombie) {
        zombies.splice(zombieIndex, 1);
      }
    }
  } catch (err) {
    console.error('error while reading file: ' + uri, err);
  }

  return zombies;
};
