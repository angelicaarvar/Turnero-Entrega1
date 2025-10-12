

function renderizarHistorialPacientes(){
    const tablaHistorialCuerpo = document.getElementById("tabla-historial-body");
    tablaHistorialCuerpo.innerHTML = '';

    const listaPacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    
    const pacientesAtendidos = listaPacientes.filter((paciente) => paciente.atendido);

    if(pacientesAtendidos.length === 0){
        document.getElementById("tabla-historial").innerHTML = '<p class="mensaje-cola-vacia">Todavía no se atendieron pacientes.</p>';
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


renderizarHistorialPacientes();