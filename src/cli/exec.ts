require('dotenv').config();

const Hoge = require("../index");
const func = async () => {
    try {
        await Hoge.handler({
            webhookName: "TEST",
            content: "HELLO WORLD!"
        });
        console.log("OWARI");
    } catch(e) {
        console.error(e);
    }
}

func();
