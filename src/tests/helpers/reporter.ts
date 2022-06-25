import "jasmine";
import {
  SpecReporter,
  StacktraceOption,
  DisplayProcessor,
} from 'jasmine-spec-reporter';

// jasmine.SuiteInfo
class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: any, log: string): string {
    return `${log} alo ok nhe ${info}`;
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
