//SEGUNDA SECCION: VALIDACION DE MUESTRA
const usuarios = [{
    mail: 'sergio@mail.com',
    pass: 12345
}]
//elementos del DOM
//body
let emailUser = document.getElementById('emailAddress');
    password = document.getElementById ('pass')
    btnLogin = document.getElementById('btnLogin');
    Formulario = document.getElementById('formulario');
    elementoAgregar = document.querySelectorAll(".toggeable");
    tabla = document.getElementById('tabla')
 const Recordar = document.getElementById('recordarme');

function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);
    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

function guardarDatos(usuarioDB, storage){
    const usuario = {
        'user' : usuarioDB.mail,
        'pass' : usuarioDB.pass
    }
    storage.setItem('usuario', JSON.stringify(usuario));
}
function borrarDatos(){
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(){
    return JSON.perse(storage.getItem('usuario'));
}

function accederCalculadora(){
        Formulario.innerHTML = '';
        let html = 
        `
        <div 
        <h1>Calculadora AB</h1>
        <p>Ingrese los Valores<p>
        <form class= "form">
        <input type="text" value="" placeholder="pH"><br>
        <input type="text" value="" placeholder="pO2"><br>
        <input type="text" value="" placeholder="pCO2"><br>
        <input type="text" value="" placeholder="EB"><br>
        <input type="text" value="" placeholder="Na"><br>
        <input type="text" value="" placeholder="K"><br>
        <input type="text" value="" placeholder="Cl"><br>
      </form>
      <button id="interpretar">INTERPRETACION</button>
    </div>`;
         Formulario.innerHTML = html;
}

function valoresReferencia(){
  tabla.innerHTML = '';
  let valores = 
  `
  <div class="tabla">
  <table border="3" cellpadding="10" cellspacing="3" class="tabla2">
      <tr>
          <td class="tab">Parametros</td>
          <td class="tab">Valores de Referencia</td>
      </tr>
      <tr>
          <td class="tab">pH</td>
          <td>
              7.35-7.45
          </td>
      </tr>

      <tr>
          <td class="tab">PO2</td>
          <td>80-90</td>
      </tr>

      <tr>
          <td class="tab">pCO2</td>
          <td>35-45</td>
      </tr>
      <tr>
          <td class="tab">EB</td>
          <td>22-22</td>
      </tr>
      <tr>
          <td class="tab">Sodio</td>
          <td>131-145</td>
      </tr>
      <tr>
          <td class="tab">Potasio</td>
          <td>3-5</td>
      </tr>
      <tr>
          <td class="tab">Cloruro</td>
          <td>98-115</td>
      </tr>
  </table>
</div>`;
   tabla.innerHTML = valores;
}

function presentarInfo(array, clase) {
  array.forEach(element => {
      element.classList.toggle(clase);
  });
}
function estaLogeado(usuario){
    if(usuario){
    presentarInfo();
    }
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  if (!emailAddress.value || !pass.value){
    alert("Completar todos los campos");
  }else{
    let data = validarUsuario(usuarios, emailAddress.value, pass.value)
    if(!data){
        alert("Incorrecto")
    }else{
      if (Recordar.checked) {
            guardarDatos(data, localStorage);
        }else {
            guardarDatos(data, sessionStorage);
        }
        presentarInfo(elementoAgregar, 'd-none');
    }

  }
});

//SEGUNDA SECCION: VALIDACION DE MUESTRA

function muestraCorrecta(sat) {
    var sat = parseInt(document.getElementById("Sat").value);
    if (sat){
        if (sat < 85) {
            alert("muestra incorrecta");
          } else {
           accederCalculadora();
           
          }
    }else{
        alert ("Debe rellenar el campo");
    }
  }

  //TERCERA SECCION: INTERPRETACION DE RESULTADOS
class Mi {
    constructor(pH, pO2, pCO2, Bicarbonato, Na, Cl, Ka) {
      this.pH = parseFloat(pH);
      this.pO2 = parseFloat(pO2);
      this.pCO2 = parseFloat(pCO2);
      this.Bicarbonato = parseFloat(Bicarbonato);
      this.Sodio = parent(Na);
      this.Cloro = parseInt(Cl);
      this.Potasio = parseInt(Ka);
    }
    //Ecuaciones que voy a utilizar para comparar resultados
    
    pCO2Esperada(Bicarbonato) {
      let pCO2Esperada = 1.5 * Bicarbonato + 8;
    }
  
    Brecha() {
      let AG = this.Sodio + (this.Potasio + this.Bicarbonato);
    }
  }


