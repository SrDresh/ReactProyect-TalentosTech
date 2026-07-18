import { useEffect, useState } from 'react';
import FormularioProducto from './FormularioProducto';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const estadoInicialForm = {
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen: '',
};

function FormularioContainer() {
    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [imagenFile, setImagenFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);

    const cargarProductos = async () => {
        const productosRef = collection(db, 'productos');
        const respuesta = await getDocs(productosRef);
        setProductos(respuesta.docs.map((item) => ({ ...item.data(), id: item.id })));
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    useEffect(() => {
        if (productoAEditar) {
            setDatosForm({ ...estadoInicialForm, ...productoAEditar });
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productoAEditar]);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const subirImagen = async () => {
        if (!imagenFile) {
            return datosForm.imagen || '';
        }

        const apiKey = '1ac81cf4c3348932a5148cdffe3dfaee';
        const formData = new FormData();
        formData.append('image', imagenFile);

        const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });

        const datosImgbb = await respuestaImgbb.json();
        if (!datosImgbb.success) {
            throw new Error('La subida de la imagen a Imgbb falló.');
        }

        return datosImgbb.data.url;
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        setLoading(true);

        try {
            const urlImagen = await subirImagen();
            const productoCompleto = {
                ...datosForm,
                nombre: datosForm.nombre.trim(),
                categoria: datosForm.categoria.trim(),
                precio: Number(datosForm.precio) || 0,
                stock: Number(datosForm.stock) || 0,
                descripcion: datosForm.descripcion.trim(),
                imagen: urlImagen,
            };

            if (productoAEditar) {
                const productoRef = doc(db, 'productos', productoAEditar.id);
                await updateDoc(productoRef, productoCompleto);
                alert('Producto actualizado correctamente.');
            } else {
                await addDoc(collection(db, 'productos'), productoCompleto);
                alert('Producto agregado correctamente.');
            }

            setDatosForm(estadoInicialForm);
            setProductoAEditar(null);
            setImagenFile(null);
            evento.currentTarget.reset();
            await cargarProductos();
        } catch (error) {
            console.error('Error en el proceso de envío:', error);
            alert('Hubo un error al guardar el producto. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmacion = window.confirm('¿Desea eliminar este producto?');
        if (!confirmacion) {
            return;
        }

        await deleteDoc(doc(db, 'productos', id));
        await cargarProductos();
    };

    const handleEdit = (producto) => {
        setProductoAEditar(producto);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setProductoAEditar(null);
        setDatosForm(estadoInicialForm);
        setImagenFile(null);
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            loading={loading}
            productos={productos}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            productoAEditar={productoAEditar}
            cancelarEdicion={cancelarEdicion}
        />
    );
}

export default FormularioContainer;