import { CrateElement } from "./abzarha.js";
import { crearCartas, reparterCartas, ContarCartas, BuscarCart, Sira, emtiyaz, carthayeBarande } from "./librerias.js";

let socket = io();
let rabetekarbari;
let myData;
let roomData;
let tipoDeCartas = ["", "gishniz", "khaj", "khesht", "del"];
let link = CrateElement({ name: "a", atriviuts: [{ name: "href", value: "./users.html" }] });
document.querySelector("body").appendChild(link);

function Cart(cartData) {
    this.data = cartData;
    this.paszamine = CrateElement({ name: "div", class: "cartPaszamine" });
    this.posht = CrateElement({ name: "img", src: "../images/pasur.jpg", class: "cartPosht" })
    this.numero1 = CrateElement({ name: "h3", class: "cartNumero1", inerhtml: this.data.numero });
    this.img = CrateElement({ name: "img", src: `../images/${tipoDeCartas[this.data.tipo]}.png` });
    this.numero2 = CrateElement({ name: "h3", class: "cartNumero2", inerhtml: this.data.numero });

    this.Crate();

    this.paszamine.addEventListener("click", (e) => {

        if (e.composedPath()[2].id == "paszamine" && roomData.users[roomData.nobat].id == myData.id) {
            Sira(roomData);
            rabetekarbari.carteErsali.appendChild(this.paszamine);
            socket.emit(`ersaleCart`, this.data, roomData.roomName);
            setTimeout(timer, 2000);
            let data = this.data;
            function timer() {
                let newRoomdata = JSON.parse(JSON.stringify(roomData));
                newRoomdata.users.forEach(e => {
                    if (e.id == myData.id) {
                        ContarCartas(BuscarCart(e.cartas.cartas, data.numero, data.tipo), e.cartas, newRoomdata.cartasDeMesa, e.ganancias);
                        socket.emit(`contarCaratas`, newRoomdata, roomData.roomName);
                    }
                })
            }

        }

    })
}
Cart.prototype.Crate = function () {
    this.paszamine.appendChild(this.posht);
    this.paszamine.appendChild(this.numero1);
    this.paszamine.appendChild(this.img);
    this.paszamine.appendChild(this.numero2);
    if (this.data.tipo <= 2) {
        // this.paszamine.style.backgroundColor = "#D40000";
        this.numero1.style.color = "#000000";
        this.numero2.style.color = "#000000";
    } else {
        // this.paszamine.style.backgroundColor = "#000000";
        this.numero1.style.color = "#D40000";
        this.numero2.style.color = "#D40000";
    }
    switch (this.data.tipo) {
        case 1:
            this.img.style.width = "68px";
            break;
        case 2:
            this.img.style.width = "122px";
            break;
        case 3:
            this.img.style.width = "78px";
            break;

        default:
            this.img.style.width = "74px";
            break;
    }
    switch (this.data.numero) {
        case 1:
            this.numero1.innerHTML = "A";
            this.numero2.innerHTML = "A";
            break;
        case 11:
            this.numero1.innerHTML = "J";
            this.numero2.innerHTML = "J";
            break;
        case 12:
            this.numero1.innerHTML = "Q";
            this.numero2.innerHTML = "Q";
            break;
        case 13:
            this.numero1.innerHTML = "K";
            this.numero2.innerHTML = "K";
            break;
    }
}
Cart.prototype.animacion = function () {

}



function Heder(users) {
    this.usersData = users;
    this.paszamine = CrateElement({ name: "div", class: "headerPaszamine" });
    this.userPaszamine1 = CrateElement({ name: "div", class: "userPaszamine1" });
    this.userImage1 = CrateElement({ name: "img" });
    this.userName1 = CrateElement({ name: "h3" });
    this.vs = CrateElement({ name: "img", src: "../images/vs.jpg" });
    this.userPaszamine2 = CrateElement({ name: "div", class: "userPaszamine2" });
    this.userImage2 = CrateElement({ name: "img" });
    this.userName2 = CrateElement({ name: "h3" });

    this.Crate();
}
Heder.prototype.Crate = function () {
    this.paszamine.appendChild(this.userPaszamine1);
    this.userPaszamine1.appendChild(this.userImage1);
    this.userPaszamine1.appendChild(this.userName1);
    this.paszamine.appendChild(this.vs);
    this.paszamine.appendChild(this.userPaszamine2);
    this.userPaszamine2.appendChild(this.userName2);
    this.userPaszamine2.appendChild(this.userImage2);
    this.usersData.forEach(e => {
        if (e.id == myData.id) {
            this.userImage1.src = `../images/${e.img}`;
            this.userName1.innerHTML = e.username;
        } else {
            this.userImage2.src = `../images/${e.img}`;
            this.userName2.innerHTML = e.username;
        }
    })
    this.sira();
}
Heder.prototype.sira = function () {
    let colors = { c_1: "#33FF00", c_2: "#FF0000" };
    let sira = roomData.users[roomData.nobat].id;
    if (myData.id == sira) {
        this.userName1.style.color = colors.c_1;
        this.userPaszamine1.style.borderBottom = `solid  3px  ${colors.c_1}`;
        this.userImage1.style.boxShadow = `1px 1px 30px 1px ${colors.c_1}`;
        this.userName2.style.color = colors.c_2;
        this.userPaszamine2.style.borderBottom = `solid  3px  ${colors.c_2}`;
        this.userImage2.style.boxShadow = `1px 1px 30px 1px ${colors.c_2}`;
       
    } else {
        this.userName1.style.color = colors.c_2;
        this.userPaszamine1.style.borderBottom = `solid  3px  ${colors.c_2}`;
        this.userImage1.style.boxShadow = `1px 1px 30px 1px ${colors.c_2}`;
        this.userName2.style.color = colors.c_1;
        this.userPaszamine2.style.borderBottom = `solid  3px  ${colors.c_1}`;
        this.userImage2.style.boxShadow = `1px 1px 30px 1px ${colors.c_1}`;
    }
}


function RabeteKarbari() {
    this.body = document.querySelector("body");
    // this.paszamine = CrateElement({name:"div",class:"paszamine"});
    this.header = new Heder(roomData.users);
    this.paszamine1 = CrateElement({ name: "div", class: "paszamine1" });
    this.tedadBazi = CrateElement({name:"h3",inerhtml:"6",class:"tedadBazi"});
    this.carteErsali = CrateElement({ name: "div", class: "carteErsali" });
    this.misGanancias = CrateElement({ name: "div", class: "misGanancias" });
    this.tusGanancias = CrateElement({ name: "div", class: "tusGanancias" });
    this.paszamine2 = CrateElement({ name: "div", class: "paszamine2" });
    this.paszamine3 = CrateElement({ name: "div", class: "paszamine3", id: "paszamine" });

    this.Crate();
}
RabeteKarbari.prototype.Crate = function () {
    this.body.appendChild(this.header.paszamine);
    this.body.appendChild(this.paszamine1);
    this.paszamine1.appendChild(this.misGanancias);
    this.body.appendChild(this.carteErsali);
    this.paszamine1.appendChild(this.tedadBazi);
    this.paszamine1.appendChild(this.tusGanancias);
    this.body.appendChild(this.paszamine2);
    this.body.appendChild(this.paszamine3);
    
}
RabeteKarbari.prototype.pakhshCartha = function () {
    this.carteErsali.style.display = "none";
    this.carteErsali.innerHTML = "";
    this.misGanancias.innerHTML = "";
    this.tusGanancias.innerHTML = "";
    this.paszamine2.innerHTML = "";
    this.paszamine3.innerHTML = "";
    roomData.users.forEach(e => {
        if (e.id == myData.id) {
            e.cartas.cartas.forEach(e => {
                let cart = new Cart(e);
                this.paszamine3.appendChild(cart.paszamine);
            })
            e.ganancias.cartas.forEach(e => {
                let cart = new Cart(e);
                cart.img.remove();
                cart.numero1.remove();
                cart.numero2.remove();
                cart.paszamine.className = "Mganancias";
                this.misGanancias.appendChild(cart.paszamine);
            })
        } else {
            e.ganancias.cartas.forEach(e => {
                let cart = new Cart(e);
                cart.img.remove();
                cart.numero1.remove();
                cart.numero2.remove();
                cart.paszamine.className = "Tganancias";
                this.tusGanancias.appendChild(cart.paszamine);
            })
        }
    })
    roomData.cartasDeMesa.cartas.forEach(e => {
        let cart = new Cart(e);
        this.paszamine2.appendChild(cart.paszamine);
    })
}









if (localStorage.getItem("userData") && localStorage.getItem("roomData")) {
    myData = JSON.parse(localStorage.getItem("userData"));
    roomData = JSON.parse(localStorage.getItem("roomData"));

    roomData.caja.cartas = crearCartas();
    let cartas = reparterCartas(roomData.caja, [4, 4, 4]);
    roomData.users[0].cartas.cartas = cartas[0];
    roomData.users[1].cartas.cartas = cartas[1];
    roomData.cartasDeMesa.cartas = cartas[2];
   
    socket.emit("roomLoad", roomData);

    socket.on(`pakhsheCartha${roomData.roomName}`, (roomData_) => {
       
        document.querySelector("body").innerHTML = "";
        roomData = roomData_;
        rabetekarbari = new RabeteKarbari();
        rabetekarbari.pakhshCartha()

    })
    socket.on(`ersaleCart${roomData.roomName}`, (cartData) => {
        rabetekarbari.carteErsali.innerHTML = "";
        rabetekarbari.carteErsali.style.display = "flex";
        let cart = new Cart(cartData);
        cart.paszamine.style.cssText = `box-shadow: 10px 10px 250px 30px #FFFFFF;width:214px;height:315px`;
        if (roomData.users[roomData.nobat].id !== myData.id) cart.paszamine.style.transform = "rotateY(180deg)";
        rabetekarbari.carteErsali.appendChild(cart.paszamine);
        // if(roomData.users[roomData.nobat].id !== myData.id) cart.paszamine.style.transform = "rotateY(0deg)";
        setTimeout(timer, 100);
        function timer() {
            cart.paszamine.style.transform = "rotateY(0deg)";
        }

    })
    socket.on(`contarCaratas${roomData.roomName}`, (roomData_) => {
        let cartasB = carthayeBarande(roomData.cartasDeMesa.cartas, roomData_.cartasDeMesa.cartas);
        // let cartasB = carthayeBarande([{numero:5,tipo:4},{numero:4,tipo:3},{numero:3,tipo:3},{numero:6,tipo:1}],[{numero:5,tipo:4},{numero:4,tipo:3}]);
        if (cartasB.length > 0) {
            rabetekarbari.carteErsali.style.display = "flex";
            cartasB.forEach(e => {
                let cart = new Cart(e);
                rabetekarbari.carteErsali.appendChild(cart.paszamine);
            })
            setTimeout(timer, 2000);
        } else {
            timer();
        }
        function timer() {
            roomData = roomData_;
            if (roomData.caja.cartas.length > 0 || roomData.users[0].cartas.cartas.length > 0 || roomData.users[1].cartas.cartas.length > 0) {
                if (roomData.users[0].cartas.cartas.length !== 0 || roomData.users[1].cartas.cartas.length !== 0) {
                    rabetekarbari.pakhshCartha();
                    rabetekarbari.header.sira();
                } else {
                    let cartas = reparterCartas(roomData.caja, [4, 4]);
                    roomData.users[0].cartas.cartas = cartas[0];
                    roomData.users[1].cartas.cartas = cartas[1];
                    rabetekarbari.tedadBazi.innerHTML = Number(rabetekarbari.tedadBazi.innerHTML) - 1;
                    socket.emit(`contarCaratas`, roomData, roomData.roomName);
                }
            } else {
                rabetekarbari.pakhshCartha();
                rabetekarbari.header.sira();
                setTimeout(timer, 2000);
                function timer() {
                    socket.emit("gameFinish", roomData, roomData.roomName);
                }

                console.log(roomData.users[0].username + ":" + emtiyaz(roomData.users[0].ganancias.cartas));
                console.log(roomData.users[1].username + ":" + emtiyaz(roomData.users[1].ganancias.cartas));
            }
        }

    })
    socket.on(`gameFinish${roomData.roomName}`, (roomdata) => {
        localStorage.setItem("roomData", JSON.stringify(roomdata));
        link.href = "./puntos.html";
        link.click();
    })

} else {
    link.click();
}






