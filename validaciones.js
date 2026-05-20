document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tipoSolicitud = document.querySelectorAll("input[name='tipo-solicitud']");
    const fechaEvento = document.getElementById("fecha");
    const horaEvento = document.getElementById("hora");
    const duracionEvento = document.getElementById("duracion");
    const nombreEvento = document.getElementById("descripcion-evento");
    const tipoEvento = document.getElementById("tipo-evento");
    const lugarEvento = document.getElementById("lugar-evento");
    const cantidadAdultos = document.getElementById("adultos");
    const cantidadMenores = document.getElementById("menores");
    const otrasRestricciones = document.getElementById("otras-restricciones");
    const menuInfantilCheckbox = document.querySelector("input[name='menu-infantil']");
    const cantidadMenuInfantil = document.getElementById("cantidad-menu-infantil");
    const nombreCliente = document.getElementById("nombre");
    const email = document.getElementById("email");
    const confirmarEmail = document.getElementById("confirmar-email");
    const telefono = document.getElementById("telefono");
    const bebidasIncluidas = document.querySelectorAll("input[name='bebidas']");
    const tipoMenu = document.getElementById("menu-preferido");
    const observaciones = document.getElementById("observaciones");
    const contactoCheckbox = document.querySelector("input[name='contacto']");
    const terminosCheckbox = document.querySelector("input[name='terminos']");
    const privacidadCheckbox = document.querySelector("input[name='privacidad']");

    // Función para mostrar errores
    function mostrarError(campo, mensaje) {
        campo.classList.add("campo-error");
        campo.classList.remove("campo-ok");
        let error = campo.nextElementSibling;
        if (!error || !error.classList.contains("error")) {
            error = document.createElement("div");
            error.classList.add("error");
            campo.parentNode.appendChild(error);
        }
        error.textContent = mensaje;
    }

    // Función para limpiar errores
    function limpiarError(campo) {
        campo.classList.remove("campo-error");
        campo.classList.add("campo-ok");
        const error = campo.nextElementSibling;
        if (error && error.classList.contains("error")) {
            error.remove();
        }
    }

    // Validaciones
    function validarTipoSolicitud() {
        const seleccionado = Array.from(tipoSolicitud).some(input => input.checked);
        if (!seleccionado) {
            mostrarError(tipoSolicitud[0].parentNode, "Debe seleccionar una opción.");
            return false;
        }
        limpiarError(tipoSolicitud[0].parentNode);
        return true;
    }

    function validarFecha() {
        const hoy = new Date();
        const fechaIngresada = new Date(fechaEvento.value);
        const diferenciaDias = (fechaIngresada - hoy) / (1000 * 60 * 60 * 24);

        if (!fechaEvento.value) {
            mostrarError(fechaEvento, "Debe ingresar una fecha.");
            return false;
        }

        if (tipoSolicitud[0].checked && diferenciaDias < 2) {
            mostrarError(fechaEvento, "Para reservas, la fecha debe ser al menos 48 horas desde ahora.");
            return false;
        }

        if (tipoSolicitud[1].checked && diferenciaDias < 7) {
            mostrarError(fechaEvento, "Para catering, la fecha debe ser al menos 7 días desde ahora.");
            return false;
        }

        limpiarError(fechaEvento);
        return true;
    }

    function validarHora() {
        const hora = parseInt(horaEvento.value.split(":")[0], 10);
        if (tipoSolicitud[0].checked && (hora < 12 || hora > 23)) {
            mostrarError(horaEvento, "Para reservas, la hora debe estar entre las 12:00 y las 23:00.");
            return false;
        }
        limpiarError(horaEvento);
        return true;
    }

    function validarNombreEvento() {
        if (tipoSolicitud[1].checked && (!nombreEvento.value || nombreEvento.value.length < 5)) {
            mostrarError(nombreEvento, "El nombre del evento debe tener al menos 5 caracteres.");
            return false;
        }
        limpiarError(nombreEvento);
        return true;
    }

    function validarCantidadAdultos() {
        const adultos = parseInt(cantidadAdultos.value, 10);
        if (!adultos || adultos < 1) {
            mostrarError(cantidadAdultos, "Debe ingresar al menos 1 adulto.");
            return false;
        }
        if (tipoSolicitud[0].checked && adultos > 20) {
            mostrarError(cantidadAdultos, "Para reservas, el máximo es de 20 adultos.");
            return false;
        }
        if (tipoSolicitud[1].checked && adultos > 200) {
            mostrarError(cantidadAdultos, "Para catering, el máximo es de 200 adultos.");
            return false;
        }
        limpiarError(cantidadAdultos);
        return true;
    }

    function validarEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email.value)) {
            mostrarError(email, "Debe ingresar un correo electrónico válido.");
            return false;
        }
        if (email.value !== confirmarEmail.value) {
            mostrarError(confirmarEmail, "Los correos electrónicos no coinciden.");
            return false;
        }
        limpiarError(email);
        limpiarError(confirmarEmail);
        return true;
    }

    function validarCheckboxes() {
        if (!contactoCheckbox.checked) {
            mostrarError(contactoCheckbox.parentNode, "Debe aceptar que lo contactemos.");
            return false;
        }
        if (!terminosCheckbox.checked) {
            mostrarError(terminosCheckbox.parentNode, "Debe aceptar los términos y condiciones.");
            return false;
        }
        if (!privacidadCheckbox.checked) {
            mostrarError(privacidadCheckbox.parentNode, "Debe aceptar la política de privacidad.");
            return false;
        }
        limpiarError(contactoCheckbox.parentNode);
        limpiarError(terminosCheckbox.parentNode);
        limpiarError(privacidadCheckbox.parentNode);
        return true;
    }

    // Validar todo el formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        if (!validarTipoSolicitud()) valido = false;
        if (!validarFecha()) valido = false;
        if (!validarHora()) valido = false;
        if (!validarNombreEvento()) valido = false;
        if (!validarCantidadAdultos()) valido = false;
        if (!validarEmail()) valido = false;
        if (!validarCheckboxes()) valido = false;

        if (valido) {
            form.style.display = "none";
            const confirmacion = document.createElement("div");
            confirmacion.innerHTML = `
                <h2>Solicitud enviada con éxito</h2>
                <p>Gracias por su solicitud. Nos pondremos en contacto con usted pronto.</p>
                <button onclick="location.reload()">Nueva solicitud</button>
            `;
            document.body.appendChild(confirmacion);
        }
    });
});