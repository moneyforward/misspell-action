import path from 'path';
import stream from 'stream';
import util from 'util';
import Command from '@moneyforward/command';
import StaticCodeAnalyzer, { AnalyzerConstructorParameter, finder } from '@moneyforward/sca-action-core';
import { transform } from '@moneyforward/stream-util';

const debug = util.debuglog('@moneyforward/code-review-action-misspell-plugin');

export type Locale = 'US' | 'UK';

export function isLocale(locale: string | undefined): locale is Locale {
  return locale === 'UK' || locale === 'US';
}

export default class Analyzer extends StaticCodeAnalyzer {
  constructor(...args: AnalyzerConstructorParameter[]) {
    super('misspell', args.map(String), undefined, undefined, finder.GlobFinder);
  }

  protected async prepare(): Promise<void> {
    console.log('::group::Installing packages...');
    try {
      const [gopath] = await Promise.all([
        Command.substitute('go', ['env', 'GOPATH']),
        Command.execute('go', ['get', '-v', '-u', 'github.com/client9/misspell/cmd/misspell'])
      ]);
      process.env['PATH'] = [path.join(gopath, 'bin'), process.env.PATH].join(path.delimiter);
      debug('%s', process.env.PATH);
    } finally {
      console.log('::endgroup::');
    }
  }

  protected createTransformStreams(): stream.Transform[] {
    return [
      new transform.Lines(),
      new stream.Transform({
        readableObjectMode: true,
        writableObjectMode: true,
        transform: function (warning: string, _encoding, done): void {
          debug('%s', warning);
          const regex = /^(.+):(\d+):(\d+): (".+" is a misspelling of ".+")$/;
          const [matches, file, line, column, message] = regex.exec(warning) || [];
          done(null, matches && {
            file,
            line,
            column,
            message,
            severity: 'warning',
            code: 'misspelling'
          });
        }
      })
    ];
  }
}
