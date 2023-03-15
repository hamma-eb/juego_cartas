import { CrateElement } from "./abzarha.js";

let socket = io();
let rabetekarbari;
let myData;

let link = CrateElement({ name: "a", atriviuts: [{ name: "href", value: "./index.html" }] });
document.querySelector("body").appendChild(link);







function Notificacion(userData) {
    this.data = userData;
    this.paszamine = CrateElement({ name: "div", class: "notificacion_p" });
    this.img = CrateElement({ name: "img", src: `../images/${this.data.img}` })
    this.paszamine_s = CrateElement({ name: "div", class: "notificacionP_s" });
    this.username = CrateElement({ name: "h3", inerhtml: this.data.username + ":" });
    this.soal = CrateElement({ name: "h4", inerhtml: "quieres jugar?" });
    this.buttons = CrateElement({ name: "div", class: "not_buttons" });
    this.si = CrateElement({ name: "input", type: "button", value: "SI!" });
    this.no = CrateElement({ name: "input", type: "button", value: "NO!" });

    this.paszamine.appendChild(this.img);
    this.paszamine.appendChild(this.paszamine_s);
    this.paszamine_s.appendChild(this.username);
    this.paszamine_s.appendChild(this.soal);
    this.paszamine_s.appendChild(this.buttons);
    this.buttons.appendChild(this.no);
    this.buttons.appendChild(this.si);

    this.si.addEventListener("click", () => {
        socket.emit("crearRoom", this.data, myData);
    })
    this.no.addEventListener("click", () => {
        this.paszamine.remove();
        rabetekarbari.notificacion = undefined;
    })
}
function User(data = { id: "", username: "", img: "" }) {
    this.data = data;
    this.paszamine = CrateElement({ name: "div", class: "userPaszamine" });
    this.img = CrateElement({ name: "img", src: `../images/${this.data.img}` })
    this.paszamine_s = CrateElement({ name: "div", class: "userPaszamine_s" });
    this.username = CrateElement({ name: "h3", inerhtml: this.data.username });
    this.invitar = CrateElement({ name: "input", type: "button", value: "INVITAR" });

    this.paszamine.appendChild(this.img);
    this.paszamine.appendChild(this.paszamine_s);
    this.paszamine_s.appendChild(this.username);
    this.paszamine_s.appendChild(this.invitar);

    this.invitar.addEventListener("click", () => {
       
        if (this.invitar.style.backgroundColor !== "#00A3FF84") {
           
            socket.emit("invitar", this.data, myData);
            this.invitar.style.backgroundColor = "#00A3FF84";
            let invitar = this.invitar;
            setTimeout(function Timer() {
                invitar.style.backgroundColor = "#ffffff";
            }, 5000)
        }

    })

}


function RabeteKarbari() {
    this.body = document.querySelector("body");
    this.paszamine = CrateElement({ name: "div", class: "paszamine" });
    this.paszamine_s = CrateElement({ name: "div", class: "paszamine_s" });
    this.navarBala = CrateElement({ name: "div", class: "navarB" });
    this.navarPayin = CrateElement({ name: "div", class: "navarP" });
    this.notificacion = undefined;
    this.Crate();
}
RabeteKarbari.prototype.Crate = function () {
    this.paszamine.appendChild(this.navarBala);
    this.paszamine.appendChild(this.paszamine_s);
    this.paszamine.appendChild(this.navarPayin);
    this.body.appendChild(this.paszamine);
}
RabeteKarbari.prototype.crateUsers = function (users) {

    this.paszamine_s.innerHTML = "";
    users.forEach(e => {
        if (e.id !== myData.id) {
            let newuser = new User(e);
            this.paszamine_s.appendChild(newuser.paszamine);

        }
    })
}
RabeteKarbari.prototype.Notificacion = function (userData) {
    if (this.notificacion) this.notificacion.paszamine.remove();
    this.notificacion = new Notificacion(userData);
    this.body.appendChild(this.notificacion.paszamine);
    let notificacion = this.notificacion;
    let position = notificacion.paszamine.getBoundingClientRect();
    function location() {
        notificacion.paszamine.style.cssText = `top:20px;left:${innerWidth - position.width - 20}px;`
    }
    location();
    window.addEventListener("resize", () => {
        location();
    })
}







if (localStorage.getItem("userData")) {
    myData = JSON.parse(localStorage.getItem("userData"));
    socket.emit("userLogin", myData);
    rabetekarbari = new RabeteKarbari();
    socket.on(myData.id, (user) => {
        rabetekarbari.Notificacion(user);
    })
    socket.on("playGame" + myData.id, (roomData) => {
        localStorage.setItem("roomData", JSON.stringify(roomData))
        link.href = "./game.html";
        link.click();
    })
} else {
    link.click();
}

socket.on("usersUpdate", (users) => {
    rabetekarbari.crateUsers(users);

})

