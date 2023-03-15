function Cartas() {
    this.cartas = [];
}

function CrateUser(id, name, image) {
    this.id = id;
    this.username = name;
    this.img = image;
   
}
function Room(adminId,userData,myData) {
    this.adminId = adminId;
    this.nobat = 0;
    this.roomName = userData.id+myData.id;
    this.users = [userData,myData];
    this.caja = new Cartas();
    this.cartasDeMesa = new Cartas();
    
}

function CreatClient() {
    this.users = [];
    this.rooms = [];
   
}
CreatClient.prototype.deleteUser = function(clientid) {
    let users_d = [];
    this.users.forEach(e => {
        if(e.clientId !== clientid)users_d.push(e);
    })
    let rooms_d = [];
    this.rooms.forEach(e => {
        let test = 0;
        e.users.forEach(e_ => {
            if(e_.clientId == clientid) test++;
        })
        if(test == 0) rooms_d.push(e);
    })
    this.users = users_d;
    this.rooms = rooms_d;
}

function CrateId(users = []) {
    let palabras = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM123456789";
    let test = true;
    let userId;
    while (test == true) {
        let id = "";
        for (let index = 0; index < 15; index++) {
            id += palabras.charAt(Math.floor(Math.random() * palabras.length));
        }
        let test_ = 0;
        users.forEach(e => {
            if (e.id == id) test_++;
        })
        if (test_ == 0) {
            test = false;
            userId = id;
        }
    }
    return userId;
}
const http = require("http");
const path = require("path");
const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const pdp = path.join(__dirname, "./public");
app.use(express.static(pdp));
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
server.listen(port, () => {
    console.log(`server is up on port ${port}!`);
})

const multer = require('multer');
const { on } = require('events');
/////  save image
const storage = multer.diskStorage({
    destination: (req ,file,cd) => {
        cd(null,'./public/images');
    },
    filename: (req,file,cd) => {
        cd(null,file.originalname);
    }
})
const upload = multer({storage: storage});
/////  save data

app.post('/upload_image',upload.single('image'),(req,res) => {
    res.send('image uploaded');
})


let users = new CreatClient();
io.on("connection", (client) => {
    console.log("new web connect");
    /////// login & sigin
    client.on("userSigin", (username,img) => {
        let id = CrateId(users.users);
        let newUser = new CrateUser(id,username,img);
        client.emit("userSigin",newUser);
    })

    client.on("userLogin",(user)=> {
        let newuser = user;
        newuser.clientId = client.id;
        users.users.push(newuser);
        io.emit("usersUpdate",(users.users));
    })
    /////// invitar 
    client.on("invitar",(userData,myData) => {
        io.emit(userData.id,myData);
    })
    ////// crear room 
    client.on("crearRoom",(userData,myData)=> {
        let user1 = userData;
        user1.cartas = new Cartas();
        user1.ganancias = new Cartas();
        let user2 = myData;
        user2.cartas = new Cartas();
        user2.ganancias = new Cartas();
        let newroom = new Room(user1.id,userData,myData);
        newroom.users.forEach(e => {
            io.emit(`playGame${e.id}`,newroom);
        })
        users.rooms.push(newroom);
    })
    
    ///////  Game
    client.on("roomLoad",(roomData)=> {
       
       
            io.emit(`pakhsheCartha${roomData.roomName}`,roomData);
      
        
    })
   
    client.on(`ersaleCart`,(cartData,roomName) => {

        io.emit(`ersaleCart${roomName}`,cartData);
    })
    client.on(`contarCaratas`,(roomData,roomName)=>{
        io.emit(`contarCaratas${roomName}`,roomData);
    })
    client.on(`gameFinish`,(roomData,roomName)=> {
        io.emit(`gameFinish${roomName}`,roomData);
    })


    client.on("disconnect", () => {
        console.log("new web disconnect");
        users.deleteUser(client.id);

    })
})
