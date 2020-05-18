import CodeReviewAction from '@moneyforward/code-review-action';
import Analyzer from '.';

(async (): Promise<void> => {
  console.log('::echo::%s', process.env['RUNNER_DEBUG'] === '1' ? 'on' : 'off');
  try {
    const localeOption = process.env.INPUT_LOCALE ? ['-locale', process.env.INPUT_LOCALE] : [];
    const ignoreOption = process.env.INPUT_IGNORE ? ['-i', process.env.INPUT_IGNORE] : [];
    const options = localeOption.concat(ignoreOption);
    process.env['INPUT_OPTIONS'] = JSON.stringify(options);
    process.exitCode = await new CodeReviewAction(Analyzer).execute();
  } catch (reason) {
    console.log('::error::%s', reason);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
})();
