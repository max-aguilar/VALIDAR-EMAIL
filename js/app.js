

// DOMContentLoaded - Se va a ejecutar una vez que todo el HTML haya sido descargado
document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // console.log(email);

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#enviar-mail');
    const btnSubmit = document.querySelector('#enviar-mail button[type="submit"]');
    const btnReset =  document.querySelector('#enviar-mail button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const mensajeExito =  document.querySelector('#mensajeExito');
    
    // console.log(inputEmail);
    // console.log(inputAsunto);
    // console.log(inputMensaje);
    // console.log(btnSubmit);
    // console.log(spinner);
    
    // Asignar eventos desde Callbacks

    /*
    // Estos son callbacks - para que no sea repetitivo se pueden reemplazar por una funcion
    inputEmail.addEventListener('blur', function(e) {
        // El evento blur se ejecuta cuando salimos de input a otra parte del DOM

        // .target es el elemento sobre el cual se esta registrando el evento
        // .value lee el valor ingresado en el input
        console.log(e.target.value);

        // El evento input se dispara cuando se esta escribiendo pero no cuando se abandona el input

    });

    inputAsunto.addEventListener('blur', function(e) {
        console.log(e.target.value);
    });

    inputMensaje.addEventListener('blur', function(e) {
        console.log(e.target.value);
    });

    */


     // Asignar eventos desde Funciones

    // Para hacerlo en tiempo real cambiar el 'blur' por 'input'
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener( 'click', function(e) {
        e.preventDefault();

        // reiniciar el formulario
        // reiniciar el objeto
        resetFormulario();
    });

    
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            // reiniciar el formulario
            // reiniciar el objeto
            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-blue-600', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';

            // formulario[2].appendChild(alertaExito);
            mensajeExito.appendChild(alertaExito);
            // mensajeExito.classList.remove('hidden');
            // console.log(mensajeExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    };
    

    function validar(e) {
        // Para dirigirnos las padre del input que dispara el evento
        // console.log(e.target.parentElement);

        // Para ir al siguiente elemento
        // console.log(e.target.parentElement.nextElementSibling);

        // console.log(e.target.value);
        // Obtenemos el id del elemento que dispara el evento
        // console.log(e.target.id);

        // Preguntamos si el input es igual a un string vacio
        if(e.target.value.trim() === '' && e.target.id !== 'email-copia') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        // validarEmail(e.target.value);
        
        limpiarAlerta(e.target.parentElement);

        // ASIGNAR LOS VALORES

        // console.log(e.target.name);
        email[e.target.name] = e.target.value.trim().toLowerCase();
        // console.log(email);

        // COMPROBAR EL OBJETO EMAIL

        comprobarEmail();
    }

    // referencia - elemento al cual se va a añadir esta alerta
    function mostrarAlerta(mensaje, referencia) {
        // Comprobar si ya existe una alerta
        limpiarAlerta(referencia)

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        // console.log(error);

        // console.log(referencia);

        // Inyectar el error al formulario

         // Mediante .innerHTML - va a reemplazar todo el formulario
        // formulario.innerHTML = error.innerHTML;

        // Mediante .appendChild
        referencia.appendChild(error);
        
        // console.log(formulario);

    }

    function limpiarAlerta (referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {

        // Expresion regular - va a buscar un patron en una cadena de texto o en una serie de numeros
        // usuario@dominio.com

        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        // console.log(resultado);
        return resultado;
    }


    // Comprueba que el objeto este lleno
    function comprobarEmail() {

        // Me retorna las keys del objeto
        // console.log(Object.keys(email));

        // Object.value - me retorna los valores del objeto
        // Object.value - crea un nuevo arreglo con los valores del objeto
        // y con .includes - Verificamos que ninguno este vacio - retorna false si todos estan llenos
        // console.log(Object.values(email).includes(''));

        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.classList.add('cursor-not-allowed');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.classList.remove('cursor-not-allowed');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
         // reiniciar el formulario
        // reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }


});