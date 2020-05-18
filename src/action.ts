import CodeReviewAction from '@moneyforward/code-review-action';
import Analyzer from '.';

(async (): Promise<void> => {
  console.log('::echo::%s', process.env['RUNNER_DEBUG'] === '1' ? 'on' : 'off');
  try {
    const locale = process.env.INPUT_LOCALE;
    const ignore = process.env.INPUT_IGNORE;
    process.env['INPUT_OPTIONS'] = JSON.stringify([locale, ignore]);
    process.exitCode = await new CodeReviewAction(Analyzer).execute();
  } catch (reason) {
    console.log('::error::%s', reason);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
})();
