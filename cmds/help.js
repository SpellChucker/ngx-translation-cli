const menus = {
  main: `
    prune [command] <options>

    prune .............. prune translation file
    version ............ show package version
    help ............... show help menu for a command`,

  parse: `
    prune <options>

    --translations, -t ..... the translation file to use
    --directory, -d ........ the directory to match translation keys
    --output, -o ........... the file to output pruned translations`,
  keys: `
    keys <options>

    --translations, -t ..... the translation file to use
    --output -o ............ the file to output keys`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}