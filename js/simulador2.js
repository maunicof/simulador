/*Mostrar Nombre del objeto al pasar el mouse
===============================*/
var contM = [];

var time = 100;
var mostrarNom = false;
var seleccion = [];

function mostrarNombre(){
        if (hit(coordenadasMouse, objetos[0])){
        if (contM[1] < time){
             dibujarTexto('Peladora', objetos[0].x - 20, objetos[0].y +100, 'white', fuente, 4, 4, 5);
         }
         contM[1]++;
    }else{
        contM[1] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetos[1])){
        if (contM[2] < time){
             dibujarTexto('Cinta', objetos[1].x , objetos[1].y +60, 'white', fuente, 4, 4, 5);
         }
         contM[2]++;
    }else{
        contM[2] = 0;
    }
//--------------------------------------------------

    if (hit(coordenadasMouse, objetos[2])){
        if (contM[3] < time){
             dibujarTexto( 'Caja de Guantes', objetos[2].x , objetos[2].y +110, 'white', fuente, 4, 4, 5);
         }
         contM[3]++;
    }else{
        contM[3] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoJeringa)){
        if (contM[4] < time){
             dibujarTexto('Jeringa', objetoJeringa.x - 20, objetoJeringa.y +100, 'white', fuente, 4, 4, 5);
         }
         contM[4]++;
    }else{
        contM[4] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoGradilla)){
        if (contM[5] < time){
             dibujarTexto('Gradilla', objetoGradilla.x - 80, objetoGradilla.y +100, 'white', fuente, 4, 4, 5);
         }
         contM[5]++;
    }else{
        contM[5] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoTacho)){
        if (contM[6] < time){
             dibujarTexto('Residuos', objetoTacho.x - 20, objetoTacho.y +100, 'white', fuente, 4, 4, 5);
         }
         contM[6]++;
    }else{
        contM[6] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoDescartador)){
        if (contM[7] < time){
             dibujarTexto('Descartador', objetoDescartador.x - 20, objetoDescartador.y +120, 'white', fuente, 4, 4, 5);
         }
         contM[7]++;
    }else{
        contM[7] = 0;
    }
//--------------------------------------------------

    if (hit(coordenadasMouse, objetoTubo)){
        if (contM[8] < time){
             dibujarTexto('Limpio y Seco', objetoTubo.x -50 , objetoTubo.y, 'white', fuente, 4, 4, 5);
         }
         contM[8]++;
    }else{
        contM[8] = 0;
    }

//--------------------------------------------------
    if (hit(coordenadasMouse, objetoVidrio)){
        if (contM[9] < time){
             dibujarTexto( 'Vidrio', objetoVidrio.x -55 , objetoVidrio.y + 35, 'white', fuente, 4, 4, 5);
         }
         contM[9]++;
    }else{
        contM[9] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoHisopo)){
        if (contM[10] < time){
             dibujarTexto( 'Hisopo', objetoHisopo.x - 50, objetoHisopo.y - 10, 'white', fuente, 4, 4, 5);
         }
         contM[10]++;
    }else{
        contM[10] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoTubo2)){
        if (contM[11] < time){
             dibujarTexto('Citrato', objetoTubo2.x - 20, objetoTubo2.y , 'white', fuente, 4, 4, 5);
         }
         contM[11]++;
    }else{
        contM[11] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoTubo3)){
        if (contM[12] < time){
             dibujarTexto('EDTA', objetoTubo3.x -10, objetoTubo3.y, 'white', fuente, 4, 4, 5);
         }
         contM[12]++;
    }else{
        contM[12] = 0;
    }
    console.log(coordenadasMouse);
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoTubo4)){
        if (contM[13] < time){
             dibujarTexto('Recientemente enjuagado', objetoTubo4.x - 0, objetoTubo4.y, 'white', fuente, 4, 4, 5);
         }
         contM[13]++;
    }else{
        contM[13] = 0;
    }
//--------------------------------------------------
    if (hit(coordenadasMouse, objetoFrasco)){
        if (contM[14] < time){
             dibujarTexto('Frasco', objetoFrasco.x - 50, objetoFrasco.y + 25, 'white', fuente, 4, 4, 5);
         }
         contM[14]++;
    }else{
        contM[14] = 0;
    }
//--------------------------------------------------
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
    if(niveles[2] === 1){
        
        dibujarFondoTexto(50, 50, 900, 550, '#9254C4', 1 );
        dibujarFondoTexto(50, 50, 900, 100, '#640AAA', 1 );

        dibujarTexto(textoNivel3[4].txt,80, 90, 'white', fuente, 0, 0, 0);
        dibujarTexto(textoNivel3[5].txt,80, 110, 'white', fuente, 0, 0, 0);

        dibujarTexto(textoNivel3[1].txt,80, 180, 'black', subtitulo, 0, 0, 0);
        dibujarTexto(textoNivel3[1].a,150, 220, 'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].b,150, 260, 'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].c,150, 300, 'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].d,150, 340, 'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[1].e,150, 380, 'black', tuboinc, 0, 0, 0);

        dibujarTexto(textoNivel3[2].txt,380, 180, 'black', subtitulo, 0, 0, 0);
        dibujarTexto(textoNivel3[2].a,380, 220,   'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[2].b,380, 260,   'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[2].c,380, 300,   'black', tuboinc, 0, 0, 0);

        dibujarTexto(textoNivel3[3].txt,760, 180, 'black', subtitulo, 0, 0, 0);
        dibujarTexto(textoNivel3[3].a,760, 220,   'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[3].b,760, 260,   'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[3].c,760, 300,   'black', tuboinc, 0, 0, 0);
        dibujarTexto(textoNivel3[3].d,760, 340,   'black', tuboinc, 0, 0, 0);
        
        if ((textoNivel3[6].c1) && (textoNivel3[6].c2) && (textoNivel3[6].c3)){
            dibujarTexto('Continuar',760, 550, 'white', tuboinc, 4, 4, 5);

            if(mascaraClick(760, 530, 90, 30, 0.0)){
                niveles[2] = 2; // termino el nivel 2, no se muestra el texto
            }
        }
        
        verificarInclinacion();
        verificarTemperatura();
        verificarTiempo();
        ctx.drawImage(imgTuboSangre, objetoTuboSangre.x, objetoTuboSangre.y - 130, objetoTuboSangre.width + 15, objetoTuboSangre.height + 70);


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

            dibujarFondoTexto(100,80,800, 270,violeta1, 1 );
            dibujarTexto('Después de haber determinado el  diagnóstico  presuntivo del caso, se procede a la', 120, 130, colorTexto , fuente,0,0,0);
            dibujarTexto('toma  del material biológico. Debes siempre tener en cuenta las  Normas de ', 120, 160, colorTexto, fuente,0,0,0);
            dibujarTexto('toma  del material biológico. bioseguridad y limpieza para  llevar a cabo La práctica.  ', 120, 190, colorTexto, fuente,0,0,0);
            dibujarTexto('Para poder realizar esta tarea, tienes que  trabajar  de la siguiente manera: ', 120, 220, colorTexto, fuente,0,0,0);
            dibujarTexto('debes elegir y/o arrastrar los elementos que correspondan  para poder cumplir con ', 120, 250, colorTexto, fuente,0,0,0);
            dibujarTexto('el objetivo buscado, que es llegar al diagnóstico definitivo. ', 120, 280, colorTexto, fuente,0,0,0);
            dibujarTexto('Comenzar', 700, 320, colorTexto, fuente,3,3,4);
            
            if (mascaraClick(700,300, 100,30, 0.0)){
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


// Nivel 1
// ==================================================

function nivel1(){ //multiple choise Diagnostico
        
    if (niveles[0] === 0){
        
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
                    continuarNivel2 = 0;
                    objetos[2].est = 1; // caja activa
                    niveles[0] = 1;
                    
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
