"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const Hoge = require("../index");
const func = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Hoge.handler({
            webhookName: "TEST",
            content: "HELLO WORLD!"
        });
        console.log("OWARI");
    }
    catch (e) {
        console.error(e);
    }
});
func();
