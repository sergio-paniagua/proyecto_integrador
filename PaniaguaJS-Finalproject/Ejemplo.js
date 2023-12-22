const CompletarForm = (nombre, email, telefono) => {
    {formVis ?
        <form>
          <input id="nombre" placeholder='Ingrese su nombre' />
          <input id="email" placeholder='Ingrese su email' />
          <input id="tel" placeholder='Ingrese su telefono' />
        </form>
        : null}

        let nombre = document.querySelector("#nombre").value;
        let email = document.querySelector("#email").value;
        let telefono = document.querySelector("#tel").value;

        let form = {
            nombre: nombre,
            email: email,
            telefono: telefono,
          };
          return form;
}

let cliente = CompletarForm()











