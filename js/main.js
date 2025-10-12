let listaPacientes; // lista inicial de pacientes
// lista vacia para el ingreso de pacientes
const keyLocalStorage = "pacientes";

let botonAgregarPaciente = document.getElementById("btn-confirmar-paciente");
botonAgregarPaciente.addEventListener("click", agregarPaciente);


let botonConfirmarAtencion = document.getElementById("btn-atender-paciente");
botonConfirmarAtencion.addEventListener("click", atenderPaciente);

let botonAbrirModalAgregarPaciente = document.getElementById("btn-abrir-modal-agregar-paciente");
botonAbrirModalAgregarPaciente.addEventListener("click", abrirModalAgregarPaciente)

let botonAbrirModalAtenderPaciente = document.getElementById("btn-abrir-modal-atender-paciente");
botonAbrirModalAtenderPaciente.addEventListener("click", abrirModalAtenderPaciente);



let modalAtenderPaciente = document.getElementById("modal-atender-paciente");
let modalAgregarPaciente = document.getElementById("modal-agregar-paciente");


let botonesCerrarModal = document.getElementsByClassName("close");
for(let botonCerrarModal of botonesCerrarModal){
    botonCerrarModal.addEventListener("click", cerrarModal);
}

let inputNombreCompleto = document.getElementById("formulario-paciente-nombre");
    let inputDni = document.getElementById("formulario-paciente-dni");
    let inputMotivo = document.getElementById("formulario-paciente-motivo");

    const mensajeErrorDNI = document.getElementById("error-msj-dni");
    const mensajeErrorNombre = document.getElementById("error-msj-nombre");
    const mensajeErrorMotivo = document.getElementById("error-msj-motivo");

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

function obtenerPacientesSinAtender(){
    const listaPacientes = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];

    return listaPacientes.filter((paciente) => !paciente.atendido);

}

function abrirModalAtenderPaciente(){

    modalAtenderPaciente.style.display = "block";

    const nombrePacienteAtender = document.getElementById("nombre-paciente-atender");
    nombrePacienteAtender.innerHTML = obtenerPacientesSinAtender()[0].nombreCompleto;

}

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

function cerrarModal(){
    modalAtenderPaciente.style.display = "none";
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
        // Recorremos el array
    pacientesNoAtendidos.forEach((paciente) => {
    // Creamos un div para la tarjeta
        const card = document.createElement('div');
        card.classList.add('card-paciente');

    // Agregamos contenido HTML dentro de la card
        card.innerHTML = `
            <div class="informacion-paciente">
                <h3 class="nombre-paciente">${paciente.nombreCompleto}</h3>
                <p class="dni-paciente">DNI: ${paciente.dni}</p>
            </div>
            <div class="hora-paciente">
                <p class="hora-ingreso">${paciente.horaIngreso}</p>
            </div>
            `;

        // Agregamos la card al contenedor
        contenedor.appendChild(card);
    });
    } 
}


// Llamamos a la función
renderizarListaEspera(listaPacientes);


// let menu = parseInt(prompt("Elija una opcion: \n\n 1. Crear paciente. \n 2. Lista de espera. \n 3. Atender paciente. \n 4. Salir"));

// while( menu !== 4){
//     switch(menu){
//         case 1:
//             opcionCrearPaciente()
//             break;

//         case 2:
//             opcionListarPacientes()
//             break;
        
//         case 3:
//             opcionAtenderPaciente()
//             break;
        
//         default:
//             alert(`Opcion incorrecta`)
//     }
//     menu = parseInt(prompt("Elija una opcion: \n\n 1. Crear paciente. \n 2. Lista de espera. \n 3. Atender paciente. \n 4. Salir"));
// }

// alert(`Gracias!`);


