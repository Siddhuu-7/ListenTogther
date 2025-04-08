const {Server}=require('socket.io')
const Socket=(server)=>{
    const io=new Server(server,{
        cors:{
          origin:'*',
          methods:['GET',"POST"]
        }
      })
    io.on('connection',(socket)=>{
        socket.on('joinRoom',(id)=>{
          socket.join(id);
        })
        socket.on('sendmessage', ({ message, roomId,username, senderId }) => {
          socket.to(roomId).emit('recivemessage', { message, senderId ,username});
        });
        socket.on('songDetails',({song,roomId})=>{
          socket.to(roomId).emit('reciveSongDetails', song);

        })
        socket.on('pause',({bool,roomID})=>{
          io.to(roomID).emit('play',bool)
        })
        socket.on('syncTime', ({ roomID, currentTime }) => {
          socket.to(roomID).emit('syncTime', { currentTime });
        });
        
      })
      
}
module.exports=Socket