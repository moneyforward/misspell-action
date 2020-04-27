# Code review using misspell

Analyze code statically by using [misspell](https://github.com/client9/misspell) in Github actions

## Inputs

### `files`

Specify patterns by [`@actions/glob`](https://github.com/actions/toolkit/tree/master/packages/glob)

(Multiple patterns can be specified by separating them with line feed)

### `locale`

Correct spellings using locale perferances for US or UK.  Default is to use a neutral variety of English.
Setting locale to US will correct the British spelling of 'colour' to 'color'

### `ignore`

ignore the following corrections, comma separated

### `working_directory`

Changes the current working directory of the Node.js process

## Example usage

```yaml
name: Analyze code statically
"on": pull_request
jobs:
  misspell:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Analyze code statically using misspell
        uses: moneyforward/misspell-action@v0
```

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/moneyforward/misspell-action

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
