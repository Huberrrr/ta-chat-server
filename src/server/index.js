const express = require('express');
const app = express();
const router = require('./routes');
const { Translate } = require('@google-cloud/translate');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const secrets = require('./api/secrets.json');

const translate = new Translate({
    projectId: "ta-chat-server",
    key: secrets.translateKey
});

io.on('connection', handleConnection);

function handleConnection(socket) {
    console.log("user connected: " + socket.id);

    socket.on('disconnect', handleDisconnect)

    socket.on('message', (message) => translateAndEmit(socket, message));

}


function handleDisconnect(socket) {
    console.log("user disconnected");
}

async function translateAndEmit(socket, message) {
    console.log(message);
    let translated = await translateMessage(message);
    let toSend = {
        id:socket.id,
        message:translated
    }
    io.emit('message', toSend);
}


async function translateMessage(message) {

    // The target language
    let temp = message;
    const targets = ['ja', 'ru', 'la', 'pl', 'en'];

    // Translates some text into Russian
    for (let x = 0; x < targets.length; x++) {
        let [translations] = await translate.translate(temp, targets[x]);
        translations = Array.isArray(translations) ? translations : [translations];
        translations.forEach((translation, i) => {
            temp = translation;
        });
    }
    console.log(temp);
    return temp;
}

app.use('/', router);

const port = 5000;
server.listen(process.env.PORT || port, () => {
    console.log('server is now onine...');
});


