import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
function App() {
    const inicial = JSON.parse(localStorage.getItem('pacientes')) ?? [];
    const [pacientes, setPacientes] = useState(inicial); // Listado de los pacientes
    const [paciente, setPaciente] = useState({}); // cada uno de los pacientes es un objeto por eso es un objeto vacio, este es por un paciente 

    useEffect(() => {
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }, [pacientes])

    const eliminarPaciente = id => {
        const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
        setPacientes(pacientesActualizados)
    }

    return (
        <div className="container mx-auto mt-20">
            <Header/>
            <div className="mt-12 md:flex">
                <Formulario
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
                <ListadoPacientes
                    pacientes={pacientes}
                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}
                />
            </div>
        </div>
    )
}

export default App
