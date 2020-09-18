require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
// const passport = require('./config/passport');
// var LocalStrategy = require("passport-local").Strategy;
const routes = require("./routes");
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose')
const readXlsxFile = require('read-excel-file/node');
const passport=require('./passport')
const db = require('./models');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static('s2meclient/build'));
  }
app.use(express.static('s2meclient/public'))

app.use('/',routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/footy", { useNewUrlParser: true,  useUnifiedTopology: true }
  );

app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:true,
        saveUninitialized:true
    })
);

app.use(passport.initialize());
app.use(passport.session());


// require('./routes/api.js')(app)

const schema  = {
    
    'Age':{
        prop:'age',
        type:Number,
    },
    'Player':{
        prop:'player',
        type: String
    }, 
    'Position':{
        prop:'position',
        type: String
    }, 
    'Team':{
        prop:'team',
        type: String
    }, 
    'Bye':{
        prop:'bye',
        type: Number
    }, 
    'Status':{
        prop:'status',
        type: String
    },
    'ESPN':{
        prop:'espn',
        type: Number
    }, 
    'PPR':{
        prop:'ppr',
        type: Number
    }, 

}
readXlsxFile('./2020ffnew.xlsx',{schema}).then((data) => {
    console.log(data.rows, data.errors )


    data.rows.map((data)=>{
        const pObj= {
            playe:data.player,
            team:data.team,
            pos:data.position,
            espn:data.espn,
            ppr:data.ppr,
            age:data.age,
        }
        console.log(pObj)
        // db.Player.create(pObj).then(res => {
        //     console.log(res)
        // })
    })
    // for(let i = 1 ; i<rows.length;i++){
    //     let pObj={
    //         rank: row[i]
    //     }
    // }

    
  })
  
const server = http.createServer(app);

const io = socketIo(server);

let interval;
io.on ('connection', socket=>{
    console.log(socket.id)
    console.log('New Client Now Connected')
    socket.emit('connected')
    // if(interval){
    //     clearInterval(interval);
    // }
    // interval= setInterval(()=>getApiAndEmit(socket), 10000);
    socket.on('disconnect',()=>{
        console.log("buh bye")
        console.log(socket.id)
    })

    socket.on('outgoingMsg',data=>{
        if(data){
        const msg= data.outgoingMsg
        const user= data.sender
        const time= data.msgTime
        console.log(data)
        socket.emit('incomingMsg',{msg,user,time} )
    }
})
    socket.on('newUser', data=>{
        // console.log("######################User"+data)
        const userN= data.usr
        const userE= data.email
        const userP= data.pword
        // console.log("######################User "+user)
        // db.User.post("/", (req, res) => {
        //     console.log("user signup");
        //     console.log(req.body);
        //     const { email, password, username } = req.body;
            // ADD VALIDATION
            db.User.findOne({ username: userN }, (err, user) => {
              if (err) {
                console.log("User.js post error: ", err);
              } else if (user) {
                res.json({
                  error: `Sorry, already a user with the username: ${userN}`
                });
              } else {
                console.log("creating new user");
                const newUser = {
                  username: userN,
                  password: userP,
                  email: userE
                };
                db.User.create(newUser).then(data=>{
                    console.log(data)
                })
              }
            });
          });
        // socket.broadcast.emit('user',user)
    
    socket.on('login', data=>{
        // console.log("######################User"+data)
        const userE= data.email
        const userP= data.pword
       console.log (data)
       passport.use(
        new LocalStrategy(
          // Our user will sign in using an email, rather than a "username"
          {
            usernameField: "email"
          },
          function(userE, userP, done) {
            console.log(userE,userP)
            // When a user tries to sign in this code runs
            // db.User.findOne({
            //   where: {
            //     email: userE
            //   }
            // }).then(function(dbUser) {
            //   // If there's no user with the given email
            //   if (!dbUser) {
            //     return done(null, false, {
            //       message: "Incorrect email."
            //     });
            //   }
            //   // If there is a user with the given email, but the password the user gives us is incorrect
            //   else if (!dbUser.validPassword(password)) {
            //     return done(null, false, {
            //       message: "Incorrect password."
            //     });
            //   }
            //   // If none of the above, return the user
            //   return done(null, dbUser);
            // });
          }
        )
      );
        // function(req, res, next) {
        //     console.log("routes/user.js, login, req.body: ");
        //     console.log(req.body);
        //     next();
        //   },
        // function(username, password, done) {
        //     User.findOne({ email: email }, (err, user) => {
        //         if (err) {
        //             return done(err)
        //         }
        //         if (!user) {
        //             return done(null, false, { message: 'Incorrect email' })
        //         }
        //         if (!user.checkPassword(password)) {
        //             return done(null, false, { message: 'Incorrect password' })
        //         }
        //         return done(null, user)
        //     })
        // }
        
        // function login (userE, userP, done) {
        // db.User.findOne({ email: userE }, (err, user) => {
        //     if (err) {
        //         return done(err)
        //     }
        //     if (!user) {
        //         return done(null, false, { message: 'Incorrect email' })
        //     }
        //     if (!user.checkPassword(userP)) {
        //         return done(null, false, { message: 'Incorrect password' })
        //     }
        //     return done(null, user)

        // app.post('/login',passport.authenticate("local"),
        // (req, res) => {
        //     console.log( res)
        //   console.log("logged in", req.user);
      
        //   // var userInfo = {
        //   //   // username: req.user.username
        //   //   ...req.user
        //   // };
        //   // res.send(userInfo);
        // })
          
        
//         }) 
         
//     }
//     login(userE,userP)
})
})
server.listen(PORT,()=>{
    console.log('Listening on ',PORT)
})