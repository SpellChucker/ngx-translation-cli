## Angular Translation CLI

A CLI application to manage translations in Angular projects.

```bash
$ ngx-translation-cli <command> <options>
```

## Commands

### keys

This command allows you to export all keys within a translation file to the output folder. You can also specify an identifier to prepend to the output filename.

```bash
$ ngx-translation-cli keys -t <translation-file> -t <identifier>
```

### prune

This command will create a new translation file with only the used translations--essentially pruning all unused translations. Again, you can also specify an identifier to prepend to the output file.

```bash
$ ngx-translation-cli prune -t <translation-file> -d <project-directory> -i <identifier>
```

### help

This command will help you with understanding the commands available.

### version

This command will output the current version of the CLI tool.
