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

let onlineUsers = [];

io.on('connection', handleConnection);

function handleConnection(socket) {
    console.log("user connected: " + socket.id);

    socket.on('disconnect', () => {
        console.log("user disconnected: " + socket.id);

        for (let i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i].id === socket.id) {
                onlineUsers.splice(i, 1);
                break;
            }
        }

        io.emit('users', onlineUsers);
    });

    socket.on('message', (message) => {
        if (message.willTranslate) {
            translateAndEmit(socket, message)
        }
        else {
            let toSend = {
                id: socket.id,
                message: message.message,
                pic: message.pic
            }
            io.emit('message', toSend);
        }

    });

    socket.on('login', (session) => {
        let newUser = {
            id: socket.id,
            name: session.name,
            pic: session.picture
        }
        onlineUsers.push(newUser);

        io.emit('users', onlineUsers);
    });
}

async function translateAndEmit(socket, message) {
    console.log('original:', message.message);
    let translated = await translateMessage(message.message);
    let toSend = {
        id: socket.id,
        message: translated,
        pic: message.pic
    }
    io.emit('message', toSend);
}


async function translateMessage(message) {
    // target languages
    let toSend = message;
    const targets = ['ja', 'ru', 'pl', 'en'];

    // translate through languages
    for (let x = 0; x < targets.length; x++) {
        let [translations] = await translate.translate(toSend, targets[x]);
        translations = Array.isArray(translations) ? translations : [translations];
        translations.forEach((translation, i) => {
            toSend = translation;
        });
    }

    console.log('translated: ', toSend);
    return toSend;
}

app.use('/', router);

const port = 5000;
server.listen(process.env.PORT || port, () => {
    console.log('\n\nserver is now onine...\n\n');
});