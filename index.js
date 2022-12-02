// // Node server which will handle socket io connections
// // 8000 is the port no.
// const io=require("socket.io")(8000);

// const users={}
// // io.on is basically used as an event (it will listen all socket connections)
// // jaise hee connection aaye vaise hee ek io function ko run krdo

// // socket.on--it will handle what will happen with particular connection
// // user-joined-->jb user join krenge tou kya krna h
// // user[socket.id]=====user ko ek key dedi jisme uska naame daala h
// // socket.broadcast.emit===it will emit msg to all the persons except the user which has joined
// // just like hari joined the chat

// io.on('connection',socket=>{
//     socket.on('new-user-joined',name=>{
//         console.log("New User",name);
//         users[socket.id]=name;
//         socket.broadcast.emit('user-joined',name);
//     })
// // when someone sends the message it is received by others
//     socket.on('send',message=>{
//         socket.broadcast.emit('receive',{message:message ,name:user[socket.id]})
//     });
// })
const io = require("socket.io")(8000,{
    cors:{
        origin:"*"
    }
});
const users = {};

 io.on('connection', socket=>{
     socket.on('new-user-joined', name=>{
         console.log("New user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
 })