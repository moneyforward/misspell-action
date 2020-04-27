import Analyzer from './analyzer';

(async (): Promise<void> => {
  const files = (process.env.INPUT_FILES || '.');
  const locale = process.env.INPUT_LOCALE;
  if (!(locale === undefined || (locale === 'UK' || locale === 'US')))
    throw new TypeError('Please specify either US or UK for the locale.');
  const ignore = process.env.INPUT_IGNORE;
  const workingDirectory = process.env.INPUT_WORKING_DIRECTORY;
  workingDirectory && process.chdir(workingDirectory);
  const analyzer = new Analyzer(locale, ignore);
  process.exitCode = await analyzer.analyze(files);
})().catch(reason => {
  console.log(`::error::${String(reason)}`);
  process.exit(1);
});
