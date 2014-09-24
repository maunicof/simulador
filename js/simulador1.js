var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// ======================================================
var cortadora = {
    estado: false,
    x: 100,
    y: 100,
    width: 50,
    height: 50
};


var arrastrar;
var objetos = [];
var objetoActual = null;
var mouseOld = {};
var mouseNew = {};


// variables para las imagenes
var fondo;

//Definicion de funciones
function loadMedia() {
    fondo = new Image();
    fondo.src = 'img/labo.jpg';
    fondo.onload = function() {
        var intervalo = window.setInterval(frameLoop, 1000 / 55);
    };
}

function drawBackground() {
    ctx.drawImage(fondo, 0, 0, 900, 600);
}

function dibujarCortadora() {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(cortadora.x, cortadora.y, cortadora.width, cortadora.height);
}

function agregarEventosMouse() {

    canvas.addEventListener("mousedown", function(event) {
        var mousePos = mousePosicion(canvas, event);
        //se determina si se presiono el mouse encima de un shape
        if ((mousePos.x > cortadora.x) && (mousePos.x < (cortadora.x + cortadora.width)) &&
            (mousePos.y > cortadora.y) && (mousePos.y < (cortadora.y + cortadora.height))) {
            // coordenas X,Y donde se hizo clic
            mouseOld.x = mousePos.x;
            mouseOld.y = mousePos.y;
            arrastrar = true;
        }
    }, false);

    canvas.addEventListener("mousemove", function(event) {
        var mousePos = mousePosicion(canvas, event);
        mouseNew.x = mousePos.x;
        mouseNew.y = mousePos.y;

        if (arrastrar) {
            //Calculo distancia entre donde hice click y la nueva pos del mouse
            var dx = mouseNew.x - mouseOld.x;
            var dy = mouseNew.y - mouseOld.y;
            //La pos old del mouse pasa a ser la recien capturada, la nueva
            mouseOld.x = mouseNew.x;
            mouseOld.y = mouseNew.y;

            

        }
    }, false);

    canvas.addEventListener('mouseup', function(event){
        arrastrar = false;

    },false);

    function mousePosicion(canvas, event) { //Calculo la posicion del mouse en el canvas
        var rect = canvas.getBoundingClientRect();
        return { // devuelve un objeto
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }
}

function moverCortadora(){
    if (arrastrar) {
        cortadora.x = cortadora.x + dx;
            cortadora.y = cortadora.y + dy;
    }
}

function frameLoop() {
    drawBackground();
    dibujarCortadora();
    moverCortadora();
}

//Ejecucion de funciones
loadMedia();
agregarEventosMouse();