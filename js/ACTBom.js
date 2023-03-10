"use strict";
let columnas = Array();
let p = 0;
let molt = 0;
let joc = 0;
let kl = 0;
var d = 0;
function jugar() {
    let html = "";
    for (let i = 0; i < 5; i++) {
        let filas = Array();
        for (let x = 0; x < 5; x++) {
            filas.push(0);
            html += "<i id=\"land-" + i + x + "\" class=\"fas fa-square\" onclick=\"cliks(this.id)\"></i>";
        }
        columnas.push(filas);
        html += "<br>";
    }
    let juego = document.getElementById("juego");
    juego.innerHTML = html;
    ponerMinas();
    mosIntentos();
    minasRestantes();
    contador();
    ocultar();
    mostrar();
}
// Poner minas
let intent = 0;
function ponerMinas() {
    let minas = document.getElementById("minas");
    let k = minas.value;
    k = parseInt(k);
    // Maximo de minas
    if (k > 8) {
        k = 8;
    }
    if (p == 0) {
        molt = k;
    }
    let contador = 0;
    intent = k * 3;
    do {
        let a = Math.floor(Math.random() * 5);
        let b = Math.floor(Math.random() * 5);
        if (columnas[a][b] != 1) {
            columnas[a][b] = 1;
            contador++;
        }
    } while (contador < k);
}
function cliks(id) {
    let num1 = id.substring(5, 6);
    let num2 = id.substring(6, 7);
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    for (let i = 0; i < 5; i++) {
        for (let x = 0; x < 5; x++) {
            if (i == num1 && x == num2) {
                if (columnas[i][x] == 1) {
                    let land = document.getElementById(id);
                    land.className = "fas fa-bomb";
                    land.style.color = "red";
                    intentos();
                    if (intent == 0) {
                        alert("Has ganado");
                        location.reload();
                    }
                }
                else {
                    let land = document.getElementById(id);
                    land.className = "fas fa-check";
                    land.style.color = "green";
                    joc++;
                    minasRestantes();
                    if (joc == molt) {
                        alert("Has perdido");
                        location.reload();
                    }
                }
            }
        }
    }
    mosIntentos();
}
function intentos() {
    intent--;
    if (intent == 0) {
        let juego = document.getElementById("juego");
        juego.innerHTML = "<h1>Game over!</h1>";
        alert("No te quedan intentos :(");
        perder();
    }
}
function mosIntentos() {
    let intentos = document.getElementById("intentos");
    intentos.innerHTML = "<p>Intentos: " + intent + "</p>";
    let puntos = document.getElementById("puntos");
    puntos.innerHTML = "<p>Puntos: " + p + "</p>";
}
function ganar() {
    let juego = document.getElementById("juego");
    juego.innerHTML = "<h1>Has ganado!</h1>";
    alert("Has ganado!");
    p += 10;
    mosIntentos();
    contador();
}
function perder() {
    // y guarda nombre y puntos en el localhost
    let juego = document.getElementById("juego");
    juego.innerHTML = "<h1>Has perdido!</h1>";
    alert("Has perdido!");
    p -= 10;
    mosIntentos();
    contador();
}
function minasRestantes() {
    let minasR = molt - joc;
    let minasRes = document.getElementById("minasres");
    minasRes.innerHTML = "<p>Minas restantes: " + minasR + "</p>";
}
function contador() {
    let tiempo = document.getElementById("tiempo");
    let t = 30;
    let timer = setInterval(function () {
        tiempo.innerHTML = "<p>Tiempo: " + t + "</p>";
        t--;
        if (t == 0) {
            clearInterval(timer);
            perder();
        }
    }, 1000);
    return t;
}
function reiniciar() {
    location.reload();
}
function ocultar() {
    let ocultar = document.getElementById("ocultar");
    ocultar.style.display = "none";
}
function mostrar() {
    let mostrar = document.getElementById("mostrar");
    mostrar.style.display = "block";
}
