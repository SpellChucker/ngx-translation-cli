## Angular Translation CLI

A CLI application to manage translations in Angular projects.

```bash
$ ngx-translation-cli <command> <options>
```

## Installation

This package is meant to be installed globally. Install it using the following command:

```bash
$ npm i -g ngx-translation-cli
```


## Commands

### keys

This command allows you to export all keys within a translation file to stdout or an output file specified.

The `-t` option is required, `-o` is optional.

```bash
$ ngx-translation-cli keys -t <translation-file> -o <output-file>
```

### prune

This command will create a new translation file with only the used translations--essentially pruning all unused translations. This will print to stdout or you can specify an output file.

The `-t` and `-d` options are required, `-o` is optional.

```bash
$ ngx-translation-cli prune -t <translation-file> -d <project-directory> -o <output-file>
```

### help

This command will help you with understanding the commands available.

### version

This command will output the current version of the CLI tool.
