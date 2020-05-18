import CodeReviewAction from '@moneyforward/code-review-action';
import Analyzer, { isLocale } from '.';

(async (): Promise<void> => {
  console.log('::echo::%s', process.env['RUNNER_DEBUG'] === '1' ? 'on' : 'off');
  try {
    if (!(process.env.INPUT_LOCALE === undefined || isLocale(process.env.INPUT_LOCALE)))
      throw new TypeError('Please specify either US or UK for the locale.');
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
