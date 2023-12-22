//ELEMENTOS DEL DOM
let datosUsuario = document.querySelector("#formulario");
let op1 = document.querySelector("#op1");
let op2 = document.querySelector("#op2");
let op3 = document.querySelector("#op3");
const listaPaquetes = document.getElementById("listaPaquetes");
let arrayPaquete = [];
let carrito = {
  nombre: "",
  opcionElegida: "",
};
borrar = document.getElementById("borrar");
elementoAgregar = document.querySelectorAll(".toggeable");

//FUNCIONES
//CREAR EL CARRITO (ARRAY/OBJETO)
const CrearCarrito = (nombre, opcionElegida) => {
  let carrito = {
    nombre: nombre,
    opcionElegida: opcionElegida,
  };
  arrayPaquete.push(carrito);
  return carrito;
};

//GUARDAR Y ELIMINAR EL CARRITO EN EL LOCALSTORAGE
const GuardarPaquete = () => {
  localStorage.setItem("paquete", JSON.stringify(arrayPaquete));
  Agregar();
};

function EliminarPaquete() {
  localStorage.clear();
  sessionStorage.clear();
}

function presentarInfo(array, clase) {
    array.forEach(element => {
       element.classList.toggle(clase);
   });
 }
 

//MOSTRAR LA INFORMACION EN EL HTML DE FORMA DINAMICA
function Agregar() {
  listaPaquetes.innerHTML = "";
  arrayPaquete = JSON.parse(localStorage.getItem("paquete"));

  if (arrayPaquete === null) {
    arrayPaquete = [];

  } else {
    arrayPaquete.forEach((element) => {
      listaPaquetes.innerHTML += `
        <div class="alert alert-primary my-4 " role="alert">
        <b>${element.nombre}</b><br> 
        <b>Su paquete elegido:</b><br>
        <b>${element.opcionElegida}</b><br>
        <b>¡Gracias por elegirnos!</b>
    </div>`;
    });
  }
};


//FUNCION ALERT OPCION ELEGIDA
let opcionElegidaUsuario = document.getElementsByName("eleccion"); //devuelve un array
function muestraOpcion() {
  for (let i = 0; i < opcionElegidaUsuario.length; i++) {
    //console.log(opcionElegidaUsuario[i]);
    if (opcionElegidaUsuario[i].checked) {
      Swal.fire("Elegiste el paquete: " + opcionElegidaUsuario[i].value);
    }
  }
}

//EVENTOS DEL DOM
//Opciones elegidas por el usuario
op1.addEventListener("click", () => {
  muestraOpcion();
});
op2.addEventListener("click", () => {
  muestraOpcion();
});
op3.addEventListener("click", () => {
  muestraOpcion();
  presentarInfo(elementoAgregar, 'd-none');
});


//Al hacer un click en agregar al carrito
datosUsuario.addEventListener("submit", (e) => {
  e.preventDefault();
  let datoUsuario = document.querySelector("#actividad").value.toUpperCase();
  let opcion = "";
 
  if (datoUsuario) {
    for (let i = 0; i < opcionElegidaUsuario.length; i++) {
      console.log(opcionElegidaUsuario[i]);
      if (opcionElegidaUsuario[i].checked) {
        opcion = opcionElegidaUsuario[i].value; //O también podría usar el formato JSON para introducir la variable "opcion" como parametro.
      }
    }
    CrearCarrito(datoUsuario, opcion);
    
    GuardarPaquete();
    datosUsuario.reset();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Debe completar nombre y apellido',
    })

  }
});

//Eliminar carrito
//borrar.addEventListener("click", () => {
 // EliminarPaquete();
//});

borrar.addEventListener("click", (e) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'PAQUETE ELIMINADO :(',
          )
          listaPaquetes.innerHTML = ""
          EliminarPaquete();
          Agregar();//PARA QUE NO SEA NECESARIO ACTUALIZAR LA PAGINA, DE LO CONTRARIO SE VUELVE A CARGAR EL PAQUETE SI NO SE ACTUALIZA.
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'CANCELADO :)',
          )
        }
      })
});

document.addEventListener("DOMContentLoaded", Agregar());

borrar.addEventListener("click", (e) => {
    e.preventDefault();
    listaPaquetes.innerHTML = ""
    EliminarPaquete();
    Agregar();//PARA QUE NO SEA NECESARIO ACTUALIZAR LA PAGINA, DE LO CONTRARIO SE VUELVE A CARGAR EL PAQUETE SI NO SE ACTUALIZA.
});

