const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'bg-red-700' : 'bg-indigo-700'} text-white text-center p-3 uppercase font-bold mb-3 rounded-md`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta