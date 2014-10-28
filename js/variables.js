var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

/*MODALES
 ======================================================*/
var modal1 = true;
var mod_acondicionar = true;
var mod_diagnostico1 = true;
var mod_diagnostico2 = false;


//---------------------------------
var preloader;
var continuarNivel2 = 0;
var dx, dy ;
var coordenadasMouse = { width: 10, height: 10 };
var click = {};

var textoPlay = {
    counter : -1,
    titulo:''
};
var verde = false, inclinacion =false, tiempo = false;

var continuarTrans = false;
var desapareceTextoAlPichar = 0;

var juego = { estado: 'apagado' };// jugando, completado
var niveles = [ 0 , 0 , 0,  0 , 0 , 0];


// Fuente
var violeta2 = '#9254C4', violeta1 = '#640AAA', nivel1txt = 0;
var titulo = 'bold 18pt sans-serif';
var subtitulo = 'bold 16pt sans-serif';
var tuboinc = '13pt sans-serif';
var fuente = '13pt sans-serif';
var colorTexto = 'white';

/* Texto niveles
--------------------------------*/
var textoNivel3 = [
    { txt: 'Procesar Muestra' },
    { txt: 'Inclinación del tubo', a:'180°', b: '90°', c: '45°', d:'20°', e:'10', correcta:'c' },
    { txt: 'Temperatura', a:'Ambiental (18° a 25ºC)', b:'Refrigerado ( 4ºC)', c:'Refrigerado ( 4ºC).Luego (-20ºC)', d:'Congelado  (-20ºC) ' ,correcta: 'a'},
    { txt: 'Tiempo', a:'1440 min', b:'60- 120 min', c:'10-20 min', d:'1-5 min', correcta:'d' },
    { txt: 'En este momento debes procesar la muestra en forma natural, para ello elige qué valores de los' },
    { txt: ' siguientes parámetros se utilizan para poder retraer el coágulo y así poder extraer el suero.' },
    { c1: false, c2 : false, c3: false }
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


var objetos = [
    { id: 'peladora', est: 0, x: 200, y: 480, width: 70,  height: 90 },
    { id: 'goma',     est: 0, x: 380, y: 530, width: 60, height: 40 },
    { id: 0, agu: -1, est: 0, x: 465, y: 560, width: 22, height: 80 },
    { id: 1, agu: -1, est: 0, x: 495, y: 560, width: 22, height: 80 },
    { id: 2, agu: -1, est: 0, x: 520, y: 560, width: 22, height: 80 },
    { id: 3, agu: -1, est: 0, x: 545, y: 560, width: 22, height: 80 },
    { id: 4, agu: -1, est: 0, x: 575, y: 560, width: 22, height: 80 },
    { id: 5, agu: -1, est: 0, x: 600, y: 560, width: 22, height: 80 },
    { id: 6, agu: -1, est: 0, x: 100, y: 347, width: 20, height: 30 }, // refrigerante
    { id: 7, agu: -1, est: 0, x: 400, y: 560, width: 32, height: 60 }, // eppendorf
    { id: 8, agu: -1, est: 0, x: 500, y: 540, width: 70, height: 100 } // bolsa1
];
var objetoNev1 = { id: 'nevera1',est: 0, x: 245, y: 480, width: 100, height: 150 }; //nevera1
var objetoNev2 = { id: 'nevera2',est: 0, x: 545, y: 560, width: 100, height: 150 }; //nevera2
var objetoBolsa2 = { id: 'bolsa2',est: 0, x: 645, y: 560, width: 80, height: 90 }; // bolsa 2
var objetoHela1 = { id: 'hela1',est: 0, x: -25, y: 185, width: 300, height: 350 }; // Hela1
var objetoHela2 = { id: 'hela2',est: 0, x: -25, y: 185, width: 300, height: 350 }; // Hela2


var objetoTuboTapa = { id: 'tubo',est: 0, x: 545, y: 560, width: 15, height: 10 };
var objetoTS =       { id: 'Suero', agu: -1, est: 0, x: 355, y: 420, width: 18, height: 90 };
var objetoPip =          { id: 'pip',est: 0, x: 345, y: 200, width: 30, height: 150 };
var objetoPS =     { id: 'ps',est: 0, x: 345, y: 100, width: 30, height: 150 };
var agujeros = [ // agujeros de contaco con la centrifuga
    { id: 0,est: 0, x: 295, y: 490, width: 3, height: 2 },
    { id: 1,est: 0, x: 340, y: 500, width: 3, height: 2 },
    { id: 2,est: 0, x: 328, y: 537, width: 3, height: 2},
    { id: 3,est: 0, x: 280, y: 525, width: 3, height: 2 }
];


var objetoCaja =          { id: 'cajaGuantes', est: 0, x: 20, y: 500, width: 150, height: 90 };
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

var objetoTubo =           { id: 'tubo',est: 0, x: 465, y: 560, width: 15, height: 80 };
var objetoTubo2 =          { id: 'tubo',est: 0, x: 495, y: 560, width: 15, height: 80 };
var objetoTubo3 =          { id: 'tubo',est: 0, x: 520, y: 560, width: 15, height: 80 };
var objetoTubo4 =          { id: 'tubo',est: 0, x: 545, y: 560, width: 15, height: 80 };




var objetoTuboSangre =    { id: 'tubo',est: 0, x: 465, y: 560, width: 15, height: 80 };

var objetoJeringa3 =      { id: 'jeringa' , est: 0, x: 300, y: 480, width: 40,  height: 90 };
var objetoCurita =      { id: 'curita' , est: 0, x: 678, y: 325, width: 23,  height: 10 };

var objetoVidrio =      { id: 'vidrio' , est: 0, x: 880, y: 535, width: 40,  height: 40 };
var objetoHisopo =      { id: 'hisopo' , est: 0, x: 658, y: 550, width: 10,  height: 80 };
var objetoFrasco =      { id: 'frasco' , est: 0, x: 858, y: 595, width: 40,  height: 40 };

var objetoCent =      { id: 'frasco' , est: 0, x: 208, y: 300, width: 200,  height: 380 };
var objetoCentCerrada =      { id: 'frasco' , est: 0, x: 208, y: 445, width: 200,  height: 230 };

var texto01n2 =      { est: 0, x: 80, y: 80, width: 840,  height: 42 };
var texto02n2 =      { est: 0, x: 80, y: 170, width: 790,  height: 210 };



// para extraccion
var posCanuto ={ x:0, y:0};
var posManoI ={ x:0, y:0};
var alfa1 = ctx.globalAlpha = 0.0;
var alfa2 = ctx.globalAlpha = 1;
var cont = 0; // para fade jeringa
var borrarSinCanuto = false;

var arrastrar;
var pinchado = 0;
var objetoActual = null;
var mouseOld = {};
var mouseNew = {};

/*de Nivel 3
==============================*/

var contM = [];

var time = 100;
var mostrarNom = false;
var seleccion = [];
var pri = [ // guardo el agujero y el tubo principales
            {a: -1, t: -1},
            {a: -1, t: -1},
            {a: -1, t: -1},
            {a: -1, t: -1}
];
var sec = [ // guardo el agujero y el tubo secundarios
            {a: -1, t: -1},
            {a: -1, t: -1},
            {a: -1, t: -1},
            {a: -1, t: -1}
];
var diag1 = [];
var diag2 = [];
var verificacionP = false;
var verificacionS = false;
var verificacionSemiFinal = false;

var rpm = [];
var tiempoC = [];
var mostrarTextoRPM = false;
var verificacionSuperFinal = -1;
var contadorFinal = 0;
var mostrarResultadoFinal = false;
var contPP = 0;
var contP = 0;

/*  imagens
--------------------------------*/
var imgDescartador, imgGradilla, imgTacho, imgTubo, imgJeringa2, imgJeringa3;
var imgGoma2, imgBrazo, imgBrazo2, imgSultan, imgPeladora, imgManos;
var imgJeringa,imgGuantes, imgGoma, imgCajaGuantes, imgJeringaSangre, imgCanuto, imgJeringaSinCanuto, imgManoIzq;
var imgHisopo, imgVidrio, imgFrasco, imgDescartador, imgTacho, imgGradilla, imgTubo, imgTuboSangre, imgCurita;
var imgDescartador, imgHand2, imgCent;
var img01n2, img02n2;
var imgT1, imgT2, imgT3, imgT4;
var imgTuboTapa, imgCentCerrada, imgPip, imgPS, imgts;
var imgRef, imgNev1, imgNev2, imgEpp, imgBolsa1, imgBolsa2, imgHela1, imgHela2, imgEpp;

var imagenes = ['img/etapa1/brazo.png','img/etapa1/cajaGuantes.png',
'img/etapa1/goma.png', 'img/etapa1/sultan2.png','img/etapa1/fondo.png','img/etapa1/hand2.png',
'img/etapa1/hand.png','img/etapa1/jeringa.png','img/etapa1/jeringaSangre.png','img/etapa1/canuto.png',
'img/etapa1/jeringaSinCanuto.png','img/etapa1/manoIzq.png','img/etapa1/jeringa2.png',
'img/etapa1/descartador.png','img/etapa1/gradilla.png','img/etapa1/tubo.png',
'img/etapa1/tacho.png', 'img/etapa1/tuboSangre.png', 'img/etapa1/curita.png',
'img/etapa1/hisopo.png', 'img/etapa1/frasco.png', 'img/etapa1/vidrio.png',  'img/etapa1/centrifuga.png',
'img/etapa1/txt/01n2.png', 'img/etapa1/txt/02n2.png', 'img/etapa1/t1.png', 'img/etapa1/t2.png',
'img/etapa1/t3.png', 'img/etapa1/t4.png', 'img/etapa1/t5.png', 'img/etapa1/t6.png', 'img/etapa1/pip.png', 'img/etapa1/pipSuero.png',
'img/etapa1/tuboTapa.png', 'img/etapa1/centrifugaCerrada.png', 'img/etapa1/ts.png',
'img/etapa1/hela1.png','img/etapa1/hela2.png', 'img/etapa1/ref.png', 'img/etapa1/epp.png', 'img/etapa1/nev1.png', 'img/etapa1/nev2.png',
'img/etapa1/bolsa1.png', 'img/etapa1/bolsa2.png',
];

//Funciones de carga de imagenes
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

        imgTuboTapa = new Image();
        imgTuboTapa.src = 'img/etapa1/tuboTapa.png';
        imgCentCerrada = new Image();
        imgCentCerrada.src = 'img/etapa1/centrifugaCerrada.png';

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
        //nivel 2
        img01n2 = new Image();
        img01n2.src = 'img/etapa1/txt/01n2.png';
        img02n2 = new Image();
        img02n2.src = 'img/etapa1/txt/02n2.png';

        imgT1 = new Image();
        imgT1.src = 'img/etapa1/t1.png';
        imgT2 = new Image();
        imgT2.src = 'img/etapa1/t2.png';
        imgT3 = new Image();
        imgT3.src = 'img/etapa1/t3.png';
        imgT4 = new Image();
        imgT4.src = 'img/etapa1/t4.png';
        imgT5 = new Image();
        imgT5.src = 'img/etapa1/t5.png';
        imgT6 = new Image();
        imgT6.src = 'img/etapa1/t6.png';

        imgPip = new Image();
        imgPip.src = 'img/etapa1/pip.png';
        imgPS = new Image();
        imgPS.src = 'img/etapa1/pipSuero.png';
        imgts = new Image();
        imgts.src = 'img/etapa1/ts.png';


        imgRef = new Image();
        imgRef.src = 'img/etapa1/ref.png';
        imgNev1 = new Image();
        imgNev1.src = 'img/etapa1/nev1.png';
        imgNev2 = new Image();
        imgNev2.src = 'img/etapa1/nev2.png';
        imgEpp = new Image();
        imgEpp.src = 'img/etapa1/epp.png';
        imgBolsa1 = new Image();
        imgBolsa1.src = 'img/etapa1/bolsa1.png';
        imgBolsa2 = new Image();
        imgBolsa2.src = 'img/etapa1/bolsa2.png';
        imgHela1 = new Image();
        imgHela1.src = 'img/etapa1/hela1.png';
        imgHela2 = new Image();
        imgHela2.src = 'img/etapa1/hela2.png';

    }
}