//PROMERA SECCION: INGRESO A LA APLICACION Y VALIDACION DE MUESTRA
const usuarios = [{
    mail: 'sergio@mail.com',
    pass: 12345
}]
//Elementos del DOM
let emailAddress = document.getElementById('emailAddress');
    pass = document.getElementById ('pass')
    btnLogin = document.getElementById('btnLogin');
    Formulario = document.getElementById('formulario');
    elementoAgregar = document.querySelectorAll(".toggeable");
    tabla = document.getElementById('tabla')
 const Recordar = document.getElementById('recordarme');

 //FUNCIONES
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
    Swal.fire('Datos eliminados')
}

function recuperarUsuario(){
    return JSON.perse(storage.getItem('usuario'));
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
  return info;
}

function estaLogeado(usuario){
    if(usuario){
    presentarInfo();
    }
}

//EVENTOS
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  if (!emailAddress.value || !pass.value){
    Swal.fire('Completá todos los campos')
  }else{
    let data = validarUsuario(usuarios, emailAddress.value, pass.value)
    if(!data){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrecto!',
          })
          
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
function muestraCorrecta(satU) {
    var satU = parseInt(document.getElementById("Sat").value);
    if (satU){
        if (satU < 80) {
            Swal.fire({
                icon: 'error',
                title: 'Verifique el estado de la muestra',
                text: 'No es un valor admisible',
              });
          } else {
            Swal.fire('Ingrese los parametros a analizar')
          }
    }else{
        Swal.fire('Debe ingresar la saturacion arterial para continuar')
    }
  }

  //TERCERA SECCION: INGRESO DE DATOS E INTERPRETACION DE RESULTADOS: VER EAB.JS


  
 





