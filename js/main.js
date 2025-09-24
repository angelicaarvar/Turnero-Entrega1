let pacientes = [];
// lista vacia para el ingreso de pacientes


function validarDNI(dni) {

    let esValido = true

    if (dni.length != 8) {2
        esValido = false
    }

    return esValido;
}


function solicitarDatos() {
    let nombreCompleto = prompt("Nombre completo: ");
    let dni = prompt("DNI: ");

    let dniValido = validarDNI(dni);

    while (dniValido != true) {
        dni = prompt("DNI invalido, ingrese de nuevo");
        dniValido = validarDNI(dni);
    }

    return { nombreCompleto, dni }
}

function opcionCrearPaciente(){
    let nuevoPaciente = solicitarDatos();
    pacientes.push(nuevoPaciente); //agrega al final de la lista el paciente, ordenados por orden de llegada. 

    alert(`Paciente ${nuevoPaciente.nombreCompleto} agregado con éxito`);
}

function opcionListarPacientes() {

    let mensajeListadoPacientes = "Listado de pacientes proximos a atender: \n \n"

    if (pacientes.length == 0) {
        alert(`No hay pacientes en espera...`);
    } else {
        for (const paciente of pacientes) {
            mensajeListadoPacientes = mensajeListadoPacientes + paciente.nombreCompleto + "\n";

        }
        alert(mensajeListadoPacientes);
    }


}

function opcionAtenderPaciente() {

    const pacienteAtendido = pacientes.shift();

    if (pacienteAtendido != undefined) {

        if (pacientes.length == 0) {
            alert(`Turno de: ${pacienteAtendido.nombreCompleto}. \n \n No hay mas pacientes en espera.`);
        } else {
            const proximoPaciente = pacientes[0];
            alert(`Turno de: ${pacienteAtendido.nombreCompleto} \nProximo turno: ${proximoPaciente.nombreCompleto}`);
        }

    } else {
        alert(`No hay pacientes en espera...`);
    }

}

let menu = parseInt(prompt("Elija una opcion: \n\n 1. Crear paciente. \n 2. Lista de espera. \n 3. Atender paciente. \n 4. Salir"));

while( menu !== 4){
    switch(menu){
        case 1:
            opcionCrearPaciente()
            break;

        case 2:
            opcionListarPacientes()
            break;
        
        case 3:
            opcionAtenderPaciente()
            break;
        
        default:
            alert(`Opcion incorrecta`)
    }
    menu = parseInt(prompt("Elija una opcion: \n\n 1. Crear paciente. \n 2. Lista de espera. \n 3. Atender paciente. \n 4. Salir"));
}

alert(`Gracias!`);


