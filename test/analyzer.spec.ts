import { expect } from 'chai';
import stream from 'stream';
import { Transformers } from '@moneyforward/sca-action-core';
import Analyzer from '../src/analyzer'

describe('Transform', () => {
  it('should return the problem object', async () => {
    const text = 'README.md:122:0: "zeebra" is a misspelling of "zebra"';
    const analyzer =  new (class extends Analyzer {
      public constructor() {
        super();
      }
      public createTransformStreams(): Transformers {
        return super.createTransformStreams();
      }
    })();
    const [prev, next = prev] = analyzer.createTransformStreams();
    stream.Readable.from(text).pipe(prev);
    for await (const problem of next)
      expect(problem).to.deep.equal({
        file: 'README.md',
        line: '122',
        column: '0',
        severity: 'warning',
        message: '"zeebra" is a misspelling of "zebra"',
        code: 'misspelling'
      });
  });
});
