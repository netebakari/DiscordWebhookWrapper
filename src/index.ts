import * as https from "https";
require("dotenv").config();

exports.handler = async (event: any) => {
  console.log(event);

  if (typeof(event.webhookName) !== "string") {
    throw new Error("event.webhookName is required");
  }

  if (!process.env[event.webhookName]) {
    throw new Error(`webhook "${event.webhookName}" is not defined`);
  }

  const options = {
    hostname: "discordapp.com",
    port: 443,
    path: process.env[event.webhookName] as string,
    method: "POST",
    headers : { "content-type" : "application/json" }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (response) => {
      response.setEncoding('utf8');
      let body = '';
      response.on('data', (chunk)=>{
          console.log('chunk:', chunk);
          body += chunk;
      });
      response.on('end', () =>{
          console.log('end:', body);
          console.log(`statusCode: ${response.statusCode}`);
          if (!response.statusCode) { resolve(false); }
          else { resolve(200 <= +response.statusCode && +response.statusCode < 300); }
      });
    }).on('error', (err)=>{
        console.error('error:', err.stack);
        resolve(false);
    });

    const payload: any = {};
    if (event.username) { payload.username = event.username; }
    if (event.avatar_url) { payload.avatar_url = event.avatar_url; }
    if (event.content) { payload.content = event.content; }
    if (event.embeds) { payload.embeds = event.embeds; }
    req.write(JSON.stringify(payload));
    req.end();
  });
};