"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
function retry(retryCount) {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let attempt = 1; attempt <= retryCount; attempt++) {
                    try {
                        yield new Promise((res) => setTimeout(res, 1000));
                        const result = yield originalMethod.apply(this, args);
                        return result;
                    }
                    catch (error) {
                        console.error(`Attempt ${attempt} failed: ${error}`);
                    }
                }
                throw new Error(`Failed after ${retryCount} attempts`);
            });
        };
        return descriptor;
    };
}
exports.retry = retry;
