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

  it("plus", () => {
    const a = 1;
    const b = 2;
    const plus = a + b;
    expect(plus).toEqual(3)
  });
});