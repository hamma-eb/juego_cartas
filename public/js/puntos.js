import { CrateElement } from "./abzarha.js";
import { crearCartas, reparterCartas, ContarCartas, BuscarCart ,Sira ,emtiyaz} from "./librerias.js";

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
    this.posht = CrateElement({name:"img",src:"../images/pasur.jpg",class:"cartPosht"})
    this.numero1 = CrateElement({ name: "h3", class: "cartNumero1", inerhtml: this.data.numero });
    this.img = CrateElement({ name: "img", src: `../images/${tipoDeCartas[this.data.tipo]}.png` });
    this.numero2 = CrateElement({ name: "h3", class: "cartNumero2", inerhtml: this.data.numero });

    this.Crate();

   
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
            this.img.style.width = "34px";
            break;
        case 2:
            this.img.style.width = "61px";
            break;
        case 3:
            this.img.style.width = "39px";
            break;

        default:
            this.img.style.width = "37px";
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

function Puntos (userdata = {}) {
    this.data = userdata;
    this.paszamine = CrateElement({name:"div",class:"puntosPaszamine"});
    this.userPaszamine = CrateElement({name:"div",class:"userPaszamine"});
    this.image = CrateElement({name:"img",src:`../images/${this.data.img}`});
    this.username = CrateElement({name:"h3",inerhtml:this.data.username});
    this.puntos = CrateElement({name:"h3",class:"puntos",inerhtml:emtiyaz(this.data.ganancias.cartas)});
    this.cartasPaszamine = CrateElement({name:"div",class:"cartasPaszamine"});
    this.linea = CrateElement({name:"div",class:"linea"});
    this.Crate();

}
Puntos.prototype.Crate = function() {
    this.paszamine.appendChild(this.userPaszamine);
    this.userPaszamine.appendChild(this.image);
    this.userPaszamine.appendChild(this.username);
    this.paszamine.appendChild(this.puntos);
    this.paszamine.appendChild(this.cartasPaszamine);
    this.data.ganancias.cartas.forEach(e => {
        let cart = new Cart(e);
        this.cartasPaszamine.appendChild(cart.paszamine);
    })
    this.paszamine.appendChild(this.linea);

}





function RabeteKarbari() {
    this.body = document.querySelector("body");
    
    this.puntos = [];
    
    this.home = CrateElement({name:"img",class:"home",src:"../images/home.png"});
    this.home.addEventListener("click",()=> {
        link.click();
    })
    this.Crate();
}
RabeteKarbari.prototype.Crate = function () {
    let puntos1 = emtiyaz(roomData.users[0].ganancias.cartas);
    let puntos2 = emtiyaz(roomData.users[1].ganancias.cartas);
    if(puntos1 > puntos2) {
        this.puntos.push(new Puntos(roomData.users[0]));
        this.puntos.push(new Puntos(roomData.users[1]));
    }else {
        this.puntos.push(new Puntos(roomData.users[1]));
        this.puntos.push(new Puntos(roomData.users[0]));
    }
    this.puntos.forEach(e => {
        this.body.appendChild(e.paszamine);
    })
    this.body.appendChild(this.home);
}
if (localStorage.getItem("userData") && localStorage.getItem("roomData")) {
    
    myData = JSON.parse(localStorage.getItem("userData"));
    roomData = JSON.parse(localStorage.getItem("roomData"));
    rabetekarbari = new RabeteKarbari();
} else {
    link.click();
}






