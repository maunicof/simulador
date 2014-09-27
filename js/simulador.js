// Carga pop up al iniciar =============================

$(window).load(function(){
        //$('#osis').modal('show');
});
// ======================================================
var dx, dy ;
var coordenadasMouse = {};
var click = {};
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var textoPlay = {
    counter : -1,
    titulo:''
};

var textoNivel1 = [
    { est: 'Moquillo' },
    { est: 'Epilepsia' },
    { est: 'Neosporosis', correcta: false },
    { est: 'Lesión traumática en región lumbosacra' },
];
var textoNivel1Sangre = [
    { mostrar : true},
    { est: 'Cantidad de Sangre a Extraer'},
    { est: '1 a 3 cm3', correcta: false},
    { est: '4 a 5 cm3', correcta: false},
    { est: '6 a 10cm3', correcta: false}
];


var juego = { estado: 'apagado' };// jugando, completado
var niveles = [ 0 , 0 , 0,  0 , 0 , 0];

var objetos = [
    { id: 'peladora',    est: 0, x: 200, y: 480, width: 70,  height: 90 },
    { id: 'goma',        est: 0, x: 380, y: 530, width: 60, height: 40 },
    { id: 'cajaGuantes', est: 0, x: 20, y: 500, width: 150, height: 90 },
];
var objetoJeringa = { id: 'jeringa' , est: 0, x: 300, y: 480, width: 40,  height: 90 };
var objetoBrazo =    { id: 'brazo',  est:false , x:672, y:270, width:42, height:90 };
var objetoGuantes =  { id: 'guantes',est: false, x: 250, y: 400, width: 55, height: 110 };
var objetoManos =    { id: 'manos',  est: false, x: 450, y: 430, width: 55, height: 110 };
var objetoSultan =   { id: 'sultan', est: false, x: 540, y: 50, width: 430, height: 360 };
var objetoGoma2 =    { id: 'goma2',   est: false, x: 664, y: 255, width: 68, height: 40 };
var objetoFantasma = {x:684, y:300, width:12, height:30};

var arrastrar;
var pinchado = false;
var objetoActual = null;
var mouseOld = {};
var mouseNew = {};

var imgGoma2, imgBrazo, imgBrazo2, imgSultan, imgPeladora, imgManos;
var imgJeringa,imgGuantes, imgGoma, imgCajaGuantes;
var imagenes = ['img/etapa1/brazo.png','img/etapa1/cajaGuantes.png',
'img/etapa1/goma.png', 'img/etapa1/sultan2.png','img/etapa1/fondo.png','img/etapa1/hand2.png',
'img/etapa1/hand.png','img/etapa1/jeringa.png'];

var preloader;
var continuarNivel2 = 0;
//Definicion de funciones
// ======================================================
function loadMedia() {
    preloader = new PreloadJS();
    preloader.onProgress = progresoCarga;
    cargar();
}

function cargar() {
    while (imagenes.length > 0) {
        var imagen = imagenes.shift();
        preloader.loadFile(imagen);
    }
}

function progresoCarga() {

    if (preloader.progress == 1) {
        var intervalo = window.setInterval(frameLoop, 1000 / 55);
        fondo = new Image();
        fondo.src = 'img/etapa1/fondo.png';
        imgSultan = new Image();
        imgSultan.src = 'img/etapa1/sultan2.png';
        imgGoma2 = new Image();
        imgGoma2.src = 'img/etapa1/goma2.png';
        imgBrazo = new Image();
        imgBrazo.src = 'img/etapa1/brazo.png';
        imgPeladora = new Image();
        imgPeladora.src = 'img/etapa1/peladora.png';
        imgGuantes = new Image();
        imgGuantes.src = 'img/etapa1/hand2.png';
        imgManos = new Image();
        imgManos.src = 'img/etapa1/hand.png';
        imgJeringa = new Image();
        imgJeringa.src = 'img/etapa1/jeringa.png';
        imgGoma = new Image();
        imgGoma.src = 'img/etapa1/goma.png';
        imgCajaGuantes = new Image();
        imgCajaGuantes.src = 'img/etapa1/cajaGuantes.png';
    }
}


function drawBackground() {
    ctx.drawImage(fondo, 0, 0, 1000, 660);
}
// Dibujar objetos
// ==================================================
function dibujarObjetos() {
    if (juego.estado == 'apagado'){
        
        dibujarManos();
        //juego.estado = 'jugando';
    }
    if (juego.estado == 'jugando'){
        nivel1();
        dibujarFantasma();
        dibujarSultan();
        dibujarBrazo();
        dibujarCajaGuantes();
        dibujarPeladora();
        dibujarJeringa();
        dibujarGoma();
        dibujarTextoAlPinchar();
        dibujarManos();
    }
}
// Funciones Dibujar
// ==================================================
function dibujarFantasma() {
    ctx.save();
    ctx.strokeRect(objetoFantasma.x, objetoFantasma.y, objetoFantasma.width, objetoFantasma.height);
    ctx.restore();
}
function dibujarSultan() {
    ctx.save();
    ctx.drawImage(imgSultan, objetoSultan.x, objetoSultan.y, objetoSultan.width, objetoSultan.height);
    ctx.restore();
}
function dibujarBrazo(){
    ctx.save();
    if (objetoBrazo.est === true){
        ctx.drawImage(imgBrazo, objetoBrazo.x, objetoBrazo.y, objetoBrazo.width, objetoBrazo.height);
    }
    ctx.restore();
}
function dibujarManos() {
    ctx.save();
    if (objetoManos.est === false){
        ctx.drawImage(imgManos, coordenadasMouse.x, coordenadasMouse.y, objetoManos.width, objetoManos.height);
    }else{
        ctx.drawImage(imgGuantes, coordenadasMouse.x, coordenadasMouse.y, objetoGuantes.width, objetoGuantes.height);
    }
    ctx.restore();
}
function dibujarPeladora() {
    ctx.save();
    ctx.drawImage(imgPeladora, objetos[0].x, objetos[0].y, objetos[0].width, objetos[0].height);
    ctx.restore();
}
function dibujarJeringa() {
    if ((objetoJeringa.est === 0) ){
        ctx.drawImage(imgJeringa, objetoJeringa.x, objetoJeringa.y, objetoJeringa.width, objetoJeringa.height);
    }
    if((objetoJeringa.est === 2)){
        ctx.drawImage(imgJeringa, coordenadasMouse.x - 4 , coordenadasMouse.y - 40, objetoJeringa.width, objetoJeringa.height);
    }
}
function dibujarGoma() {
    
    if (objetos[1].est === 1){
        ctx.drawImage(imgGoma2, objetoGoma2.x, objetoGoma2.y, objetoGoma2.width, objetoGoma2.height);
    }else{
        ctx.drawImage(imgGoma, objetos[1].x, objetos[1].y, objetos[1].width, objetos[1].height);
        }

}
function dibujarCajaGuantes() {
    ctx.save();
    ctx.drawImage(imgCajaGuantes, objetos[2].x, objetos[2].y, objetos[2].width, objetos[2].height);
    ctx.restore();
}
function dibujarTextoComenzar(){
    if(juego.estado == 'apagado'){
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'black';
        ctx.font = 'italic bold 30pt sans-serif';
        ctx.fillText(textoPlay.titulo, 480,390);
        ctx.restore();
    }
}
function dibujarTextoAlPinchar(){
    if ((pinchado) && (textoNivel1Sangre[0].mostrar === true)) {
        placaTexto(
            textoNivel1Sangre[1].est,
            textoNivel1Sangre[2].est, 150,200,
            textoNivel1Sangre[3].est, 150,250,
            textoNivel1Sangre[4].est, 150,300
            );
        if (mascaraClick(150, 180,120,30,0.4)){
            textoNivel1Sangre[0].mostrar = false;
        }
        if (mascaraClick(150, 225,110,30,0.4)){
            textoNivel1Sangre[0].mostrar = false;
            textoNivel1Sangre[0].correcta = true;
        }
        if (mascaraClick(150, 275,110,30,0.4)){
            textoNivel1Sangre[0].mostrar = false;
        }
    }
}
// Placa texto
// ==================================================
function placaTexto(titulo, t1, t1x, t1y, t2, t2x, t2y, t3, t3x, t3y, t4, t4x, t4y, t5, t5x,t5y ){
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.rect(100,120,600,300);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.rect(100,120,600, 40);
    ctx.fillStyle = '#0066CC';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18pt sans-serif';
    ctx.fillText(titulo, 120,150);
    ctx.restore();

    ctx.save();
    ctx.font = ' 15pt sans-serif';
    ctx.fillText(t1, t1x,t1y);
    ctx.fillText(t2, t2x,t2y);
    ctx.fillText(t3, t3x,t3y);
    ctx.fillText(t4, t4x,t4y);
    ctx.fillText(t5, t5x,t5y);
    ctx.restore();
}

// Mover Objetos
// ==================================================
function moverObjetos(){
    if ((objetoActual !== null)){
       // if (objetoJeringa.est === 5 ){
       //      objetoActual.x = objetoActual.x + dx;
       //      objetoActual.y = objetoActual.y + dy;
       //  }
        if ((objetoActual.est  === 1) && (objetoActual.id === 'peladora')){
            objetoActual.x = objetoActual.x + dx;
            objetoActual.y = objetoActual.y + dy;
        }
        if ((objetoActual.id === 'goma')){
            objetoActual.x = objetoActual.x + dx;
            objetoActual.y = objetoActual.y + dy;
        }
    }
}
// Contacto
// ==================================================
function verificarContacto(){
    if (objetoActual !== null){
        if(hit(objetoFantasma, objetoActual)){
            if (objetoActual.id == 'goma'){
                objetoActual.est = 0;
                objetoGoma2.est = true;
                objetos[1].est = 1;
            }
        }
        if(hit(objetoFantasma, objetos[0])){ // si la peladora toco el brazo
            objetoBrazo.est = true;
            objetos[0].est = 1;
        }
    }
}
function detectarClick(click){
    clickCaja();
    clickJeringa();
    pinchar();

    function pinchar(){
        if ((objetoGoma2.est) ){
            if (mascaraClick2(684 , 300, 15, 40, click.x + 30, click.y - 40, 0.5 )){
                pinchado = true;
            }
        }
    }

    function clickJeringa(){

        if ((objetos[1].est === 1) ){
            //console.log(objetos[2].est);
            ctx.save();
            ctx.globalAlpha = 0.0;
            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.rect(objetoJeringa.x,  objetoJeringa.y , objetoJeringa.width, objetoJeringa.height);
            ctx.fill();
            ctx.restore();
            if (ctx.isPointInPath(click.x, click.y)) {
                objetoJeringa.est = 2;
            }
        }
    }
    function clickCaja(){

        if((niveles[0] === 1)){
            ctx.save();
            ctx.globalAlpha = 0.0;
            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.rect(objetos[2].x, objetos[2].y, objetos[2].width, objetos[2].height);
            ctx.fill();
            ctx.restore();
            
                if (ctx.isPointInPath(click.x, click.y)) {
                    
                    objetoManos.est = true;
                    //objetos[2].est = 1; habilita jeringa
                    objetos[0].est = 1; // habilita peladora
                    objetos[2].est = 1; // cambio el estado de la caja
                }
        }
    }
}

// Logica de niveles
// ==================================================
function estadoJuego(){

    if ((juego.estado === 'jugando' ) && (niveles[6] === 0) ){
        //muestra titulo comenzar simulador y reseteo los niveles a cero para estar seguro
        for (var i = 0; i < niveles.length; i++) { //recorro array de niveles
            niveles[i] = 0;
            textoPlay.titulo = 'Simulación Completada';
        }
    }
    if ((juego.estado === 'apagado' )){
        //el simulador comienza con el primer nivel
        textoPlay.titulo = 'Comenzar Simulación';
        textoPlay.counter = 1;
    }
}

// Eventos del Mouse
// ==================================================
function agregarEventosMouse() {
    canvas.addEventListener("mousedown", function(event) {
        click = mousePosicion(canvas, event);
        
        var mousePos = mousePosicion(canvas, event);
        
        for (var i = 0; i < objetos.length; i++) { //recorro todos los objetos
            //determina si se presiono el mouse encima de un objeto
            if ((mousePos.x > objetos[i].x) && (mousePos.x < (objetos[i].x + objetos[i].width)) &&
                (mousePos.y > objetos[i].y) && (mousePos.y < (objetos[i].y + objetos[i].height))) {
                // coordenas X,Y donde se hizo clic
                mouseOld.x = mousePos.x;
                mouseOld.y = mousePos.y;
                objetoActual = objetos[i];
                break;
            }
        }
    }, false);

    canvas.addEventListener("mousemove", function(event) {
        var mouseMano = mousePosicion(canvas, event);
        coordenadasMouse.x = mouseMano.x ; // dibujo manos
        coordenadasMouse.y = mouseMano.y - 5;

        if (objetoActual !== null) {
            var mousePos = mousePosicion(canvas, event);
            mouseNew.x = mousePos.x;
            mouseNew.y = mousePos.y;
            //Calculo distancia entre donde hice click y la nueva pos del mouse
             dx = mouseNew.x - mouseOld.x;
             dy = mouseNew.y - mouseOld.y;
            //La pos old del mouse pasa a ser la recien capturada, la nueva
            mouseOld.x = mouseNew.x;
            mouseOld.y = mouseNew.y;
            moverObjetos();
            //muevo el objeto
            // objetoActual.x = objetoActual.x + dx;
            // objetoActual.y = objetoActual.y + dy;
        }
    }, false);

    canvas.addEventListener('mouseup', function(event) {
        objetoActual = null;
    }, false);

    function mousePosicion(canvas, event) { //Calculo la posicion del mouse en el canvas
        var rect = canvas.getBoundingClientRect();
        return { // devuelve un objeto
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }
}
// click boton
function clickComenzar(){
    if (juego.estado == 'apagado'){
    ctx.save();
    ctx.globalAlpha = 0.0;
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(480, 340, 500, 70);
    ctx.fill();
    ctx.restore();
        if (ctx.isPointInPath(click.x, click.y)) {
            juego.estado = 'jugando';
            ok = true;
        }
    }
}
// Nivel 1
// ==================================================
function nivel1(){ //multiple choise

    if (niveles[0] === 0) {

        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.rect(100,120,600,300);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.rect(100,120,600, 40);
        ctx.fillStyle = '#0066CC';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18pt sans-serif';
        ctx.fillText('Click en la opción correcta', 120,150);
        ctx.restore();

        ctx.save();
        ctx.font = ' 15pt sans-serif';
        ctx.fillText(textoNivel1[0].est, 150,200);
        ctx.fillText(textoNivel1[1].est, 150,250);
        ctx.fillText(textoNivel1[2].est, 150,300);
        ctx.fillText(textoNivel1[3].est, 150,350);
        ctx.restore();

        /* clicks
        =====================================*/
        if (mascaraClick(150,270,130,45,0.0)){// correcto Continua
            ctx.save();
            ctx.shadowColor = "black";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 7;
            ctx.beginPath();
            ctx.fillStyle = '#33CC00';
            ctx.arc(135, 290, 7, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            continuarNivel2 = 1;
        }
        if ( (continuarNivel2 === 1) ){// Boton continuar nivel1 true
            ctx.save();
            ctx.shadowColor = "black";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 7;
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20pt sans-serif';
            ctx.fillText('Continuar',440,410);
            ctx.restore();

             if (mascaraClick(440,380,170,45,0.0)){
                 niveles[0] = 1; // nivel 1 competado
                 continuarNivel2 = 0;
                 objetos[2].est = 1; // caja activa
                 //console.log(objetos[2].est);
             }
        }

            
        if (mascaraClick(150,170,100,45,0.0)){// error moquillo
            ctx.save();
            ctx.shadowColor = "#990000";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 7;
            ctx.fillStyle = 'red';
            ctx.font = 'bold 14pt sans-serif';
            ctx.fillText('X',130,200);
            ctx.restore();
        }
        if (mascaraClick(150,220,100,45,0.0)){// error epilepsia
            ctx.save();
            ctx.shadowColor = "#990000";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 7;
            ctx.fillStyle = 'red';
            ctx.font = 'bold 14pt  sans-serif';
            ctx.fillText('X',130,250);
            ctx.restore();
        }
        if (mascaraClick(150,320,420,45,0.0)){// error epilepsia
            ctx.save();
            ctx.shadowColor = "#990000";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 7;
            ctx.fillStyle = 'red';
            ctx.font = 'bold 14pt sans-serif';
            ctx.fillText('X',130,350);
            ctx.restore();
        }
    }

}
// Detecta Colisión
// ==================================================
function hit(a , b){
    var hits = false;
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
        if(b.y + b.height >= a.y && b.y < a.y + a.height){
            hits = true;
        }
    }
    if(b.x <= a.x && b.x + b.width >= a.x + a.width){
        if(b.y <= a.y && b.y + b.height >= a.y +a.height){
            hits = true;
        }
    }
    if(a.x <= b.x && a.x + a.width >= b.x +b.width){
        if(a.y <= b.y && a.y + a.height >= b.y + b.height){
            hits = true;
        }
    }
    return hits;
}
function mascaraClick( x , y, w, h, a ){
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.restore();
    return ctx.isPointInPath(click.x, click.y);
}
function mascaraClick2( x , y, w, h, clickx, clicky,a ){
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.restore();
    return ctx.isPointInPath(clickx, clicky);
   
}
function frameLoop() {

    estadoJuego();
    drawBackground();
    dibujarTextoComenzar();

    clickComenzar();
    
    dibujarObjetos();
    verificarContacto();
    detectarClick(click);


}

//Ejecucion de funciones al iniciar la pagina

window.addEventListener('load', init);

function init() {
    loadMedia();
    agregarEventosMouse();
}