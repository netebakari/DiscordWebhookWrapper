"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
require("dotenv").config();
exports.handler = (event) => __awaiter(this, void 0, void 0, function* () {
    console.log(event);
    if (typeof (event.webhookName) !== "string") {
        throw new Error("event.webhookName is required");
    }
    if (!process.env[event.webhookName]) {
        throw new Error(`webhook "${event.webhookName}" is not defined`);
    }
    const options = {
        hostname: "discordapp.com",
        port: 443,
        path: process.env[event.webhookName],
        method: "POST",
        headers: { "content-type": "application/json" }
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (response) => {
            response.setEncoding('utf8');
            let body = '';
            response.on('data', (chunk) => {
                console.log('chunk:', chunk);
                body += chunk;
            });
            response.on('end', () => {
                console.log('end:', body);
                console.log(`statusCode: ${response.statusCode}`);
                if (!response.statusCode) {
                    resolve(false);
                }
                else {
                    resolve(200 <= +response.statusCode && +response.statusCode < 300);
                }
            });
        }).on('error', (err) => {
            console.error('error:', err.stack);
            resolve(false);
        });
        const payload = {};
        if (event.username) {
            payload.username = event.username;
        }
        if (event.avatar_url) {
            payload.avatar_url = event.avatar_url;
        }
        if (event.content) {
            payload.content = event.content;
        }
        if (event.embeds) {
            payload.embeds = event.embeds;
        }
        req.write(JSON.stringify(payload));
        req.end();
    });
});
