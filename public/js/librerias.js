function carthayeBarande(cartas = [],newCartas = []) {
    let cartasB = [];

    cartas.forEach(e => {
        let test = 0;
        newCartas.forEach(e_ => {
            if(e_.numero == e.numero && e_.tipo == e.tipo)test++;
        })
        if(test == 0) cartasB.push(e);
    })

    return cartasB;
}

function emtiyaz (ganansias = [{numero:1,tipo:3}]) {
    let emtiyaz = 0;
    ganansias.forEach(e => {
        if(e.numero == 2 && e.tipo == 1) emtiyaz += 2;
        if(e.tipo == 1) emtiyaz++;
        if(e.numero == 10 && e.tipo == 3) emtiyaz += 3;
        if(e.numero == 11) emtiyaz++;
        if(e.numero == 1) emtiyaz++;
    })
    return emtiyaz;
}


function Sira(roomData) {
    switch (roomData.nobat) {
        case 0:
            roomData.nobat = 1;
            break;
    
        default:
            roomData.nobat = 0;
            break;
    }
}


function CrateId(users = []) {
    let palabras = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM123456789";
    let test = true;
    let userId;
    while(test == true) {
        let id = "";
        for (let index = 0; index < 15; index++) {
            id += palabras.charAt(Math.floor(Math.random)*palabras.length);
        }
        let test_ = 0;
        users.forEach(e => {
            if(e.id == id) test_++;
        })
        if (test_ == 0) {
            test = false;
            userId = id;
        }
    }
    return userId;
}



function BuscarCart(cartas = [],numero = 1 , tipo = 3) {
    let arreyNo;
    let no = 0;
    cartas.forEach(e => {
        if(e.numero == numero && e.tipo == tipo) arreyNo = no;
        no++;
    })
    return arreyNo;
}

function CrearObjeto(name = "cartas", val = []) {
    let objeto = {};
    objeto[name] = val;
    return objeto;
}

function crearCartas() {
    let cartas = [];
    for (let index1 = 1; index1 <= 4; index1++) {
        for (let index2 = 1; index2 <= 13; index2++) {
            cartas.push({ numero: index2, tipo: index1 });

        }
    }
    return cartas;
}


// let caja = CrearObjeto("cartas", crearCartas());
// console.log(caja);

function reparterCartas(caja, cartas = [4, 4, 4]) {
    let cartasDeJuego = [];
    cartas.forEach(e => {
        let cartasDePersonas = [];
        for (let index1 = 0; index1 < e; index1++) {
            let test = false;
            while (test == false) {
                let numeroRandomDeTipo = Math.floor(Math.random() * 4) + 1;
                let numeroRandomDeCart = Math.floor(Math.random() * 13) + 1;
                for (let index2 = 0; index2 < caja.cartas.length; index2++) {
                    let cart = caja.cartas[index2]
                    if (cart.numero == numeroRandomDeCart && cart.tipo == numeroRandomDeTipo) {
                        cartasDePersonas.push(cart);
                        caja.cartas.splice(index2, 1);
                        test = true;
                    }

                }
            }

        }
        cartasDeJuego.push(cartasDePersonas);
    })
    return cartasDeJuego;
}
// let cartasDePersonas = reparterCartas(caja, [4, 4, 4]);
// console.log(cartasDePersonas);
// console.log(caja);



// let yo = CrearObjeto("cartas", cartasDePersonas[0]);
// let misGanancias = CrearObjeto("cartas", []);
// let tu = CrearObjeto("cartas", cartasDePersonas[1]);
// let mesa = CrearObjeto("cartas", cartasDePersonas[2]);

// yo.cartas = [{ numero: 11 }, { numero: 1 }, { numero: 6 }, { numero: 3 }];
// mesa.cartas = [{ numero: 2 }, { numero: 1 }, { numero: 1 }, { numero: 1 }];

// console.log(yo)
// console.log(mesa);
// console.log(misGanancias);




function ContarCartas(cartaJugada = 2, misCartas = {}, cartasDeMesa = {}, misGanancias = {}) {
    let cartNo = misCartas.cartas[cartaJugada].numero;
    let test = false;
    if(misCartas.cartas[cartaJugada].numero < 11) {
        for (let index1 = 0; index1 < cartasDeMesa.cartas.length; index1++) {

            if (misCartas.cartas[cartaJugada].numero < 11 &&
                cartasDeMesa.cartas[index1].numero < 11 &&
                misCartas.cartas[cartaJugada].numero + cartasDeMesa.cartas[index1].numero == 11) {
                misGanancias.cartas.push(misCartas.cartas[cartaJugada]);
                misGanancias.cartas.push(cartasDeMesa.cartas[index1]);
                misCartas.cartas.splice(cartaJugada, 1);
                cartasDeMesa.cartas.splice(index1, 1);
                test = true;
                index1 = cartasDeMesa.cartas.length
            } else {
                for (let index2 = 0; index2 < cartasDeMesa.cartas.length; index2++) {

                    if (misCartas.cartas[cartaJugada].numero < 11 &&
                        cartasDeMesa.cartas[index1].numero < 11 &&
                        cartasDeMesa.cartas[index2].numero < 11 &&
                        misCartas.cartas[cartaJugada].numero + cartasDeMesa.cartas[index1].numero + cartasDeMesa.cartas[index2].numero == 11 &&
                        index2 !== index1) {

                        misGanancias.cartas.push(misCartas.cartas[cartaJugada]);
                        misGanancias.cartas.push(cartasDeMesa.cartas[index1]);
                        misGanancias.cartas.push(cartasDeMesa.cartas[index2]);
                        misCartas.cartas.splice(cartaJugada, 1);
                        cartasDeMesa.cartas.splice(index1, 1,"");
                        cartasDeMesa.cartas.splice(index2, 1,"");
                        test = true;
                        index1 = cartasDeMesa.cartas.length
                        index2 = cartasDeMesa.cartas.length;
                    } else {
                        for (let index3 = 0; index3 < cartasDeMesa.cartas.length; index3++) {

                            if (misCartas.cartas[cartaJugada].numero < 11 &&
                                cartasDeMesa.cartas[index1].numero < 11 &&
                                cartasDeMesa.cartas[index2].numero < 11 &&
                                cartasDeMesa.cartas[index3].numero < 11 &&
                                misCartas.cartas[cartaJugada].numero + cartasDeMesa.cartas[index1].numero + cartasDeMesa.cartas[index2].numero + cartasDeMesa.cartas[index3].numero == 11 &&
                                index2 !== index1 && index3 !== index2 && index3 !== index1) {

                                misGanancias.cartas.push(misCartas.cartas[cartaJugada]);
                                misGanancias.cartas.push(cartasDeMesa.cartas[index1]);
                                misGanancias.cartas.push(cartasDeMesa.cartas[index2]);
                                misGanancias.cartas.push(cartasDeMesa.cartas[index3]);
                                misCartas.cartas.splice(cartaJugada, 1);
                                cartasDeMesa.cartas.splice(index1, 1, "");
                                cartasDeMesa.cartas.splice(index2, 1, "");
                                cartasDeMesa.cartas.splice(index3, 1, "");

                                test = true;
                                index1 = cartasDeMesa.cartas.length
                                index2 = cartasDeMesa.cartas.length;
                                index3 = cartasDeMesa.cartas.length;
                            } else {
                                for (let index4 = 0; index4 < cartasDeMesa.cartas.length; index4++) {

                                    if (misCartas.cartas[cartaJugada].numero < 11 &&
                                        cartasDeMesa.cartas[index1].numero < 11 &&
                                        cartasDeMesa.cartas[index2].numero < 11 &&
                                        cartasDeMesa.cartas[index3].numero < 11 &&
                                        cartasDeMesa.cartas[index4].numero < 11 &&
                                        misCartas.cartas[cartaJugada].numero + cartasDeMesa.cartas[index1].numero + cartasDeMesa.cartas[index2].numero + cartasDeMesa.cartas[index3].numero + cartasDeMesa.cartas[index4].numero == 11 &&
                                        index2 !== index1 && index3 !== index2 && index3 !== index1 && index4 !== index3 && index4 !== index2 && index4 !== index1) {
                                        console.log(cartasDeMesa.cartas)
                                        misGanancias.cartas.push(misCartas.cartas[cartaJugada]);
                                        misGanancias.cartas.push(cartasDeMesa.cartas[index1]);
                                        misGanancias.cartas.push(cartasDeMesa.cartas[index2]);
                                        misGanancias.cartas.push(cartasDeMesa.cartas[index3]);
                                        misGanancias.cartas.push(cartasDeMesa.cartas[index4]);
                                        misCartas.cartas.splice(cartaJugada, 1);
                                        cartasDeMesa.cartas.splice(index1, 1, "");
                                        cartasDeMesa.cartas.splice(index2, 1, "");
                                        cartasDeMesa.cartas.splice(index3, 1, "");
                                        cartasDeMesa.cartas.splice(index4, 1, "");
                                        test = true;
                                        index1 = cartasDeMesa.cartas.length
                                        index2 = cartasDeMesa.cartas.length;
                                        index3 = cartasDeMesa.cartas.length;
                                        index4 = cartasDeMesa.cartas.length;
                                    } else {

                                    }

                                }

                            }

                        }
                    }

                }
            }
        }
    }

    if (cartNo == 11) {
        for (let index1 = 0; index1 < cartasDeMesa.cartas.length; index1++) {
            if(cartasDeMesa.cartas[index1].numero < 11) {
                misGanancias.cartas.push(cartasDeMesa.cartas[index1]);
                cartasDeMesa.cartas.splice(index1,1,"");
            }
            
        }
        misGanancias.cartas.push(misCartas.cartas[cartaJugada]);
        misCartas.cartas.splice(cartaJugada,1,"");

    }

    if(cartNo == 12 || cartNo == 13) {
        for (let index = 0; index <  cartasDeMesa.cartas.length; index++) {
            if (cartasDeMesa.cartas[index].numero == cartNo) {
                misGanancias.cartas.push(cartasDeMesa.cartas[index]);
                cartasDeMesa.cartas.splice(index,1,"");
                misGanancias.cartas.push(misCartas.cartas[cartaJugada]);
                misCartas.cartas.splice(cartaJugada,1,"");
            }
            
        }
       
    }


    if (test == false) {
        cartasDeMesa.cartas.push(misCartas.cartas[cartaJugada]);
        misCartas.cartas.splice(cartaJugada, 1)
    }

   

    
    let cartas_ = [];
    cartasDeMesa.cartas.forEach(e => {
        if(e !== "") cartas_.push(e);
    })
    cartasDeMesa.cartas = cartas_;

}

// let test = false;

// while(caja.cartas.length > 0) {

// let yo_m2 = "yo:"
// yo.cartas.forEach(e => {
//     yo_m2 += e.numero +"/"+e.tipo+ "--";
// })
// console.log(yo_m2);
// let mesa_m2 = "mesa: "
// mesa.cartas.forEach(e => {
//     mesa_m2 += e.numero + "--";
// })
// console.log(mesa_m2);

// let cartNumero = prompt("numero de cart:");
// let carttipo = prompt("tipo de cart:");

// console.log(ContarCartas(BuscarCart(yo.cartas,cartNumero,carttipo), yo, mesa, misGanancias));
// let g_m2 = "g: "
// misGanancias.cartas.forEach(e => {
//     g_m2 += e.numero + "--";
// })
// console.log(g_m2);
// yo_m2 = "yo: "
// yo.cartas.forEach(e => {
//     yo_m2 += e.numero + "--";
// })
// console.log(yo_m2);
// mesa_m2 = "mesa: "
// mesa.cartas.forEach(e => {
//     mesa_m2 += e.numero + "--";
// })
// console.log(mesa_m2);

// if (yo.cartas.length == 0) {

//     cartasDePersonas = reparterCartas(caja, [4, 4]);
//     yo = CrearObjeto("cartas", cartasDePersonas[0]);
// }
// if (caja.cartas.length <= 0 && yo.cartas.length <= 0) {
//     test = true;
//     alert("final")
// }

// }



export{crearCartas,reparterCartas,ContarCartas,BuscarCart,Sira,emtiyaz,carthayeBarande};