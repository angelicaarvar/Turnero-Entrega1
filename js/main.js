// GENERALES
let listaPacientes;
const keyLocalStorage = "pacientes";
const relojIconoUrl ='"http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"'



//BOTONES
let botonAgregarPaciente = document.getElementById("btn-confirmar-paciente");
botonAgregarPaciente.addEventListener("click", agregarPaciente);

let botonConfirmarAtencion = document.getElementById("btn-atender-paciente");
botonConfirmarAtencion.addEventListener("click", atenderPaciente);

let botonAbrirModalAgregarPaciente = document.getElementById("btn-abrir-modal-agregar-paciente");
botonAbrirModalAgregarPaciente.addEventListener("click", abrirModalAgregarPaciente)

let botonAbrirModalAtenderPaciente = document.getElementById("btn-abrir-modal-atender-paciente");
botonAbrirModalAtenderPaciente.addEventListener("click", abrirModalAtenderPaciente);

let botonesCerrarModal = document.getElementsByClassName("close");
for(let botonCerrarModal of botonesCerrarModal){
    botonCerrarModal.addEventListener("click", cerrarModal);
}

// MODALES
let modalAtenderPaciente = document.getElementById("modal-atender-paciente");
let modalAgregarPaciente = document.getElementById("modal-agregar-paciente");

// INPUTS
let inputNombreCompleto = document.getElementById("formulario-paciente-nombre");
let inputDni = document.getElementById("formulario-paciente-dni");
let inputMotivo = document.getElementById("formulario-paciente-motivo");

// MENSAJES DE ERROR
const mensajeErrorDNI = document.getElementById("error-msj-dni");
const mensajeErrorNombre = document.getElementById("error-msj-nombre");
const mensajeErrorMotivo = document.getElementById("error-msj-motivo");

// ----------------------------------------------------------------------------

// FUNCIONES PRINCIPALES

function agregarPaciente() {
    const nombreCompleto = inputNombreCompleto.value;
    const dni = inputDni.value;
    const motivo = inputMotivo.value;

    let formularioValido = validarFormulario(nombreCompleto, dni, motivo);
    if(!formularioValido){
        return;
    }

    listaPacientes = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];

    listaPacientes.push({nombreCompleto, dni, motivo, horaIngreso: new Date().toLocaleTimeString(), atendido: false});

    localStorage.setItem(keyLocalStorage, JSON.stringify(listaPacientes));

    renderizarListaEspera();

    modalAgregarPaciente.style.display = "none";
}


function atenderPaciente() {

    listaPacientes = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];

    
    for(let paciente of listaPacientes) {
        if(paciente && paciente.atendido === false){
            paciente.atendido = true;
            break;
        }
    }

    localStorage.setItem(keyLocalStorage, JSON.stringify(listaPacientes));

    renderizarListaEspera();
    
    modalAtenderPaciente.style.display = "none";
}

// ----------------------------------------------------------------------------
// FUNCION DE RENDERIZADO

function renderizarListaEspera() {
    const contenedor = document.getElementById('contenedor-card-pacientes');

    const pacientesNoAtendidos = obtenerPacientesSinAtender(); 

  // Limpia el contenido previo (por si se vuelve a renderizar)
    contenedor.innerHTML = '';

    if(pacientesNoAtendidos.length === 0) {
        botonAbrirModalAtenderPaciente.disabled = true;
        contenedor.innerHTML = '<p class="mensaje-cola-vacia">No hay pacientes en espera.</p>';

    } else {
    botonAbrirModalAtenderPaciente.disabled = false;
    pacientesNoAtendidos.forEach((paciente) => {
        const card = document.createElement('div');
        card.classList.add('card-paciente');

        card.innerHTML = `
            <div class="informacion-paciente">
                <h3 class="nombre-paciente">${paciente.nombreCompleto}</h3>
                <p class="dni-paciente">DNI: ${paciente.dni}</p>
            </div>
            <div class="hora-paciente">
                <p class="hora-ingreso"><svg class="reloj" xmlns=${relojIconoUrl}/></svg>${paciente.horaIngreso}</p>
            </div>
            `;

        // Agregamos la card al contenedor
        contenedor.appendChild(card);
    });
    } 
}

// ----------------------------------------------------------------------------
// APERTURA Y CIERRE DE MODALES

function abrirModalAgregarPaciente(){
    inputNombreCompleto.value = '';
    inputDni.value = '';
    inputMotivo.value = '';

    mensajeErrorNombre.style.display = "none";
    mensajeErrorDNI.style.display = "none";
    mensajeErrorMotivo.style.display = "none";

    inputNombreCompleto.classList.remove("valor-ingresado-erroneo")
    inputDni.classList.remove("valor-ingresado-erroneo")
    inputMotivo.classList.remove("valor-ingresado-erroneo")

    modalAgregarPaciente.style.display = "block"
}

function abrirModalAtenderPaciente(){
    modalAtenderPaciente.style.display = "block";

    const nombrePacienteAtender = document.getElementById("nombre-paciente-atender");
    nombrePacienteAtender.innerHTML = obtenerPacientesSinAtender()[0].nombreCompleto;
}


function cerrarModal(){
    modalAtenderPaciente.style.display = "none";
    modalAgregarPaciente.style.display = "none";
}

// ----------------------------------------------------------------------------
// FUNCIONES SECUNDARIAS

function validarFormulario(nombreCompleto, dni, motivo) {

    let valido = true

    if (dni.length != 8 || isNaN(dni) || parseInt(dni) <= 0) {
        valido = false;
        inputDni.classList.add('valor-ingresado-erroneo');
        mensajeErrorDNI.style.display = "block";

    } else{
        inputDni.classList.remove('valor-ingresado-erroneo');
        mensajeErrorDNI.style.display = "none"
    }

    if(nombreCompleto === ""){
        valido = false;
        inputNombreCompleto.classList.add('valor-ingresado-erroneo');
        mensajeErrorNombre.style.display = "block";
    }else{
        inputNombreCompleto.classList.remove('valor-ingresado-erroneo');
        mensajeErrorNombre.style.display = "none";
    }

    if(motivo === ""){
        valido = false;
        inputMotivo.classList.add('valor-ingresado-erroneo');
        mensajeErrorMotivo.style.display = "block"
    } else{
        inputMotivo.classList.remove('valor-ingresado-erroneo');
        mensajeErrorMotivo.style.display = "none"
    }

    return valido;
}


function obtenerPacientesSinAtender(){
    const listaPacientes = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];

    return listaPacientes.filter((paciente) => !paciente.atendido);
}


// Primer renderizado de lista de espera
renderizarListaEspera(listaPacientes);