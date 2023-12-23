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
const CrearItem = (nombre, ph, co2, o2, hco2, lactato, eb, sat) => {
  let item = {
    nombre: nombre,
    ph: ph,
    co2: co2,
    o2: o2,
    hco2: hco2,
    eb: eb,
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
  listaActividades.innerHTML = "";
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
      <b>${element.eb}</b><br>
      <b>${element.lactato}</b><br>
      <b>${element.sat}</b><br>
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
  let hco3U = document.querySelector("#hco2").value;
  let ebU = document.querySelector("#eb").value;
  let lactatoU = document.querySelector("#lactato").value;
  let satU = document.querySelector("#sat").value;
  CrearItem(nombreU, phU, co2U, o2U, hco3U, lactatoU, ebU, satU);
  GuardarDB();
});

//Desarrollamos el codigo para la interpretacion de los resultados

//VALIDACION DE MUESTRA...en caso de que la saturacion sea menor al 90% emitir una alerta

function muestraCorrecta(sat) {
  var sat = parseInt(document.getElementById("Sat").value);
  if (sat) {
    if (sat < 90) {
      alert(
        "VERIFIQUE EL ESTADO DE LA MUESTRA ¿CORRESPONDE A SANGRE ARTERIAL?"
      );
    } else {
      accederCalculadora();
    }
  } else {
    alert("Debe rellenar el campo");
  }
}

// Definición de los valores de la gasometría arterial (valores de ejemplo)
const pH = 7.35;
const PaO2 = 80;
const PaCO2 = 45;
const HCO3 = 24;
const SaO2 = 95;

// INTERPRETACION GSA con if else anidado
function interpretarGasometria(phU, o2U, co2U, hco2U, eb, satU) {
  let co2esperadoAc = 1.5 * hco2U + 8;
  let co2esperadoAl = 0.7 * hco2U + 21;
  let EBesperado = (co2U - 40) * 0.4;

  // Evaluar el pH
  let interpretacion = "";

  if (phU < 7.35) {
    interpretacion += "Acidosis. ";
  } else if (phU > 7.45) {
    interpretacion += "Alcalosis. ";
  }

  // Evaluar el HCO3 ante un trastorno metabolico
  if (hco2U > 26) {
    if (co2esperadoAl < co2U) {
      interpretacion +=
        "Alcalosis metabólica con acidosis respiratoria agregada, evaluar contexto";
    }
    if (co2esperadoAl > co2U) {
      interpretacion +=
        "Alcalosis metabólica con una alcalosis respiratoria agregada, evaluar contexto";
    } else if ((co2esperadoAl = co2U)) {
      interpretacion += "Alcalosis metabólica sin trastoro agregado";
    }
  } else if (hco2U < 22) {
    if (co2esperadoAc < co2U) {
      interpretacion +=
        "Acidosis metabólica con acidosis respiratoria agregada, evaluar contexto";
    }
    if (co2esperadoAc > co2U) {
      interpretacion +=
        "Acidosis metabólica con una alcalosis respiratoria agregada, evaluar contexto";
    } else if ((co2esperadoAc = co2U)) {
      interpretacion += "Acidosis metabólica sin trastoro agregado";
    }
  }

  // Evaluar la PaCO2 para determinar trastornosrespiratorios
  if (co2U > 45) {
    if ((eb = 2)) {
      interpretacion += "Acidosis respiratoria aguda. ";
    } else if (EBesperado > eb) {
      interpretacion += "Acidosis respiratoria cronica. ";
    }
  } else if (co2U < 35) {
    if ((eb = 2)) {
      interpretacion += "Alcalosis respiratoria aguda. ";
    } else if (EBesperado > eb) {
      interpretacion += "Alcalosis respiratoria cronica";
    }
  }

  // Evaluar la PaO2
  if (o2U < 80) {
    interpretacion += "Hipoxemia. ";
  }

  // Evaluar la SaO2
  if (satU < 85) {
    interpretacion += "Verifique el estado de la muestra";
  }

  // Devolver la interpretación
  return interpretacion;
}

//INTERPRETACION GSA con switch (componente respiratorio como variable)
function interpretarGasometria1(phU, co2U, hco2U, eb) {
  let co2esperadoAc = 1.5 * hco2U + 8;
  let co2esperadoAl = 0.7 * hco2U + 21;
  let EBesperado = (co2U - 40) * 0.4;

  // 1) Evaluar el pH
  let interpretacion = "";

  if (phU === 7.20) {
    interpretacion += "Segun el pH Acidemia. ";
    //estamos ante una acidemia, ¿cual es el trastorno primario?
    //Evaluamos componente respiratorio
    switch (co2U > 45) {
      case eb === 2:
        interpretacion += "Acidosis respiratoria aguda. ";
        break;
      case eb === EBesperado:
        interpretacion += "Acidosis respiratoria cronica. ";
        break;
      case eb > EBesperado:
        interpretacion +=
          "Acidosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado. Evaluar contexto";
        break;
  } }
  if (phU > 7.45) {
    interpretacion += "Segun el pH Alcalemia. ";
  //estamos ante una alcalemia, ¿cual es el trastorno primario?
  //Evaluamos componente respiratorio 
  switch (co2U < 35) {
    case eb === 2:
      interpretacion += "Alcalosis respiratoria aguda. ";
      break;
    case eb === EBesperado:
      interpretacion += "Alcalosis respiratoria cronica. ";
      break;
    case eb > EBesperado:
      interpretacion +=
        "Alcalosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado. Evaluar contexto";
      break;
} 
  } else{
  interpretacion+= "Valores dentro de los intervalos de referencia "
}
  return interpretacion;
}


//INTERPRETACION GSA con switch (componente metabolico como variable)
function interpretarGasometria2(phU, co2U, hco2U, eb) {
  let co2esperadoAc = 1.5 * hco2U + 8;
  let co2esperadoAl = 0.7 * hco2U + 21;
  let EBesperado = (co2U - 40) * 0.4;

  // 1) Evaluar el pH
  let interpretacion = "";

  if (phU < 7.35) {
    interpretacion += "Segun el pH Acidemia. Por el bicarbonato  ";
    //estamos ante una acidemia, ¿cual es el trastorno primario?
    //Evaluamos componente metabolico
    switch (hco2U < 22) {
      case co2esperadoAl > co2U:
        interpretacion +=
          "Acidosis metabólica, por la PCO2 posible acidosis respiratoria agregada, evaluar contexto . Se sugiere complementar estudio con ionograna y albumina";
          break
      case co2esperadoAl < co2U:
        interpretacion +=
          "Acidosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
          break
    }

  if (phU > 7.45) {
    interpretacion += "Segun el pH Alcalemia. Por el CO2 ";
  //estamos ante una alcalemia, ¿cual es el trastorno primario?
  //Evaluamos componente metabolico
  switch (hco2U > 26) {
    case co2esperadoAc > co2U:
      interpretacion +=
        "Alcalosis metabólica con acidosis respiratoria agregada, evaluar contexto clinico. Medir ionograma serico y urinario";
        break
    case co2esperadoAc < co2U:
      interpretacion +=
        "Alcalosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
      break;
  }}

  // 3) Evaluar el HCO3 para determinar trastorno metabolico
  switch (hco2U > 26) {
    case co2esperadoAc > co2U:
      interpretacion +=
        "Alcalosis metabólica con acidosis respiratoria agregada, evaluar contexto clinico. Medir ionograma serico y urinario";
        break
    case co2esperadoAc < co2U:
      interpretacion +=
        "Alcalosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
      break;
    default:
      switch (hco2U < 22) {
        case co2esperadoAl > co2U:
          interpretacion +=
            "Acidosis metabólica, por la PCO2 posible acidosis respiratoria agregada, evaluar contexto . Se sugiere complementar estudio con ionograna y albumina";
            break
        case co2esperadoAl < co2U:
          interpretacion +=
            "Acidosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
            break
      }
      break;
  }

  // Devolver la interpretación
  return interpretacion;
}
}

function interpretacionPh (phU){
  // 1) Evaluar el pH
  let interpretacion = "";

  if (phU < 7.35) {
    interpretacion += "Segun el pH Acidemia. ";
  } else if (phU > 7.45) {
    interpretacion += "Segun el pH Alcalemia. ";
  }

  return interpretacion;
}

function interpretacionPco2(co2U, ebU){
// 2) Evaluar la PaCO2 para determinar trastornosrespiratorios
let interpretacion = "";
switch (co2U > 45) {
 case ebU === 2:
   interpretacion += "Acidosis respiratoria aguda. ";
   break;
 case ebU === EBesperado:
   interpretacion += "Acidosis respiratoria cronica. ";
   break;
 case ebU > EBesperado:
   interpretacion +=
     "Acidosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
   break;
 default:
   switch (co2U < 35) {
     case ebU === 2:
       interpretacion += "Alcalosis respiratoria aguda. ";
       break;
     case ebU === EBesperado:
       interpretacion += "Alcalosis respiratoria cronica";
       break;
     case ebU > EBesperado:
       interpretacion +=
         "Alcalosis respiratoria cronica, el exceso de base sugiere un trastorno metabolico agregado";
         break
   }
   break
}
return interpretacion;

}

function interpretacionMetabolico(hco2U, co2U){
 let interpretacion = "";
 // 3) Evaluar el HCO3 para determinar trastorno metabolico
 switch (hco2U > 26) {
     case co2esperadoAc > co2U:
       interpretacion +=
         "Alcalosis metabólica con acidosis respiratoria agregada, evaluar contexto .";
         break
     case co2esperadoAc < co2U:
       interpretacion +=
         "Alcalosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
       break;
     default:
       switch (hco2U < 22) {
         case co2esperadoAl > co2U:
           interpretacion +=
             "Acidosis metabólica con acidosis respiratoria agregada, evaluar contexto .";
             break
         case co2esperadoAl < co2U:
           interpretacion +=
             "Acidosis metabólica con una alcalosis respiratoria agregada, evaluar contexto .";
             break
       }
       break;
   }
   return interpretacion;
}

function interpretacionGsa (phU, co2U, ebU, hco2U){
if (phU){
 interpretacionPh (phU)
} else alert ("pH dentro del intervalo de referencia")

if (co2U, ebU){
 interpretacionPco2(co2U, ebU)
} else alert ("dentro del intervalo de referencia");

if (hco2U, co2U){
 interpretacionMetabolico(hco2U, co2U)
} else alert ("dentro del intervalo de referenica");

};

//Botn analizar resultados
interpretarU.addEventListener("click", (e) => {
  e.preventDefault();
  let phU = document.querySelector("#ph").value;
  let co2U = document.querySelector("#co2").value;
  let o2U = document.querySelector("#o2").value;
  let hco2U = document.querySelector("#hco2").value;
  let ebU = document.querySelector("#eb").value;
  let satU = document.querySelector("#sat").value;
  interpretarGasometria1 (phU, co2U, ebU, hco2U);
  const resultadoInterpretacion = interpretarGasometria1 (phU, co2U, ebU, hco2U);
  Swal.fire(resultadoInterpretacion);
 
});

document.addEventListener("DOMContentLoaded", PintarDB());
