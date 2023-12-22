//VARIABLES GLOBALES Y ELEMENTOS DEL DOM
const formularioU = document.querySelector("#formulario");
const listaActividades = document.getElementById("listaActividades");
let arrayParametros = [];
let item = {
  nombre: "",
  ph: "",
  co2: "",
  o2: "",
  hco2: "",
  lactato: "",
  sat: "",
};

borrar = document.getElementById("borrar");
interpretarU = document.getElementById("analizar");

//FUNCIONES
//para crear un arrays con objetos
const CrearItem = (nombre, ph, co2, o2, hco2, lactato, sat) => {
  let item = {
    nombre: nombre,
    ph: ph,
    co2: co2,
    o2: o2,
    hco2: hco2,
    lactato: lactato,
    sat: sat,
  };

  arrayParametros.push(item);
  return item;
};

//para guardar en Storage
let GuardarDB = () => {
  localStorage.setItem("rutina", JSON.stringify(arrayParametros));
  PintarDB();
};

//PARA ELIMINAR TODOS LOS DATOS

function Eliminar() {
  localStorage.clear();
  sessionStorage.clear();
}

borrar.addEventListener("click", (e) => {
  e.preventDefault();
  listaActividades.innerHTML = ""
  Eliminar();
  PintarDB();
 
});

//ACA CREAMOS LA BASE DE DATOS CON LOS VALORES INGRESADOR POR EL USUARIO O VIA HOST DESDE EL 
//EQUIPO DE MEDICION

const PintarDB = () => {
  listaActividades.innerHTML = "";
  arrayParametros = JSON.parse(localStorage.getItem("rutina"));
  if (arrayParametros === null) {
    arrayParametros = [];
  } else {
    arrayParametros.forEach((element) => {
      listaActividades.innerHTML += `
      <div class="alert alert-danger my-4 " role="alert">
      <i class="material-symbols-outlined">
          settings_accessibility
      </i>
      <b>${element.nombre}</b><br>
      <b>${element.ph}</b><br>
      <b>${element.co2}</b><br>
      <b>${element.o2}</b><br>
      <b>${element.hco2}</b><br>
      <b>${element.lactato}</b><br>
      <b>${element.sat} mEq/L</b><br>
  </div>`;
    });
  }
};

//EVENTOS
formularioU.addEventListener("submit", (e) => {
  e.preventDefault();
  let nombreU = document.querySelector("#nombre").value;
  let phU = document.querySelector("#ph").value;
  let co2U = document.querySelector("#co2").value;
  let o2U = document.querySelector("#o2").value;
  let hco2U = document.querySelector("#hco2").value;
  let lactatoU = document.querySelector("#lactato").value;
  let satU = document.querySelector("#sat").value;
  CrearItem(nombreU, phU, co2U, o2U, hco2U, lactatoU, satU);
  GuardarDB();
});


//Desarrollamos el codigo para la interpretacion de los resultados

//VALIDACION DE MUESTRA...en caso de que la saturacion sea menor al 85% emitir una alerta

function muestraCorrecta(sat) {
  var sat = parseInt(document.getElementById("Sat").value);
  if (sat){
      if (sat < 85) {
          alert("VERIFIQUE EL ESTADO DE LA MUESTRA ¿CORRESPONDE A SANGRE ARTERIAL?");
        } else {
         accederCalculadora();
         
        }
  }else{
      alert ("Debe rellenar el campo");
  }
}


// Definición de los valores de la gasometría arterial (valores de ejemplo)
const pH = 7.35;
const PaO2 = 80;
const PaCO2 = 45;
const HCO3 = 24;
const SaO2 = 95;

// Función para interpretar la gasometría arterial
function interpretarGasometria(phU, o2U, co2U, hco2U, satU) {
  // Evaluar el pH
  let interpretacion = "";
  if (!phU){
    if (phU < 7.35) {
      interpretacion += "Acidosis. ";
    } else if (phU > 7.45) {
      interpretacion += "Alcalosis. ";
    }
  }else {
    alert ("Debe rellenar todos los campos")
  }

  // Evaluar la PaO2
  if (o2U < 80) {
    interpretacion += "Hipoxemia. ";
  }

  // Evaluar la PaCO2
  if (co2U > 45) {
    interpretacion += "Retención de CO2. ";
  } else if (co2U < 35) {
    interpretacion += "Eliminación excesiva de CO2. ";
  }

  // Evaluar el HCO3
  if (hco2U > 26) {
    interpretacion += "Alcalosis metabólica. ";
  } else if (hco2U < 22) {
    interpretacion += "Acidosis metabólica. ";
  }

  // Evaluar la SaO2
  if (satU < 90) {
    interpretacion += "Verifique el estado de la muestra";
  }

  // Devolver la interpretación
  return interpretacion;
}


//Botn analizar resultados
interpretarU.addEventListener("click", (e) => {
  e.preventDefault();
  let phU = document.querySelector("#ph").value;
  let co2U = document.querySelector("#co2").value;
  let o2U = document.querySelector("#o2").value;
  let hco2U = document.querySelector("#hco2").value;
  let satU = document.getElementById("Sat").value;
  interpretarGasometria(phU, o2U, co2U, hco2U, satU)
  const resultadoInterpretacion = interpretarGasometria(phU, co2U, o2U, hco2U, satU);
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: resultadoInterpretacion,
  })
});

document.addEventListener("DOMContentLoaded", PintarDB());

