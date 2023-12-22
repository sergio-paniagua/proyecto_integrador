//(') ''

//boton que me cambia el color de un bloque
/*const bloque = document.querySelector('.bloque');
const boton = document.querySelector('.but')

//Fucniones que establecen el color DEL BLOQUE!

function color1(){
    bloque.style.backgroundColor = "red";
};

function color2(){
    bloque.style.backgroundColor = "yellow";
}

//LLAMO AL EVENTO EN EL BOTTON Y QUE RESPONDA EN EL BLOQUE

boton.addEventListener('mousedown', color1);
boton.addEventListener('mousemove', color2)

boton.onclick = function(event) {
    // muestra el tipo de evento, el elemento y las coordenadas del click
    alert(event.type + " en el " + event.currentTarget);
    alert("Coordenadas: " + event.clientX + ":" + event.clientY);
  };*/

  
/* Pracica compleja
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
      console.log(method);
    }

    onMousedown() {
      boton.innerHTML = "Botón del mouse presionado";
    }

    onMouseup() {
      boton.innerHTML += "...y soltado.";
    }
  }

  let menu = new Menu();
  boton.addEventListener('mousedown', menu);
  boton.addEventListener('mouseup', menu);

*/
const boton = document.querySelector('.but');
const par = document.getElementById('parrafo');


//Forma de llamar al evento
/* 
boton.onclick = function() {
   par.innerHTML = "soy otro texto";
  }*/

  //otra forma de llamar al evento
  /*function texto() {
    par.innerHTML = "soy otro texto";
   }*/
 
  // boton.addEventListener('click', texto);

   function desaparecerTexto(){
    boton.hidden = true;
   };

   function apareceTexto(){
    par.hidden = false;
   };


   boton.addEventListener('mousedown', desaparecerTexto);
   boton.addEventListener('mouseup', apareceTexto);

   let menuElem = document.getElementById('sweet');
   let titleElem = menuElem.querySelector('.title');

   titleElem.onclick = function() {
     menuElem.classList.toggle('open');
   };

   //document.write("HOLA MUNDO");

   function sumaNumeros (){
    let num1 = 5;
    let num2 = 10;
    document.write(num1 + num2);
   }
//mostrar directamnete un mensaje en consola
   console.log("HOLA SOY UN MENSAJE QUE SOLO SE VE EN LA CONSOLA")
   
  // 4-crea dos radiouttons, cuando uno de ellos se selecciones que muestre un mensaje diciendo q opcion se selecciono.
  
   function muestraOpcion (){
    var opciones = document.getElementsByName('eleccion');
    //devuleve un arrays
    
    for (let i=0; i<opciones.length; i++){
        console.log(opciones[i]);
        if (opciones[i].checked){
            alert(opciones[i].value);
        }
    }
    
   }
  
   //5-rear un input y un button, cuando le damos al boton, se añadira el texto que hemos puesto en un div vacio
   //Recuerda se nañadira el texto, no se machaca lo que haya en el div. 

   function aniadirTexto(){
    var texto = document.getElementById('texto'); //quiero utilizar lo que haya en el value del texto
    var mostrar = document.getElementById ('mostrarTexto');

    mostrar.innerHTML += texto.value;
   }

//6- Crea dos input de numeros y un boton, al pulsar el boton,
//mostrar un alert que diga quien es el mayor
function mayorNum(){

    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);

    if(num1 && num2){ //hacemos una comprobacion para que siempre se aplique la funcion cuando hayan numeros en el input
        if (num1>=num2){
            if (num1 == num2){
                alert("los numeros son iguales");
            }else {
                alert("El " + num1 + " es mayor");
            }
        }else {
            alert(num2 + " es mayor");
        }
    
}else{
    alert ("Unos de los campos no se relleno")
}
}

//6- Crear un boton que al pulsarlo genere una lista de 10 numeros aleatorios,
//en un selec vacio. Al pulsarlo de nuevo, se resetee la lista.
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}
function generarNumeros(){
    let elementos = document.getElementById('elementos')
    elementos.innerHTML = ""; //lo dejo vacio, xq es lo que hay inicialmente, entonces cuando reseteo queda sin nada.
   //esto no hace falta se puede borrar
    let opcionesGeneradas = "";
    for (let i=0; i<10; i++){
        opcionesGeneradas += "<option>" +getRandomInt(1, 100) + "</option>";
    }

    elementos.innerHTML = opcionesGeneradas;
}

//7- Dado un input y un boton, escribir nombres de personas (no controlamos nada de momento)
//y lo mostramos en una lista desordenada.

function insertarNombre(evt){ //Con este evitamos que la pagina se recargue, le decimo "no hagas eso"
evt.preventDefault();
 let nombre = document.getElementById('nombre').value; //es decir adquirimos el valor de lo q se escribe

 if (nombre == ""){
    alert("Debes insertar un nombre");

 }else{
    let opcion = "<li>" + nombre+ "</li>"

    let lista = document.getElementById('lista-nombre');
   
    lista.innerHTML += opcion;
   
    alert("Se ha insertado el nombre")
 }

}

//PRACTICA CON FORMULARIO
    // Mostrar un DIV semi-transparente para cubrir la página.
    // (el formulario no está dentro sino junto a él, porque no debe tener transparencia.)
    function showCover() {
        let coverDiv = document.createElement('div'); //CREO UN DIV
        coverDiv.id = 'cover-div'; //LE ASIGNO UN ID QUE SE LLAMA cover-div

        // evitar el scroll en la página cuando el modal esta abierto
      document.body.style.overflowY = 'hidden';

      document.body.append(coverDiv); //se inserta en el body el div creado (antes solo se definio el div)

    }

    function hideCover() {
        document.getElementById('cover-div').remove();
        document.body.style.overflowY = '';
      }


      function showPrompt(text, callback) {
        showCover();
        let form = document.getElementById('prompt-form');
        let container = document.getElementById('prompt-form-container');
        document.getElementById('prompt-message').innerHTML = text;
        form.text.value = '';
     

      function complete(value) {
        hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
        callback(value);
      }

      //EVENTOS

      form.onsubmit = function() {
        let value = form.text.value;
        if (value == '') return false; // ignorar submit vacíos

        complete(value);
        return false;
      };

      //SI NO COMPLETA O PULSA ESCAPE
      form.cancel.onclick = function() {
        complete(null);
      };

      document.onkeydown = function(e) {
        if (e.key == 'Escape') {
          complete(null);
        }
      };

      let lastElem = form.elements[form.elements.length - 1];
      let firstElem = form.elements[0];

      lastElem.onkeydown = function(e) {
        if (e.key == 'Tab' && !e.shiftKey) {
          firstElem.focus();
          return false;
        }
      };

      firstElem.onkeydown = function(e) {
        if (e.key == 'Tab' && e.shiftKey) {
          lastElem.focus();
          return false;
        }
      };

      container.style.display = 'block';
      form.elements.text.focus();

    }

    document.getElementById('show-button').onclick = function() {
        showPrompt("Escribe algo<br>...inteligente :)", function(value) {
          alert("Escribiste: " + value);
        });
      };

    
      function accederCalculadora(){
        Formulario.innerHTML = "";
          let html = "Formulario a agregaar";
           Formulario.innerHTML = html;
  }





    




