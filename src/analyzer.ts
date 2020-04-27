import stream from 'stream';
import util from 'util';
import { StaticCodeAnalyzer, Transformers, findByGlob, tool } from '@moneyforward/sca-action-core';

const debug = util.debuglog('misspell-action');

export type Locale = 'US' | 'UK';

export default class Analyzer extends StaticCodeAnalyzer {
  constructor(locale: Locale = 'US', ignore = '') {
    super('misspell', ['-i', ignore, '-locale', locale, '-j', '1'], undefined, undefined, findByGlob);
  }

  async prepare(): Promise<unknown> {
    return tool.execute('go', ['get', '-u', 'github.com/client9/misspell/cmd/misspell']);
  }

  createTransformStreams(): Transformers {
    const transformers = [
      new tool.LineTransformStream(),
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
    transformers.reduce((prev, next) => prev.pipe(next));
    return [transformers[0], transformers[transformers.length - 1]];
  }
}