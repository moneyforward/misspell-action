import { expect } from 'chai';
import stream from 'stream';
import util from 'util';
import { reporter } from  "@moneyforward/code-review-action"
import Analyzer from '../src'

describe('Transform', () => {
  it('should return the problem object', async () => {
    const text = 'README.md:122:0: "zeebra" is a misspelling of "zebra"';
    const analyzer =  new (class extends Analyzer {
      get Reporter(): reporter.ReporterConstructor {
        throw new Error("Method not implemented.");
      }
      public constructor() {
        super();
      }
      public createTransformStreams(): stream.Transform[] {
        return super.createTransformStreams();
      }
    })();
    const streams = [stream.Readable.from(text), ...analyzer.createTransformStreams()];
    await util.promisify(stream.pipeline)(streams);
    for await (const problem of streams[streams.length - 1])
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
