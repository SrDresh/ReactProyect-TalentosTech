import { useState } from 'react'
import FormularioProducto from '../FormularioContainer/Form'

function FormContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    marca: '',
    imagen: null,
  })

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setDatosForm({
      ...datosForm,
      [name]: value,
    })
  }

  const manejarCambioImagen = (evento) => {
    setDatosForm({
      ...datosForm,
      imagen: evento.target.files[0],
    })
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    console.log('Producto solicitado:', datosForm)
    alert('Solicitud de producto enviada correctamente')
  }

  return (
    <section className="solicitud-producto">
      <h1 className="solicitud-producto__titulo">Solicitud de Producto</h1>

      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarCambioImagen={manejarCambioImagen}
        manejarEnvio={manejarEnvio}
      />
    </section>
  )
}

export default FormContainer