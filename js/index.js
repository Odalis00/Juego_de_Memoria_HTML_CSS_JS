//contador tarjetas
let tarjetasgiradas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let resultado1 = null;
let resultado2 = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tRegresivoId = null;
//apuntando a documento html

let mostrarMovimientos = document.getElementById("Movimientos");
let mostrarAciertos = document.getElementById("Aciertos");
let mostrarTiempo = document.getElementById("Tiempo-restante");

//generador numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});

//funciones

function contarTiempo() {
  tRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tRegresivoId);
      bloquearTarjetas();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numbers[i];
    tarjetaBloqueada.disabled = true;
  }
}
//Funcion principal

function girar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }
  tarjetasgiradas++;
  if (tarjetasgiradas === 1) {
    //muestra primer numero
    tarjeta1 = document.getElementById(id);

    tarjeta1.innerHTML = numbers[id];
    resultado1 = numbers[id];
    //deshabilitar boton 1
    tarjeta1.disabled = true;
  } else if (tarjetasgiradas === 2) {
    //muestra segundo numero
    tarjeta2 = document.getElementById(id);

    tarjeta2.innerHTML = numbers[id];
    resultado2 = numbers[id];
    //deshabilitar boton 2
    tarjeta2.disabled = true;
    //incrementar movimiento
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    if (resultado1 === resultado2) {
      tarjetasgiradas = 0;
      //incrementar acierto
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      if (aciertos == 8) {
        clearInterval(tRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🎉😎`;
        mostrarTiempo.innerHTML = `Felicidades 🎉Solo te demoraste ${
          timerInicial - timer
        }  segundos 👏 `;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 👏 `;
      }
    } else {
      //mostrar valores y volver a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasgiradas = 0;
      }, 800);
    }
  }
}
