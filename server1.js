const express = require('express')
const app = require('express')();
const server =require('http').createServer(app);
const Port= process.env.PORT || 3001
const session = require('express-session');
const bodyParser= require('body-parser');
const passport = require('./config/passport')
const mongoose = require('mongoose')
const routes = require("./routes");
require('dotenv').config();

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/footy", { useNewUrlParser: true,  useUnifiedTopology: true }
  );

// app.use(express.urlencoded({extended:true}));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
      app.use(express.static('s2meclient/build'));
    }
app.use(express.static('s2meclient/public'));


const sessionMiddleware = session({ secret: "mallon", resave: false, saveUninitialized: false });
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const io= require('socket.io')(server);
const wrap= middleware=>(socket,next)=>middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware))
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
app.use(routes);
io.on('connect', (socket) => {
    console.log(`new connection ${socket.id}`);
    socket.on('subscribe', function(data){
      console.log(data)
      socket.join(data)
    })
    socket.on('outgoingMsg', function(data) {
      console.log('sending message');
      io.sockets.in(data.room).emit('incomingMsg', data);
  });
    const session = socket.request.session;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  session.socketId = socket.id;
  session.save();
});

server.listen(Port, () => {
    console.log(`application is running at: http://localhost:${Port}`);
  });