import { useState, useEffect } from "react";
import Alerta from "./Alerta";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [ alerta, setAlerta ] = useState({})

    useEffect( () => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente]) 

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log('Hay almenos un campo vacio');
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return;
        }

        // Objeto de paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if (paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
            setPaciente({})
            setAlerta({
                msg: 'Actualizado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } else {
            // Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
            setAlerta({
                msg: 'Registrado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }

        

        // Reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }
    const { msg } = alerta
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">Añade pacientes y {''} <span className="text-indigo-600 font-bold">administralos</span></p>
            <form action="" className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
                {msg && <Alerta alerta={alerta} />}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre mascota</label>
                    <input type="text" name="mascota" placeholder="Nombre de la mascota" id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange = {(e) => setNombre(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre propietario</label>
                    <input type="text" name="propietario" placeholder="Nombre del propietario" id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange = {(e) => setPropietario(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input type="text" name="email" placeholder="Email contacto propietario" id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange = {(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input type="date" name="alta" id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange = {(e) => setFecha(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea name="sintomas" id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los síntomas" value={sintomas} onChange = {(e) => setSintomas(e.target.value)}></textarea>
                </div>
                <input type="submit" value={paciente.id ? 'Editar paciente' : 'Agregar paciente'} className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md"/>
            </form>
        </div>
    )
}

export default Formulario
