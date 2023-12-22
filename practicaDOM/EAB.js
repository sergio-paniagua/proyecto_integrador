//variables globales
const formularioU = document.querySelector("#formulario");
const listaActividades = document.getElementById("listaActividades");
let arrayParametros = [];
let item = {
  actividad: "",
  co2: "",
  o2: "",
};

//funciones
//para crear un arrays con objetos
const CrearItem = (actividad, co2, o2) => {
  let item = {
    actividad: actividad,
    co2: co2,
    o2: o2,
  };

  arrayParametros.push(item);
  return item;
};

//funcion para guardar en Storage

const GuardarDB = () => {
  localStorage.setItem("rutina", JSON.stringify(arrayParametros));
  PintarDB();
};

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
      <b>${element.actividad}</b><br>
      <b>${element.co2}</b><br>
      <b>${element.o2}</b><br>
      <span class="float-right">
          <i class="material-symbols-outlined">
              done
          </i>
          <i class="material-symbols-outlined">
              delete
          </i>
      </span>
  </div>`;
    });
  }
};

//eventos
formularioU.addEventListener("submit", (e) => {
  e.preventDefault();
  let actividadU = document.querySelector("#actividad").value;
  let co2U = document.querySelector("#co2").value;
  let o2U = document.querySelector("#o2").value;
  CrearItem(actividadU, co2U, o2U);
  GuardarDB();
  formularioU.reset();
});

document.addEventListener("DOMContentLoaded", PintarDB());

//delegacion
listaActividades.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(e.path[1].childNodes[3].innerHTML);
   
});

//funciones finales
function interpretar(){
  if (actividadU<7.3){
  }
}