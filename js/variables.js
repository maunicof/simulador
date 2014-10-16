var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// ======================================================

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
var objetoTubo2 =          { id: 'tubo',est: 0, x: 495, y: 560, width: 15, height: 80 };
var objetoTubo3 =          { id: 'tubo',est: 0, x: 520, y: 560, width: 15, height: 80 };
var objetoTubo4 =          { id: 'tubo',est: 0, x: 545, y: 560, width: 15, height: 80 };

var objetoTuboSangre =    { id: 'tubo',est: 0, x: 465, y: 560, width: 15, height: 80 };
var objetoJeringa3 =      { id: 'jeringa' , est: 0, x: 300, y: 480, width: 40,  height: 90 };
var objetoCurita =      { id: 'curita' , est: 0, x: 678, y: 325, width: 23,  height: 10 };

var objetoVidrio =      { id: 'vidrio' , est: 0, x: 880, y: 535, width: 40,  height: 40 };
var objetoHisopo =      { id: 'hisopo' , est: 0, x: 658, y: 550, width: 10,  height: 80 };
var objetoFrasco =      { id: 'frasco' , est: 0, x: 858, y: 595, width: 40,  height: 40 };

var objetoCent =      { id: 'frasco' , est: 0, x: 278, y: 65, width: 200,  height: 400 };



// para extraccion
var posCanuto ={ x:0, y:0};
var posManoI ={ x:0, y:0};
var alfa1 = ctx.globalAlpha = 0.0;
var alfa2 = ctx.globalAlpha = 1;
var cont = 0; // para fade jeringa
var borrarSinCanuto = false;

var arrastrar;
var pinchado = false;
var objetoActual = null;
var mouseOld = {};
var mouseNew = {};


/* Nivel 3
--------------------------------*/
var imgDescartador, imgGradilla, imgTacho, imgTubo, imgJeringa2, imgJeringa3;
var imgGoma2, imgBrazo, imgBrazo2, imgSultan, imgPeladora, imgManos;
var imgJeringa,imgGuantes, imgGoma, imgCajaGuantes, imgJeringaSangre, imgCanuto, imgJeringaSinCanuto, imgManoIzq;
var imgHisopo, imgVidrio, imgFrasco, imgDescartador, imgTacho, imgGradilla, imgTubo, imgTuboSangre, imgCurita;
var imgDescartador, imgHand2, imgCent;

var imagenes = ['img/etapa1/brazo.png','img/etapa1/cajaGuantes.png',
'img/etapa1/goma.png', 'img/etapa1/sultan2.png','img/etapa1/fondo.png','img/etapa1/hand2.png',
'img/etapa1/hand.png','img/etapa1/jeringa.png','img/etapa1/jeringaSangre.png','img/etapa1/canuto.png',
'img/etapa1/jeringaSinCanuto.png','img/etapa1/manoIzq.png','img/etapa1/jeringa2.png',
'img/etapa1/descartador.png','img/etapa1/gradilla.png','img/etapa1/tubo.png',
'img/etapa1/tacho.png', 'img/etapa1/tuboSangre.png', 'img/etapa1/curita.png',
'img/etapa1/hisopo.png', 'img/etapa1/frasco.png', 'img/etapa1/vidrio.png',  'img/etapa1/centrifuga.png'
];

