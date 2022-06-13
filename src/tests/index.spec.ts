import "jasmine";

import { TestUniTest } from './../helper/test';

describe("TestUniTest", () => {
  let o: TestUniTest;

  beforeEach(() => {
    o = new TestUniTest();
  });

  it("sync", () => {
    expect(o.sync()).toEqual("sync");
  });

  it("asyncCallback", (done) => {
    o.asyncCallback((value) => {
      expect(value).toEqual("asyncCallback");
      done();
    });
  });

  it("asyncPromise", async () => {
    const value = await o.asyncPromise();
    expect(value).toEqual("asyncPromise");
  });
});