let readyPlayerCount=0;
function listen(io)
{
    const pongNameSpace=io.of('/pong');
    pongNameSpace.on('connection',(socket)=>{
        console.log('A user connected',socket.id);
        let room;
        socket.on('ready', () => {
            room = 'room'+Math.floor(readyPlayerCount/2);
            socket.join(room);
            console.log('Player ready', socket.id,room);
        
            readyPlayerCount++;
        
            if (readyPlayerCount %2===0) {
             // pongNameSpace.emit('startGame', socket.id);

             // within room
             pongNameSpace.in(room).emit('startGame', socket.id);
            }
          });
    socket.on('paddleMove',(paddleData)=>{
      //  socket.broadcast.emit('paddleMove',paddleData);

      //room
      socket.to(room).emit('paddleMove',paddleData);
    });
    socket.on("ballMove",(ballData)=>{
       // socket.broadcast.emit('ballMove',ballData);

       //room
       socket.to(room).emit('ballMove',ballData);
    });
    
    socket.on('disconnect',(reason)=>{
        console.log(`${socket.id} is disconnected!!`);
        socket.leave(room);
        pongNameSpace.to(room).emit('lost');
       //pongNameSpace.emit('lost',socket.id);
     //  socket.broadcast.emit('lost',socket.id);
    });
    
    });
}
module.exports={
    listen,
}