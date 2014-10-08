// Carga pop up al iniciar =============================

$(window).load(function(){
        //$('#osis').modal('show');
        $('body').on('hidden.bs.modal', '.modal', function () { // video pause al cerrar modal
        $('video').trigger('pause');
        });
});
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// ======================================================
var dx, dy ;
var coordenadasMouse = {};
var click = {};

var textoPlay = {
    counter : -1,
    titulo:''
};
/* Nivel 1
--------------------------------*/
var textoNivel3 = [
    { txt: 'Procesar Muestra' },
    { txt: 'Inclinación del tubo', a:'180°', b: '90°', c: '45°', d:'20°', e:'10', correcta:'c' },
    { txt: 'Temperatura', a:'Ambiental (18° a 25ºC)', b:'Refrigerado ( 4ºC)', c:'Refrigerado ( 4ºC).Luego (-20ºC)', d:'Congelado  (-20ºC) ' ,correcta: 'a'},
    { txt: 'Tiempo', a:'1440 min', b:'60- 120 min', c:'10-20 min', d:'1-5 min', correcta:'d' }
];
var textoNivel1 = [
    { est: 'Moquillo' },
    { est: 'Epilepsia' },
    { est: 'Neosporosis', correcta: false },
    { est: 'Lesión traumática en región lumbosacra' },
    { est: 'Continuar con Transvasar la Sangre'},
    { est: 'Continuar con Procesamiento de Muestra'}
];
var textoTransvasar = [
    { txt: 'Luego de haber llevado a cabo la toma de muestra,  se  procede a'},
    { txt: 'procesar la sangre, para ser enviada en forma correcta  al laboratorio. '},
    { txt:'Para poder realizar la práctica debes seleccionar la acción a seguir.'}
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
var objetoJeringa =       { id: 'jeringa' , est: 0, x: 300, y: 480, width: 40,  height: 90 };
var objetoJeringa2 =      { id: 'jeringa' , est: 0, x: 300, y: 480, width: 60,  height: 140 };
var objetoBrazo =         { id: 'brazo',  est:false , x:672, y:270, width:42, height:90 };
var objetoGuantes =       { id: 'guantes',est: false, x: 250, y: 400, width: 55, height: 110 };
var objetoManos =         { id: 'manos',  est: false, x: 450, y: 430, width: 55, height: 110 };
var objetoSultan =        { id: 'sultan', est: false, x: 540, y: 50, width: 430, height: 360 };
var objetoGoma2 =         { id: 'goma2',   est: false, x: 664, y: 255, width: 68, height: 40 };
var objetoJeringaSnagre = { id: 'jeringaSangre',   est: false, x: 664, y: 255, width: 40,  height: 90 };
var objetoFantasma =      {x:684, y:300, width:12, height:30};

var objetoGradilla =      { id: 'gradilla',est: 0, x: 450, y: 550, width: 140, height: 140 };
var objetoTacho =         { id: 'tacho',est: 0, x: 40, y: 350, width: 140, height: 170 };
var objetoDescartador =   { id: 'descartador',est: false, x: 720, y: 480, width: 100, height: 110 };
var objetoTubo =          { id: 'tubo',est: 0, x: 465, y: 560, width: 15, height: 80 };
var objetoTuboSangre =    { id: 'tubo',est: 0, x: 465, y: 560, width: 15, height: 80 };
var objetoJeringa3 =      { id: 'jeringa' , est: 0, x: 300, y: 480, width: 40,  height: 90 };
var objetoCurita =      { id: 'curita' , est: 0, x: 678, y: 325, width: 23,  height: 10 };

var objetoVidrio =      { id: 'vidrio' , est: 0, x: 678, y: 565, width: 40,  height: 40 };
var objetoHisopo =      { id: 'hisopo' , est: 0, x: 678, y: 565, width: 10,  height: 80 };
var objetoFrasco =      { id: 'frasco' , est: 0, x: 678, y: 565, width: 40,  height: 40 };

var arrastrar;
var pinchado = false;
var objetoActual = null;
var mouseOld = {};
var mouseNew = {};

// para extraccion
var posCanuto ={ x:0, y:0};
var posManoI ={ x:0, y:0};
var alfa1 = ctx.globalAlpha = 0.0;
var alfa2 = ctx.globalAlpha = 1;
var cont = 0; // para fade jeringa
var borrarSinCanuto = false;
// ---------------------------------------------

/* Nivel 3
--------------------------------*/

// --------------------------------------------------
var imgDescartador, imgGradilla, imgTacho, imgTubo, imgJeringa2, imgJeringa3;
var imgGoma2, imgBrazo, imgBrazo2, imgSultan, imgPeladora, imgManos;
var imgJeringa,imgGuantes, imgGoma, imgCajaGuantes, imgJeringaSangre, imgCanuto, imgJeringaSinCanuto, imgManoIzq;
var imgHisopo, imgVidrio, imgFrasco, imgDescartador, imgTacho, imgGradilla, imgTubo, imgTuboSangre, imgCurita;
var imgDescartador, imgHand2;

var imagenes = ['img/etapa1/brazo.png','img/etapa1/cajaGuantes.png',
'img/etapa1/goma.png', 'img/etapa1/sultan2.png','img/etapa1/fondo.png','img/etapa1/hand2.png',
'img/etapa1/hand.png','img/etapa1/jeringa.png','img/etapa1/jeringaSangre.png','img/etapa1/canuto.png',
'img/etapa1/jeringaSinCanuto.png','img/etapa1/manoIzq.png','img/etapa1/jeringa2.png',
'img/etapa1/descartador.png','img/etapa1/gradilla.png','img/etapa1/tubo.png',
'img/etapa1/tacho.png', 'img/etapa1/tuboSangre.png', 'img/etapa1/curita.png',
'img/etapa1/hisopo.png', 'img/etapa1/frasco.png', 'img/etapa1/vidrio.png'
];

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

    }
}


function drawBackground() {
    ctx.drawImage(fondo, 0, 0, 1000, 660);
}
// Dibujar objetos
// ==================================================
function dibujarObjetos() {
    //dibujarProcesarMuestra();
    // ctx.drawImage(imgTuboSangre, objetoTuboSangre.x, objetoTuboSangre.y - 160, objetoTuboSangre.width + 20, objetoTuboSangre.height + 110);

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
            dibujarContinuarTransversar();
            dibujarGradilla();
            //dibujarTubo();
            
            dibujarTextoAlPinchar();
            dibujarDescartador();
            dibujarJeringa();

            dibujarContinuarConProcMuestra();
            nivel1(); //multiple Choise diagnostico
            dibujarNoUsables();
        }
        dibujarTubo();
        dibujarManos();
    }

}
// Funciones Dibujar
// ==================================================
function dibujarNoUsables(){
    ctx.drawImage(imgFrasco, objetoFrasco.x + 10, objetoFrasco.y, objetoFrasco.width, objetoFrasco.height);
    ctx.drawImage(imgHisopo, objetoHisopo.x - 20, objetoHisopo.y, objetoHisopo.width, objetoHisopo.height);
    ctx.drawImage(imgVidrio, objetoVidrio.x + 150, objetoVidrio.y, objetoVidrio.width, objetoVidrio.height);
}

function dibujarGradilla(){
    ctx.drawImage(imgGradilla, objetoGradilla.x, objetoGradilla.y, objetoGradilla.width, objetoGradilla.height);
}
function dibujarTubo(){
    ctx.drawImage(imgTubo, objetoTubo.x + 30, objetoTubo.y, objetoTubo.width, objetoTubo.height);
    ctx.drawImage(imgTubo, objetoTubo.x + 55, objetoTubo.y, objetoTubo.width, objetoTubo.height);
    ctx.drawImage(imgTubo, objetoTubo.x + 80, objetoTubo.y, objetoTubo.width, objetoTubo.height);
    
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
    }
}
// -----------------------------------
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
            
        }else{
            borrarSinCanuto = true;
            objetoJeringa.est = 4;
            pinchado =false;

            //niveles[1] = 1; 
            continuarTrans = true;
            // nivel 2 completado
            //console.log(objetoJeringa.est);
        }
        if (cont > 500){

        }
        if ((objetoJeringa.est === 3)){
            ctx.drawImage(imgManoIzq, posManoI.x, posManoI.y, 55, 110 );
            ctx.drawImage(imgCanuto, posCanuto.x, posCanuto.y -40 , 40, 90 );

            ctx.save();
            ctx.globalAlpha = alfa1;
            ctx.drawImage (imgJeringaSangre, coordenadasMouse.x - 5, coordenadasMouse.y - 40, objetoJeringa.width, objetoJeringa.height );
            ctx.restore();

             if (borrarSinCanuto === false){
                 ctx.save();
                 ctx.globalAlpha = alfa2;
                 ctx.drawImage (imgJeringaSinCanuto, coordenadasMouse.x - 5, coordenadasMouse.y - 40, objetoJeringa.width, objetoJeringa.height );
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

/* dibujar Textos
===================================================*/
var verde = false, inclinacion =false, tiempo = false;
function dibujarProcesarMuestra(){
    if(niveles[2] === 0){
        var titulo = 'bold 18pt sans-serif';
        var subtitulo = 'bold 16pt sans-serif';
        var tuboinc = '13pt sans-serif';
        var colorTexto = 'white';
        dibujarFondoTexto(50, 50, 900, 550, '#9254C4', 1 );
        dibujarFondoTexto(50, 50, 900, 40, '#640AAA', 1 );

        dibujarTexto(textoNivel3[0].txt,60, 80, 'white', titulo, 0, 0, 0);

        dibujarTexto(textoNivel3[1].txt,80, 140, colorTexto, subtitulo, 0, 0, 0);
        dibujarTexto(textoNivel3[1].a,150, 180, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].b,150, 230, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].c,150, 280, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].d,150, 330,colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].e,150, 380, colorTexto, tuboinc, 0, 0, 0);

        dibujarTexto(textoNivel3[2].txt,380, 140, colorTexto, subtitulo, 0, 0, 0);
        dibujarTexto(textoNivel3[2].a,380, 180,colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[2].b,380, 230, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[2].c,380, 280, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[2].d,380, 330, colorTexto, tuboinc, 0, 0, 0);

        dibujarTexto(textoNivel3[3].txt,760, 140, colorTexto, subtitulo, 0, 0, 0);
        dibujarTexto(textoNivel3[3].a,760, 180, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[3].b,760, 230, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[3].c,760, 280, colorTexto, tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[3].d,760, 330, colorTexto, tuboinc, 0, 0, 0);

        verificarInclinacion();
        verificarTemperatura();
        verificarTiempo();

    }

    function verificarTiempo(){
        if (mascaraClick(760, 160, 100, 30, 0)){
            incorrecto(740, 180);
        }
        if (mascaraClick(760, 210, 100, 30, 0) && (tiempo === false)){
            tiempo = true;
        }
        if (tiempo){correcto(740, 223);}

        if (mascaraClick(760, 260, 100, 30, 0)){
            incorrecto(740, 280);
        }
        if (mascaraClick(760, 310, 100, 30, 0)){
            incorrecto(740, 330);
        }

    }
    function verificarTemperatura(){
        if (mascaraClick(380, 160, 250, 30, 0) && (inclinacion === false)){
            inclinacion = true;
        }
        if (inclinacion){correcto(360, 173);}

        if (mascaraClick(380, 260, 250, 30, 0)){
            incorrecto(360, 280);
        }
        if (mascaraClick(380, 210, 250, 30, 0)){
            incorrecto(360, 230);
        }
        if (mascaraClick(380, 310, 250, 30, 0)){
            incorrecto(360, 330);
        }
    }

    function verificarInclinacion(){
        if (mascaraClick(150, 260, 50, 30, 0) && (verde === false)){
        verde = true;
        }
        if (verde){correcto(130, 275);}

        if (mascaraClick(150, 160, 50, 30, 0)){
            incorrecto(130, 180);
        }
        if (mascaraClick(150, 210, 50, 30, 0)){
            incorrecto(130, 230);
        }
        if (mascaraClick(150, 310, 50, 30, 0)){
            incorrecto(130, 330);
        }
        if (mascaraClick(150, 360, 50, 30, 0)){
            incorrecto(130, 380);
        }
    }
}
function correcto(x, y ){
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 7;
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(x, y, 7, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}
function incorrecto(x, y){
    ctx.save();
    ctx.shadowColor = "#990000";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 7;
    ctx.fillStyle = 'red';
    ctx.font = 'bold 14pt sans-serif';
    ctx.fillText('X',x,y);
    ctx.restore();
}
var continuarTrans = false;
function dibujarContinuarTransversar(){
    if ((continuarTrans === true) && (niveles[1] === 0)){
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(100,80,800,140);
        ctx.fillStyle = '#640AAA';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = '13pt sans-serif';
        //ctx.fillText(textoNivel1[4].est , 60,390);
        ctx.fillText(textoTransvasar[0].txt , 130,110);
        ctx.fillText(textoTransvasar[1].txt , 130,140);
        ctx.fillText(textoTransvasar[2].txt , 130,170);
        ctx.fillText('Continuar' , 785,200);
        ctx.restore();

        if (mascaraClick( 785 , 190, 80, 20, 0.0 )){
            niveles[1] = 1; //nivel 1 completo.
            continuarTrans = false;

        }
    }
}
function dibujarContinuarConProcMuestra(){
    if(objetoTacho.est === 1){
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.rect(50,360,700,40);
        ctx.fillStyle = '#0066CC';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = 'italic bold 22pt sans-serif';
        ctx.fillText(textoNivel1[5].est , 60,390);
        ctx.restore();


        if (mascaraClick( 50 , 360, 605, 40, 0.0 )){
            niveles[2] = 1; //nivel 2 completo.
            objetoTacho.est = 2;
            
        }
    }
}
var desapareceTextoAlPichar = 0;
function dibujarTextoAlPinchar(){
    if ((objetoJeringa.est === 2) && (textoNivel1Sangre[0].mostrar === true)) {
        placaTexto(
            textoNivel1Sangre[1].est,
            textoNivel1Sangre[2].est, 150,200,
            textoNivel1Sangre[3].est, 150,250,
            textoNivel1Sangre[4].est, 150,300
            );
        if (mascaraClick(150, 180,120,30,0)){
            // textoNivel1Sangre[0].mostrar = false;
            incorrecto(130, 200);
        }
        if (mascaraClick(150, 225,110,30,0)){
            // textoNivel1Sangre[0].mostrar = false;
            //textoNivel1Sangre[0].correcta = true;
            correcto(135, 240);
            desapareceTextoAlPichar++;
        }
        if (mascaraClick(150, 275,110,30,0)){
            // textoNivel1Sangre[0].mostrar = false;
            incorrecto(130, 300);
        }
        //console.log(textoNivel1Sangre[0].mostrar);
        if (desapareceTextoAlPichar > 150){
            textoNivel1Sangre[0].mostrar = false;
        }
    }
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
                coordenadasMouse.x = mouseMano.x ; // dibujo manos
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
function dibujarFondoTexto(x, y, w, h, color, alfa ){
    ctx.save();
    ctx.globalAlpha = alfa;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}
function dibujarTexto(texto,x, y, color, fuente, sombrax, sombray, blur){
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowOffsetX = sombrax;
    ctx.shadowOffsetY = sombray;
    ctx.shadowBlur = blur;
    ctx.fillStyle = color;
    ctx.font = fuente;
    ctx.fillText(texto,x ,y);
    ctx.restore();
}
// Nivel 1
// ==================================================
function nivel1(){ //multiple choise Diagnostico

    if (niveles[0] === 0) {

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(100,80,800,350);
        ctx.fillStyle = '#9254C4';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(100,80,800, 80);
        ctx.fillStyle = '#640AAA';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '13pt sans-serif';
        ctx.fillText('De acuerdo al caso clínico, que se presentó en el día de la fecha y con los siguientes', 120,110);
        ctx.fillText(' datos recolectados en el examen clínico tu diagnóstico presuntivo es: ', 120,130);
        ctx.restore();

        ctx.save();
        ctx.font = '15pt sans-serif';
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
            ctx.font = 'bold 16pt sans-serif';
            ctx.fillText('Continuar',700,410);
            ctx.restore();

             if (mascaraClick(700,395,100,18,0.0)){
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
// Placa texto
// ==================================================
function placaTexto(titulo, t1, t1x, t1y, t2, t2x, t2y, t3, t3x, t3y, t4, t4x, t4y, t5, t5x,t5y ){
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.rect(100,120,600,300);
    ctx.fillStyle = '#9254C4';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.rect(100,120,600, 40);
    ctx.fillStyle = '#640AAA';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '14pt sans-serif';
    ctx.fillText(titulo, 120,150);
    ctx.restore();

    ctx.save();
    ctx.font = ' 13pt sans-serif';
    ctx.fillText(t1, t1x,t1y);
    ctx.fillText(t2, t2x,t2y);
    ctx.fillText(t3, t3x,t3y);
    ctx.fillText(t4, t4x,t4y);
    ctx.fillText(t5, t5x,t5y);
    ctx.restore();
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