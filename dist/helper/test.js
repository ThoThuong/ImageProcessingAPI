"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUniTest = void 0;
class TestUniTest {
    constructor() {
        this.plus = (a, b) => {
            return a + b;
        };
    }
    sync() {
        return "sync";
    }
    asyncCallback(cb) {
        setTimeout(() => {
            cb("asyncCallback");
        }, 200);
    }
    asyncPromise() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("asyncPromise");
            }, 50);
        });
    }
}
exports.TestUniTest = TestUniTest;
