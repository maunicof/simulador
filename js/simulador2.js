/*Mostrar Nombre del objeto al pasar el mouse
===============================*/
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


function centrifuga(){
    ctx.drawImage(imgCent, objetoCent.x , objetoCent.y, objetoCent.width, objetoCent.height);
    tubitos();
    //ctx.drawImage(imgCruz, objCruz.x , objCruz.y, objCruz.width, objCruz.height);
    tateti();
    verificarCentrifuga();

    function tateti(){
        for (var i = 0; i < agujeros.length; i++) {
            cuadrado(agujeros[i]);
            for (var j = 2; j < objetos.length; j++) {
                if (agujeros[i].est != -99){
                    if (hit2(agujeros[i], objetos[j])){
                        agujeros[i].est = -99; // el objeto hizo contacto y debe quedar fijo
                        objetos[j].est = -99; // y el cuadrado debe desaparece
                        objetos[j].agu = agujeros[i].id;

                        tubosPrimarios(i,j);
                        tubosSecundarios(i,j);
                        //console.log(diag2);
                    }
                }
            }
        }
    }
    
    function tubosPrimarios(i,j){
        // tubos 0 y 1 que son los principales. Tienen que estar si o si
        if ((objetos[j].id === 0) && (agujeros[i].id === 0)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'a';
        }
        if ((objetos[j].id === 0) && (agujeros[i].id === 2)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'b';
        }
        if ((objetos[j].id === 1) && (agujeros[i].id === 2)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'c';
        }
        if ((objetos[j].id === 1) && (agujeros[i].id === 0)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'd';
        }
        if ((objetos[j].id === 0) && (agujeros[i].id === 1)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'e';
        }
        if ((objetos[j].id === 0) && (agujeros[i].id === 3)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'f';
        }
        if ((objetos[j].id === 1) && (agujeros[i].id === 3)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'g';
        }
        if ((objetos[j].id === 1) && (agujeros[i].id === 1)) {
            pri[i].a = agujeros[i].id;
            pri[i].t = objetos[j].id;
            diag1[i] = 'h';
        }
    }
    function tubosSecundarios(i,j){
        // Tubos secundarios 2 y 3 pueden no estar en la centrifuga
        //=============================================================
        if ((objetos[j].id === 2) && (agujeros[i].id === 0)) {
            sec[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'a';
        }
        if ((objetos[j].id === 2) && (agujeros[i].id === 2)) {
            sec[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'b';
        }
        if ((objetos[j].id === 3) && (agujeros[i].id === 2)) {
            sec[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'c';
        }
        if ((objetos[j].id === 3) && (agujeros[i].id === 0)) {
            sec[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'd';
        }
        if ((objetos[j].id === 2) && (agujeros[i].id === 1)) {
            sec[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'e';
        }
        if ((objetos[j].id === 2) && (agujeros[i].id === 3)) {
            sec[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'f';
        }
        if ((objetos[j].id === 3) && (agujeros[i].id === 3)) {
            pri[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'g';
        }
        if ((objetos[j].id === 3) && (agujeros[i].id === 1)) {
            sec[i].a = agujeros[i].id;
            sec[i].t = objetos[j].id;
            diag2[i] = 'h';
        }
    }
    function tubitos(){
        ctx.drawImage(imgT1, objetos[2].x , objetos[2].y, objetos[2].width, objetos[2].height);
        
        ctx.drawImage(imgT2, objetos[3].x, objetos[3].y, objetos[3].width, objetos[3].height);
        ctx.drawImage(imgT3, objetos[4].x, objetos[4].y, objetos[4].width, objetos[4].height);
        ctx.drawImage(imgT4, objetos[5].x , objetos[5].y, objetos[5].width, objetos[5].height);
        ctx.drawImage(imgT3, objetos[6].x, objetos[6].y, objetos[6].width, objetos[6].height);
        ctx.drawImage(imgT4, objetos[7].x , objetos[7].y, objetos[7].width, objetos[7].height);
        
    }
    function verificarCentrifuga(){ // tubos 0 y 1 son correctos y deben estar enfrentados 
        
        if (((diag1[0] === 'a') && (diag1[2] === 'c')) || ((diag1[0] === 'd') && (diag1[2] === 'b'))) {
            
            
            if(((typeof diag2[1] === "undefined") && (typeof diag2[3] === "undefined"))){
                verificacionP = true;
                verificacionS = true;
            }else{
                if (((diag2[1] === 'e') && (diag2[3] === 'g')) || ((diag2[3] === 'f') && (diag2[1] === 'h')) )  {
                    verificacionS = true;
                    verificacionP = true;
                }else{
                    verificacionS = false;
                    //verificacionP = false;
                    }
                }
        }else{
        
                if (((diag1[1] === 'e') && (diag1[3] === 'g')) || ((diag1[3] === 'f') && (diag1[1] === 'h'))) {
                    
                    if(((typeof diag2[0] === "undefined") && (typeof diag2[2] === "undefined"))){
                        verificacionP = true;
                        verificacionS = true;
                    }else{
                        if (((diag2[0] === 'a') && (diag2[2] === 'c')) || ((diag2[0] === 'd') && (diag2[2] === 'b')) )  {
                            verificacionS = true;
                            verificacionP = true;
                        }else{
                            verificacionS = false;
                            //verificacionP = false;
                            }
                        }
                }
            }
        //=================================
        if ((verificacionP) && (verificacionS)) {
            verificacionSemiFinal = true;
        }
        if ((verificacionP) && (verificacionS === false)) {
            verificacionSemiFinal = false;
        }
        
        console.log(verificacionSemiFinal);
        // console.log(verificacionS);
    }
}
/* Funciones para detectar contacto y Clisks
=============================*/

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
function hit2(a , b){
    var hits = false;
    if(b.x +7 + b.width -15>= a.x && b.x + 7 < a.x + a.width){
        if(b.y + 6 + b.height -80 >= a.y && b.y + 6 < a.y + a.height){
            hits = true;
        }
    }
    if(b.x+7 <= a.x && b.x +7+ b.width -15>= a.x + a.width){
        if(b.y + 6 <= a.y && b.y + 6 + b.height -80 >= a.y +a.height){
            hits = true;
        }
    }
    if(a.x <= b.x +7&& a.x + a.width >= b.x+7 +b.width-15){
        if(a.y <= b.y + 6 && a.y + a.height >= b.y + 6 + b.height -80){
            hits = true;
        }
    }
    return hits;
}
function cuadrado(objeto){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(objeto.x, objeto.y, objeto.width, objeto.height);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
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
function mascaraClickObjeto( objeto, a ){
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(objeto.x, objeto.y, objeto.width, objeto.height);
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
/* Funciones para dibujar y verificar textos
===============================*/
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
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = sombrax;
    ctx.shadowOffsetY = sombray;
    ctx.shadowBlur = blur;
    ctx.fillStyle = color;
    ctx.font = fuente;
    ctx.fillText(texto,x ,y);
    ctx.restore();
}
/* muestro los nombres de los objetos
====================================*/
function mostrarNombre(){
    if (mascaraClickObjeto(objetos[0], 0) ){
        if (contM[1] < time){
             dibujarTexto('Peladora', objetos[0].x - 20, objetos[0].y +100, 'white', fuente, 4, 4, 5);
         }
         contM[1]++;
    }else{
        contM[1] = 0;
    }
//--------------------------------------------------
    if ( mascaraClickObjeto(objetos[1], 0) ){
        if (contM[2] < time){
             dibujarTexto('Cinta', objetos[1].x , objetos[1].y +60, 'white', fuente, 4, 4, 5);
         }
         contM[2]++;
    }else{
        contM[2] = 0;
    }
//--------------------------------------------------

    if ( mascaraClickObjeto(objetoCaja,0)) {
        if (contM[3] < time){
             dibujarTexto( 'Caja de Guantes', objetoCaja.x , objetoCaja.y +110, 'white', fuente, 4, 4, 5);
         }
         contM[3]++;
    }else{
        contM[3] = 0;
    }
//--------------------------------------------------
    if (mascaraClickObjeto(objetoJeringa, 0)){
        if (contM[4] < time){
             dibujarTexto('Jeringa', objetoJeringa.x - 20, objetoJeringa.y +100, 'white', fuente, 4, 4, 5);
         }
         contM[4]++;
    }else{
        contM[4] = 0;
    }
//--------------------------------------------------
    if (mascaraClickObjeto(objetoGradilla, 0)){
        if (contM[5] < time){
             dibujarTexto('Gradilla', objetoGradilla.x - 80, objetoGradilla.y +100, 'white', fuente, 4, 4, 5);
         }
         contM[5]++;
    }else{
        contM[5] = 0;
    }
//--------------------------------------------------
    if (mascaraClickObjeto(objetoTacho, 0)){
        if (contM[6] < time){
             dibujarTexto('Residuos', objetoTacho.x - 20, objetoTacho.y +100, 'white', fuente, 4, 4, 5);
         }
         contM[6]++;
    }else{
        contM[6] = 0;
    }
//--------------------------------------------------
    if (mascaraClickObjeto(objetoDescartador, 0)){
        if (contM[7] < time){
             dibujarTexto('Descartador', objetoDescartador.x - 20, objetoDescartador.y +120, 'white', fuente, 4, 4, 5);
         }
         contM[7]++;
    }else{
        contM[7] = 0;
    }
//--------------------------------------------------

    if (hit(objetoTubo, coordenadasMouse )){
        if (contM[8] < time){
             dibujarTexto('Limpio y Seco', objetoTubo.x -50 , objetoTubo.y, 'white', fuente, 4, 4, 5);
         }
         contM[8]++;
    }else{
        contM[8] = 0;
    }

//--------------------------------------------------
    if (mascaraClickObjeto(objetoVidrio, 0)){
        if (contM[9] < time){
             dibujarTexto( 'Vidrio', objetoVidrio.x -55 , objetoVidrio.y + 35, 'white', fuente, 4, 4, 5);
         }
         contM[9]++;
    }else{
        contM[9] = 0;
    }
//--------------------------------------------------
    if (mascaraClickObjeto( objetoHisopo, 0)){
        if (contM[10] < time){
             dibujarTexto( 'Hisopo', objetoHisopo.x - 50, objetoHisopo.y - 10, 'white', fuente, 4, 4, 5);
         }
         contM[10]++;
    }else{
        contM[10] = 0;
    }
//--------------------------------------------------
    if (hit( objetoTubo2, coordenadasMouse)){
        if (contM[11] < time){
             dibujarTexto('Citrato', objetoTubo2.x - 20, objetoTubo2.y , 'white', fuente, 4, 4, 5);
         }
         contM[11]++;
    }else{
        contM[11] = 0;
    }
//--------------------------------------------------
    if (hit( objetoTubo3, coordenadasMouse)){
        if (contM[12] < time){
             dibujarTexto('EDTA', objetoTubo3.x -10, objetoTubo3.y, 'white', fuente, 4, 4, 5);
         }
         contM[12]++;
    }else{
        contM[12] = 0;
    }
    
//--------------------------------------------------
    if (hit( objetoTubo4, coordenadasMouse)){
        if (contM[13] < time){
             dibujarTexto('Recientemente enjuagado', objetoTubo4.x - 0, objetoTubo4.y, 'white', fuente, 4, 4, 5);
         }
         contM[13]++;
    }else{
        contM[13] = 0;
    }
//--------------------------------------------------
    if (mascaraClickObjeto( objetoFrasco, 0)){
        if (contM[14] < time){
             dibujarTexto('Frasco', objetoFrasco.x - 50, objetoFrasco.y + 25, 'white', fuente, 4, 4, 5);
         }
         contM[14]++;
    }else{
        contM[14] = 0;
    }
//--------------------------------------------------
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

/* dibujar nivel y texto  de procesamiento de la sangre
===================================================*/

function dibujarProcesarMuestra(){
    dibujarFondoTexto(50, 50, 900, 550, '#9254C4', 1 );
    dibujarFondoTexto(50, 50, 900, 100, '#640AAA', 1 );
    
    // dibujarTexto(textoNivel3[4].txt,80, 90, 'white', fuente, 0, 0, 0);
    // dibujarTexto(textoNivel3[5].txt,80, 110, 'white', fuente, 0, 0, 0);
    // dibujarTexto(textoNivel3[1].txt,80, 180, 'black', subtitulo, 0, 0, 0);
    // dibujarTexto(textoNivel3[1].a,150, 220, 'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[1].b,150, 260, 'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[1].c,150, 300, 'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[1].d,150, 340, 'black', tuboinc, 0, 0, 0);
    
    // dibujarTexto(textoNivel3[1].e,150, 380, 'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[2].txt,380, 180, 'black', subtitulo, 0, 0, 0);
    // dibujarTexto(textoNivel3[2].a,380, 220,   'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[2].b,380, 260,   'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[2].c,380, 300,   'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[3].txt,760, 180, 'black', subtitulo, 0, 0, 0);
    // dibujarTexto(textoNivel3[3].a,760, 220,   'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[3].b,760, 260,   'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[3].c,760, 300,   'black', tuboinc, 0, 0, 0);
    // dibujarTexto(textoNivel3[3].d,760, 340,   'black', tuboinc, 0, 0, 0);
        
    // if ((textoNivel3[6].c1) && (textoNivel3[6].c2) && (textoNivel3[6].c3)){
    //     dibujarTexto('Continuar',760, 550, 'white', tuboinc, 4, 4, 5);

    //     if(mascaraClick(760, 530, 90, 30, 0.0)){
    //         niveles[2] = 2; // termino el nivel 2, no se muestra el texto
    //     }
    // }
    ctx.drawImage(img01n2, texto01n2.x , texto01n2.y, texto01n2.width, texto01n2.height);
    ctx.drawImage(img02n2, texto02n2.x , texto02n2.y, texto02n2.width, texto02n2.height);
    
    verificarInclinacion();
    verificarTemperatura();
    verificarTiempo();
    ctx.drawImage(imgTuboSangre, objetoTuboSangre.x, objetoTuboSangre.y - 100, objetoTuboSangre.width , objetoTuboSangre.height);

    if ( (textoNivel3[6].c3 === true) && (textoNivel3[6].c2 === true) && (textoNivel3[6].c1 === true) ){
        dibujarTexto('Continuar',750, 550, 'white', fuente, 3, 3, 4);
        if (mascaraClick(750, 530, 100, 30, 0.0)){
            niveles[2] = 999;
            niveles[3] = 1;
        }
    }
        

    function verificarTiempo(){
        if (mascaraClick(760, 200, 100, 30, 0.0)){
            incorrecto(730, 220);
            textoNivel3[6].c3 = false;
        }
        if (mascaraClick(760, 240, 100, 30, 0.0) && (tiempo === false)){
            tiempo = true;
            textoNivel3[6].c3 = false;
        }
        if (tiempo){
            correcto(740, 253);
            textoNivel3[6].c3 = true;            }

        if (mascaraClick(760, 280, 100, 30, 0.0)){
            incorrecto(730, 300);
            textoNivel3[6].c3 = false;
        }
        if (mascaraClick(760, 320, 100, 30, 0.0)){
            incorrecto(730, 340);
            textoNivel3[6].c3 = false;
        }

    }
    function verificarTemperatura(){
        if (mascaraClick(380, 200, 250, 30, 0.0) && (inclinacion === false)){
            inclinacion = true;
            textoNivel3[6].c2 = true;
        }
        if (inclinacion){correcto(360, 214);}

        if (mascaraClick(380, 240, 250, 30, 0.0)){
            incorrecto(355, 260);
            textoNivel3[6].c2 = false;
        }
        if (mascaraClick(380, 280, 250, 30, 0.0)){
            incorrecto(355, 300);
            textoNivel3[6].c2 = false;
        }
        if (mascaraClick(380, 320, 250, 30, 0.0)){
            incorrecto(355, 340);
            textoNivel3[6].c2 = false;
        }
    }
    function verificarInclinacion(){
        if (mascaraClick(150, 200, 50, 30, 0.0)){
            incorrecto(125  , 220);
            textoNivel3[6].c1 = false;
        }
        if (mascaraClick(150, 240, 50, 30, 0.0)){
            incorrecto(125, 260);
            textoNivel3[6].c1 = false;
        }
        if (mascaraClick(150, 280, 50, 30, 0.0) && (verde === false)){
            verde = true;
            textoNivel3[6].c1 = true;
        }
        if (verde){correcto(130, 293);}

        if (mascaraClick(150, 320, 50, 30, 0.0)){
            incorrecto(125, 340);
            textoNivel3[6].c1 = false;
        }
        if (mascaraClick(150, 360, 50, 30, 0.0)){
            incorrecto(125, 380);
            textoNivel3[6].c1 = false;
        }
    }
}


/* Textos viejos
===============================================*/

function dibujarTextoComenzar(){
    if(juego.estado == 'apagado'){

        // dibujarFondoTexto(695,300,100, 30,violeta1, 1 );
        dibujarTexto('Comenzar', 700, 390, 'black', titulo,7,7,7);
        
        if (mascaraClick(700,360, 140,50, 0.0)){
            juego.estado = 'jugando';
        ok = true;
        }
    }
}

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

function dibujarTextoAlPinchar(){ // Al pinchar la pata muestra la cantidad de sangre a extraer
    if ((pinchado === 1) && (textoNivel1Sangre[0].mostrar === true)) {
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
            
            pinchado = 2;
            correcto(135, 240);
            dibujarTexto('Extraer',560, 355, 'white', fuente, 4, 4, 4);
        }
        // if (mascaraClick(550, 335,110,30,0.5)){
        //     pinchado = 2;
        //     console.log(pinchado);
        // }
        if (mascaraClick(150, 275,110,30,0)){
            // textoNivel1Sangre[0].mostrar = false;
            incorrecto(130, 300);
        }
        
    }
}


// Nivel 1
// ==================================================
var texto1y2 = 0;
function nivel1(){ //multiple choise Diagnostico
        
    if (niveles[0] === 0){
        if (texto1y2 === 0) {
            dibujarFondoTexto(100,80,800,350,violeta2, 1 );
            dibujarFondoTexto(100,80,800, 80,violeta1, 1 );
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
            mascarasN1();
        }
        if (texto1y2 === 1) {
            dibujarTextoComenzarExtraccion();
        }


        
    }
    /* clicks
        =====================================*/
    function mascarasN1(){
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
                
                texto1y2 = 1;
                
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
        if (mascaraClick(150,320,420,45,0.0)){//  epilepsia
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
    function dibujarTextoComenzarExtraccion(){
        dibujarFondoTexto(100,80,800, 270,violeta1, 1 );
        dibujarTexto('Después de haber determinado el  diagnóstico  presuntivo del caso, se procede a la', 120, 130, colorTexto , fuente,0,0,0);
        dibujarTexto('toma  del material biológico. Debes siempre tener en cuenta las  Normas de ', 120, 160, colorTexto, fuente,0,0,0);
        dibujarTexto('toma  del material biológico. bioseguridad y limpieza para  llevar a cabo La práctica.  ', 120, 190, colorTexto, fuente,0,0,0);
        dibujarTexto('Para poder realizar esta tarea, tienes que  trabajar  de la siguiente manera: ', 120, 220, colorTexto, fuente,0,0,0);
        dibujarTexto('debes elegir y/o arrastrar los elementos que correspondan  para poder cumplir con ', 120, 250, colorTexto, fuente,0,0,0);
        dibujarTexto('el objetivo buscado, que es llegar al diagnóstico definitivo. ', 120, 280, colorTexto, fuente,0,0,0);
        dibujarTexto('Comenzar', 700, 320, colorTexto, fuente,3,3,4);
        
        if (mascaraClick(700,300, 100,30, 0.0)){
            //juego.estado = 'jugando';
            ok = true;
            continuarNivel2 = 0;
            niveles[0] = 1;
        }
    }
}
