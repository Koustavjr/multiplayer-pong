const apiServer=require('./api');
const http=require('http');
const io=require('socket.io');


const httpServer = http.createServer(apiServer);
const socketServer=io(httpServer,{
    cors:{
        origin:"*",
        methods:['GET','POST'],
        credentials: true
    }
});
const {listen}=require('./sockets');
const PORT=3000;

httpServer.listen(PORT);

console.log(`Listening on PORT ${PORT}`);


listen(socketServer);

