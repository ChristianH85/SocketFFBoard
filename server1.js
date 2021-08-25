const express = require('express')
const app = require('express')();
const server =require('http').createServer(app);
const Port= process.env.PORT || 3001
const session = require('express-session');
const bodyParser= require('body-parser');
const passport = require('./config/passport')
const mongoose = require('mongoose')
const routes = require("./routes");
const db= require('./models/index')
require('dotenv').config();
const fin= require('./utils/tally')
const email=require('./controllers/email/emailController')
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/footy", { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false }
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
// app.use(passport.session());

const io= require('socket.io')(server);
const wrap= middleware=>(socket,next)=>middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware))
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
app.use(routes);
io.on('connect', (socket) => {
  let timer=1
    socket.on('subscribe', async function(data){
      console.log('////////////41/////////////')
      console.log(data)
      socket.join(data)
      let joinLeague= await db.League.findById(data).then(data=>{return data})
      // // if(joinLeague.users.findIndex(obj=>{obj.id ===data.user.id})!=-1){
      //   console.log('/////////////join//////////////')
      //   // console.log(joinLeague)
      // // }
      // console.log(joinLeague)
       io.sockets.to(data).emit('joined',joinLeague)
    })
    // socket.on('messL', function(data){
    //   db.League.find({_id:data.room}).then(data=>{data})
    //   console.log(data);
    // })
    socket.on('startDraft',async(data)=>{
      console.log('//////////////start////////////')
      console.log(data)
      ///change league status to active
      let startLeague= await db.League
      .findByIdAndUpdate(data._id,{$set:{status:'active'}},{new:true})
      .then(result=>{
        console.log(result)
        return result
      })
      let timer =117
      io.sockets.to(data._id).emit('start',startLeague)
      io.sockets.to(data._id).emit('start-timer',timer)
    })
    // socket.on('start-timer',data=>{
    //   console.log('Timer! I hardly know her')
    //    timer =117
       
    //   let pickTimer = () => {
    //     io.on('stop-timer',data=>{
    //      clearInterval(timeID)
    //     })
    //     if (timer>0){
    //       timer--;
    //       io.sockets.to(data).emit('time', timer);
    //     }else if(timer===0){
    //       console.log('zero')
    //       io.sockets.to(data).emit('timesUp', timer);
    //       clearInterval(timeID)
    //     }
    //   }
    //   let timeID=setInterval(pickTimer,1000)
    // })
    socket.on('selection',data=>{
      console.log('//////////////pick////////////')
      console.log(data.available.length)
      ////data keys player, draft_id, user_id, user_email
      let pick={
        email:data.user_email,
        id:data.user_id,
        pick:data.player
      }
      ///check if next turn is possible then add last pick
      ///send pick with user info to league pick array data.player
      // db.League.findByIdAndUpdate(data.draft_id,{$elemMatch:{teams:{_id:data.User_id}}},{$push:{team:player}}).then(data=>{console.log(data)})
      db.League.findOneAndUpdate(
  {_id: data.draft_id},{"$set":{ currentTurn: data.currentTurn, available:data.available},'$push': {picked: pick}
  },{
    upsert:true,
    new: true}).then(res=>{
      console.log(res.available.length)
      if(!res.draftOrder[res.currentTurn-1]){
        let plist=fin.tally(res.users,res.picked)
        // email.sendDraftFinal(plist,data.leagueName)
        let endLeague= {
          league:res,
          result:plist
        }
        io.sockets.to(res._id).emit('end',endLeague)
      }else{
        console.log(res._id)
      io.sockets.to(res._id).emit('nextPick',res)}})
    
      ///update order list
      ///update available player list
      ///return promise with league id to update active league through socket
      ///trigger next pick
      // io.sockets.to(data._id).emit('nextPick',data.player)
    })
    socket.on('pause', data=>{
      console.log('//////////////timesUp////////////')
      ///update admin that pick time has exceeded
      console.log(data)
    })
    socket.on('endDraft',(data=>{
      console.log('//////////////end////////////')
      /// end draft and email picks to users
      /// update league to disable draft options other than chat
      io.sockets.to(data._id).emit('end')
    }))
    socket.on('trade',(data=>{
      /// stretch////
      /// update the pick order to reflect trade
      /// respond to league with updated value
      io.sockets.to(data._id).emit('end')
    }))
    socket.on('outgoingMsg', (data)=>{
      console.log('//////////////message////////////')
      console.log(data)
      console.log('sending message');
      
      db.League.findByIdAndUpdate({_id: data.room},{$push:{messages:data}},{new:true,}).then(data=>{
        // console.log(data._id)
        // socket.in(data._id).emit('saved', data);
        }).catch(err=>{console.log(err)})
      // console.log(req.body)
    
      io.sockets.to(data.room).emit('incomingMsg', data);
  });
    const session = socket.request.session;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  session.socketId = socket.id;
  session.save();
});

server.listen(Port, () => {
    console.log(`application is running at: http://localhost:${Port}`);
  });