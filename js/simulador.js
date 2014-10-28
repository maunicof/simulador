
//===============
function drawBackground() {
    ctx.drawImage(fondo, 0, 0, 1000, 660);
}
// Dibujar objetos
// ==================================================
function dibujarObjetos() {

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
        if (niveles[2] === 1){ // activa la etapa
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujarProcesarMuestra();
        }
        if (niveles[3] === 1) {
             dibujarCent();
         }
         if (niveles[4] === 1) {
            nivel4();
         }
        
        
    }
     nivel4();
    //dibujarCent();
    dibujarManos();
}
// Funciones Dibujar
// ==================================================
function dibujarCent(){ // dibuja los tubos y la centrifuga
    centrifuga();
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
var congelar = { x: 650, y: 350 };


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
    if((objetoJeringa.est === 2)){
        ctx.drawImage(imgJeringa, coordenadasMouse.x - 4 , coordenadasMouse.y - 40, objetoJeringa.width, objetoJeringa.height);
                //capturo ultima posicion del mouse
        
        posCanuto.x = 649 - 5;
        posCanuto.y =   349;
        posManoI.x = 649 - 40;
        posManoI.y =  349 + 30;


    }
    if ((objetoJeringa.est === 4)){
        ctx.drawImage(imgJeringa2, coordenadasMouse.x - 4 , coordenadasMouse.y - 40, objetoJeringa.width, objetoJeringa.height);
        objetos[1].est = 2;
    }
    if ((objetoJeringa3.est === 1)){
        ctx.drawImage(imgJeringa3, coordenadasMouse.x - 4 , coordenadasMouse.y - 40, objetoJeringa3.width, objetoJeringa3.height);
        
    }

    if (pinchado === 2){//reproducir animacion
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
            pinchado = 0;

            //niveles[1] = 1; 
            continuarTrans = true;
            // nivel 2 completado
            //console.log(objetoJeringa.est);
            congelarMano = false;
            coordenadasMouse.x = 649;
            coordenadasMouse.y = 349;
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
    ctx.drawImage(imgCajaGuantes, objetoCaja.x, objetoCaja.y, objetoCaja.width, objetoCaja.height);
    ctx.restore();
}


// Mover Objetos
// ==================================================
function moverObjetos(){
    if ((objetoActual !== null)){
       
        if ((objetoActual.est  === 1) && (objetoActual.id === 'peladora')){
            objetoActual.x = objetoActual.x + dx;
            objetoActual.y = objetoActual.y + dy;
            console.log(objetoActual.est);
        }else{
            if (objetoJeringa.est === 5 ){ // jla jeringa con sangre esta tomada por la mano
            objetoActual.x = objetoActual.x + dx;
            objetoActual.y = objetoActual.y + dy;
            }else{
                if (objetoActual.est != -99){
                    objetoActual.x = objetoActual.x + dx;
                    objetoActual.y = objetoActual.y + dy;
                    console.log(objetoActual.est);
                }
                
            }
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
                pinchado = 1;
            }
        }
    }
    function clickJeringa(){

        if (((objetos[1].est === 1)) && (objetoCaja.est === 1)){
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
            ctx.rect(objetoCaja.x, objetoCaja.y, objetoCaja.width, objetoCaja.height);
            ctx.fill();
            ctx.restore();
            
                if (ctx.isPointInPath(click.x, click.y)) {
                    
                    objetoManos.est = true;
                    //objetos[2].est = 1; habilita jeringa
                    objetos[0].est = 1; // habilita peladora
                    objetoCaja.est = 1; // cambio el estado de la caja
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
        dibujarMouse();

        function dibujarMouse(){
                coordenadasMouse.x = mouseMano.x ; // para el dibujo de manos
                coordenadasMouse.y = mouseMano.y - 5;
            }

        if ((objetoActual !== null) && (objetoActual.est != -99)) {
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
                //console.log( vet[i].id);
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