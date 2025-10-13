//Eventos
let botonEliminarHistorial = document.getElementById("btn-eliminar-historial");
botonEliminarHistorial.addEventListener("click", eliminarHistorial)

//Renderizado del local Storage
function renderizarHistorialPacientes(){
    const tablaHistorialCuerpo = document.getElementById("tabla-historial-body");
    tablaHistorialCuerpo.innerHTML = '';

    const listaPacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    
    const pacientesAtendidos = listaPacientes.filter((paciente) => paciente.atendido);

    if(pacientesAtendidos.length === 0){
        document.getElementById("tabla-historial").innerHTML = '<p class="mensaje-cola-vacia">Todavía no se atendieron pacientes.</p>';
        botonEliminarHistorial.style.display = "none";
    }
    
    pacientesAtendidos.forEach((paciente) => {
        const filaPaciente = document.createElement('tr');
        filaPaciente.innerHTML = `
        <td>
            <div style="max-width: 25vw; overflow-y: auto;">
                ${paciente.nombreCompleto}
            </div>
        </td>
        <td>${paciente.dni}</td>
        <td>
            <div style="max-width: 25vw; overflow-y: auto;">
                ${paciente.motivo}
            </div>
        </td>
        
        `;
        
        tablaHistorialCuerpo.appendChild(filaPaciente);
    });
}  

//eliminar Historial
function eliminarHistorial(){
    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const pacientesNoAtendidos = pacientes.filter((paciente) => !paciente.atendido);

    localStorage.setItem("pacientes", JSON.stringify(pacientesNoAtendidos));

    renderizarHistorialPacientes();
}


renderizarHistorialPacientes();