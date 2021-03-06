// Carga pop up al iniciar =============================

$(window).load(function(){
        //$('#osis').modal('show');
        $('body').on('hidden.bs.modal', '.modal', function () { // video pause al cerrar modal
        $('video').trigger('pause');
        });
});

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
        imgJeringa2 = new Image();
        imgJeringa2.src = 'img/etapa1/jeringa2.png';
        imgJeringaSinCanuto = new Image();
        imgJeringaSinCanuto.src = 'img/etapa1/jeringaSinCanuto.png';
        imgJeringaSangre = new Image();
        imgJeringaSangre.src = 'img/etapa1/jeringaSangre.png';
        imgCanuto = new Image();
        imgCanuto.src = 'img/etapa1/canuto.png';
        imgManoIzq = new Image();
        imgManoIzq.src = 'img/etapa1/manoIzq.png';
        imgGoma = new Image();
        imgGoma.src = 'img/etapa1/goma.png';
        imgCajaGuantes = new Image();
        imgCajaGuantes.src = 'img/etapa1/cajaGuantes.png';
        imgCurita = new Image();
        imgCurita.src = 'img/etapa1/curita.png';

        imgHisopo = new Image();
        imgHisopo.src = 'img/etapa1/hisopo.png';
        imgFrasco = new Image();
        imgFrasco.src = 'img/etapa1/frasco.png';
        imgVidrio = new Image();
        imgVidrio.src = 'img/etapa1/vidrio.png';

        imgTubo = new Image();
        imgTubo.src = 'img/etapa1/tubo.png';
        imgTubo2 = new Image();
        imgTubo2.src = 'img/etapa1/tubo.png';
        imgTubo3 = new Image();
        imgTubo3.src = 'img/etapa1/tubo.png';
        imgTubo4 = new Image();
        imgTubo4.src = 'img/etapa1/tubo.png';

        imgTuboSangre = new Image();
        imgTuboSangre.src = 'img/etapa1/tuboSangre.png';
        imgGradilla = new Image();
        imgGradilla.src = 'img/etapa1/gradilla.png';
        imgTacho = new Image();
        imgTacho.src = 'img/etapa1/tacho.png';
        imgDescartador = new Image();
        imgDescartador.src = 'img/etapa1/descartador.png';
        imgJeringa3 = new Image();
        imgJeringa3.src = 'img/etapa1/jeringa3.png';
        imgCent = new Image();
        imgCent.src = 'img/etapa1/centrifuga.png';

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
        // dibujo todo hasta el nivel 2 inclusive
        if (niveles[2] === 0){
            dibujarFantasma();
            dibujarSultan();
            dibujarBrazo();
            dibujarTacho();
            dibujarCajaGuantes();
            dibujarPeladora();
            dibujarGoma();
            
            dibujarGradilla();
            dibujarTubo();
            dibujarTextoAlPinchar();
            dibujarDescartador();
            dibujarJeringa();

            dibujarContinuarTransversar();
            dibujarNoUsables();
            //dibujarContinuarConProcMuestra();
            nivel1(); //multiple Choise diagnostico
            mostrarNombre();
            
        }
        if (niveles[2] === 1){ // debe completar la etapa 
            dibujarProcesarMuestra();
            
        }
        //dibujarCent();
        dibujarManos();
    }

}
// Funciones Dibujar
// ==================================================
function dibujarCent(){
    ctx.drawImage(imgCent, objetoCent.x , objetoCent.y, objetoCent.width, objetoCent.height);
}

function dibujarNoUsables(){ // dibujo objetos que no se van a utilizar
    ctx.drawImage(imgFrasco, objetoFrasco.x, objetoFrasco.y, objetoFrasco.width, objetoFrasco.height);
    ctx.drawImage(imgHisopo, objetoHisopo.x, objetoHisopo.y, objetoHisopo.width, objetoHisopo.height);
    ctx.drawImage(imgVidrio, objetoVidrio.x, objetoVidrio.y, objetoVidrio.width, objetoVidrio.height);
    
    ctx.drawImage(imgTubo2, objetoTubo2.x, objetoTubo2.y, objetoTubo2.width, objetoTubo2.height);
    ctx.drawImage(imgTubo3, objetoTubo3.x , objetoTubo3.y, objetoTubo3.width, objetoTubo3.height);
    ctx.drawImage(imgTubo4, objetoTubo4.x , objetoTubo4.y, objetoTubo4.width, objetoTubo4.height);
}

function dibujarGradilla(){
    ctx.drawImage(imgGradilla, objetoGradilla.x, objetoGradilla.y, objetoGradilla.width, objetoGradilla.height);
}
function dibujarTubo(){
    if (objetoTubo.est === 0){
        ctx.drawImage(imgTubo, objetoTubo.x, objetoTubo.y, objetoTubo.width, objetoTubo.height);
    }
    if (objetoTuboSangre.est === 1){
        ctx.drawImage(imgTuboSangre, objetoTuboSangre.x, objetoTuboSangre.y, objetoTuboSangre.width, objetoTuboSangre.height);
    }

    if (objetoTuboSangre.est === 3){
        ctx.drawImage(imgTuboSangre, objetoTuboSangre.x, objetoTuboSangre.y, objetoTuboSangre.width + 30, objetoTuboSangre.height + 30);
    }

    if ( (mascaraClick(objetoTubo.x, objetoTubo.y, objetoTubo.width,objetoTubo.height , 0.0)) && (objetoDescartador.est === 1) ){
        objetoTubo.est = 1; // borro el tubo sin sangre
        objetoTuboSangre.est = 1; //dibujo el tubo con sangre
    }
}
function dibujarDescartador(){
   ctx.drawImage(imgDescartador, objetoDescartador.x, objetoDescartador.y, objetoDescartador.width, objetoDescartador.height);
   //console.log(click.y);
   if ((mascaraClick(725, 480, 45,70, 0.0)) && (objetoJeringa.est === 4)){
        objetoJeringa.est = 5; // para que no dibuje el resto de las jeringas
        objetoJeringa3.est = 1;// jeringa con sangre y sin aguja
        objetoDescartador.est = 1;
    }
}
function dibujarTacho(){
    ctx.drawImage(imgTacho, objetoTacho.x, objetoTacho.y, objetoTacho.width, objetoTacho.height);
    if ((mascaraClick(objetoTacho.x,objetoTacho.y,objetoTacho.width, objetoTacho.height, 0.0)) && (objetoTuboSangre.est === 1)){
        objetoJeringa3.est = 2; //para que no se dibuje la jeringa3 con sangre
        objetoTacho.est = 1;
        objetoTubo = 3; // borro el tubo y luego dibujo el tubo mas grande para nivel 3
        niveles[2] = 1; //nivel 2 completo.   
    }
}
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
var congelarMano =  false;
var congelar = { x: 0, y: 0 };

function dibujarManos() {
    ctx.save();
    if (objetoManos.est === false){
        ctx.drawImage(imgManos, coordenadasMouse.x, coordenadasMouse.y, objetoManos.width, objetoManos.height);
    }else{
        if (congelarMano){
             ctx.drawImage(imgGuantes, congelar.x, congelar.y, objetoGuantes.width, objetoGuantes.height);
        }else{
            ctx.drawImage(imgGuantes, coordenadasMouse.x, coordenadasMouse.y, objetoGuantes.width, objetoGuantes.height);
        }
    }
    ctx.restore();
    // ctx.save();
    // ctx.rect(coordenadasMouse.x, coordenadasMouse.y,coordenadasMouse.width,coordenadasMouse.height);
    // ctx.fillStyle = '#640AAA';
    // ctx.fill();
    // ctx.restore();
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
    if((objetoJeringa.est === 2) ){//2
        ctx.drawImage(imgJeringa, coordenadasMouse.x - 4 , coordenadasMouse.y - 40, objetoJeringa.width, objetoJeringa.height);
                //capturo ultima posicion del mouse
        ctx.drawImage (imgManoIzq, coordenadasMouse.x - 40, coordenadasMouse.y +30, 55, 110 );
        posCanuto.x = coordenadasMouse.x - 5;
        posCanuto.y =   coordenadasMouse.y;
        posManoI.x = coordenadasMouse.x - 40;
        posManoI.y =  coordenadasMouse.y + 30;
    }
    if ((objetoJeringa.est === 4)){
        ctx.drawImage(imgJeringa2, coordenadasMouse.x - 4 , coordenadasMouse.y - 40, objetoJeringa.width, objetoJeringa.height);
        objetos[1].est = 2;
    }
    if ((objetoJeringa3.est === 1)){
        ctx.drawImage(imgJeringa3, coordenadasMouse.x - 4 , coordenadasMouse.y - 40, objetoJeringa3.width, objetoJeringa3.height);
        
    }
    
    if (pinchado === true){//reproducir animacion

        objetoJeringa.est = 3;
        //dibujo mano 2, canuto, jeringa con sangre en alfa
        dibujarExtraccion();
    }
    function dibujarExtraccion(){
        if ((cont < 500)){
            posManoI.y = posManoI.y +0.02;
            posManoI.x = posManoI.x - 0.01;
            posCanuto.y = posCanuto.y + 0.02;
            posCanuto.x = posCanuto.x - 0.01;
            alfa1 = alfa1 + 0.002;
            alfa2 = alfa2 - 0.001;
            cont++;
            congelarMano = true;
            
        }else{
            borrarSinCanuto = true;
            objetoJeringa.est = 4;
            pinchado =false;

            //niveles[1] = 1; 
            continuarTrans = true;
            // nivel 2 completado
            //console.log(objetoJeringa.est);
            congelarMano = false;
        }
        
        if ((objetoJeringa.est === 3)){
            ctx.drawImage(imgManoIzq, posManoI.x, posManoI.y, 55, 110 );
            ctx.drawImage(imgCanuto, posCanuto.x, posCanuto.y -40 , 40, 90 );

            ctx.save();
            ctx.globalAlpha = alfa1;
            ctx.drawImage (imgJeringaSangre, congelarMano.x - 5, congelarMano.y - 40, objetoJeringa.width, objetoJeringa.height );
            ctx.restore();

             if (borrarSinCanuto === false){
                 ctx.save();
                 ctx.globalAlpha = alfa2;
                 ctx.drawImage (imgJeringaSinCanuto, congelar.x - 5, congelar.y - 40, objetoJeringa.width, objetoJeringa.height );
                 ctx.restore();

            }
        }
    }
}
function dibujarGoma(){
    if (objetos[1].est === 1){
        ctx.drawImage(imgGoma2, objetoGoma2.x, objetoGoma2.y, objetoGoma2.width, objetoGoma2.height);
    }
    if (objetos[1].est === 0){
        ctx.drawImage(imgGoma, objetos[1].x, objetos[1].y, objetos[1].width, objetos[1].height);
        }
    if (objetos[1].est === 2){

        ctx.drawImage(imgCurita, objetoCurita.x , objetoCurita.y , objetoCurita.width, objetoCurita.height);
    }
}
function dibujarCajaGuantes() {
    ctx.save();
    ctx.drawImage(imgCajaGuantes, objetos[2].x, objetos[2].y, objetos[2].width, objetos[2].height);
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
// Detectos los clikcs en los objetos y el Contacto
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
            if (mascaraClick2(677 , 314, 5, 20, click.x + 30, click.y - 40, 0.0 )){
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
        
                congelar.x = click.x ; // para el dibujo de manos
                congelar.y = click.y - 5;
                

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
        dibujarMouse();

        function dibujarMouse(){
                coordenadasMouse.x = mouseMano.x ; // para el dibujo de manos
                coordenadasMouse.y = mouseMano.y - 5;
            }

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


/* Para marcar el recorrido
================================================*/
function mapa(){
        var vet = document.getElementsByClassName('texto');
        
        //v0.style.color = 'blue';
        //v0.style.font = 'bold';
        //console.log(capa);
        for (var i=0; i < vet.length; i++) {
            
            if ( niveles[i] > 0){
                vet[i].style.color = 'blue';
                //recorrido[i].style.font = 'bold';
                console.log( vet[i].id);
             }
         }
}
/* Programa Principal
===================================================*/
function frameLoop() {
    estadoJuego();
    drawBackground();
    dibujarTextoComenzar();
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