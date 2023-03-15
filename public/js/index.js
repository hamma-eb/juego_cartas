import { CrateElement } from "./abzarha.js";
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

const socket = io();

let rabetekarbari;
let link = CrateElement({name:"a",atriviuts:[{name:"href",value:"./users.html"}]});
document.querySelector("body").appendChild(link);


function RabeteKarbari() {
    this.body = document.querySelector("body");
    this.paszamine = CrateElement({name:"div",class:"paszamine"});
    this.imgDiv = CrateElement({name:"div",class:"imgDiv"});
    this.file = CrateElement({name:"input",type:"file"});
    this.img = CrateElement({name:"img",src:"../images/addimage.png"})

    this.nameDiv = CrateElement({name:"div",class:"nameDiv"});
    this.nameInput = CrateElement({name:"input",atriviuts:[{name:"placeholder",value:"Nombre"}]});
    this.nameLine = CrateElement({name:"div"});

    this.button = CrateElement({name:"input",type:"button",value:"ENTRAR"});

    this.Crate();
    this.imgDiv.addEventListener("click",()=> {
        this.file.click();
    })
    this.file.addEventListener("change",()=> {
        this.uploadImage();
    })
    this.button.addEventListener("click",()=> {
        this.saveData();
    })
}
RabeteKarbari.prototype.Crate = function() {
    this.imgDiv.appendChild(this.file);
    this.imgDiv.appendChild(this.img);
    this.paszamine.appendChild(this.imgDiv);
    this.nameDiv.appendChild(this.nameInput);
    this.nameDiv.appendChild(this.nameLine);
    this.paszamine.appendChild(this.nameDiv);
    this.paszamine.appendChild(this.button);
    this.body.appendChild(this.paszamine);
}
RabeteKarbari.prototype.uploadImage = function() {
    let filereader = new FileReader();
    filereader.addEventListener("load",()=> {
        this.img.src = filereader.result;
    })
    filereader.readAsDataURL(this.file.files[0]);
}
RabeteKarbari.prototype.saveData = function() {
    
    if (this.nameInput.value !== "" && this.file.files.length > 0) {
        
        let http = new XMLHttpRequest();
        let formdata = new FormData();
        formdata.append("image",this.file.files[0]);
        http.open("post","/upload_image",true);
        console.log(this.file.files[0].name)
        let username = this.nameInput.value;
        let imgurl = this.file.files[0].name;
        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                socket.emit("userSigin",username,imgurl);
            }
        }
        http.send(formdata);
        
        socket.on("userSigin",(userData,client) => {
            console.log(client)
            localStorage.setItem("userData",JSON.stringify(userData));
            link.click();
        })
    }
    
    
}

if (localStorage.getItem("userData")) {
    link.click();
}else {
    rabetekarbari = new RabeteKarbari();

}
