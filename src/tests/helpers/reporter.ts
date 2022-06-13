import "jasmine";
import {
  SpecReporter,
  StacktraceOption,
  DisplayProcessor,
} from 'jasmine-spec-reporter';

console.log('aloalo');

// jasmine.SuiteInfo
class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: any, log: string): string {
    console.log('abbababababab');
    console.log('abcabcbababcbabcab', info);
    return `${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayPending: true,
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
);

jasmine.loadConfigFile('jasmine.json');
jasmine.execute();
