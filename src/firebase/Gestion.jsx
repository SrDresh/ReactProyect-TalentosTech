import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from
    "firebase/firestore";

const [productoAEditar, setProductoAEditar] = useState(null);
useEffect(() => {
    if (productoAEditar) {
        setDatosForm(productoAEditar);
    } else {
        setDatosForm(estadoInicialForm);
    }
}, [productoAEditar]);
const handleEditClick = (producto) => {
    setProductoAEditar(producto);
};
const manejarEnvio = async (e) => {
    e.preventDefault();
    let urlImagen = datosForm.imagen; // Mantenemos la imagen actual por
    defecto
    if (imagenFile) {
        const formData = new FormData();
        formData.append('image', imagenFile);
        const apiKey = '2f4f7b8785c73e336cbc36927f929a45'; //
        try {
            const response = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
            const data = await response.json();
            if (data.success) {
                urlImagen = data.data.url; // Obtenemos la nueva URL
            } else {
                throw new Error('La subida de la imagen falló.');
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá denuevo.");
return
        }
    }
    const productoFinal = { ...datosForm, imagen: urlImagen };
    try {
        if (productoAEditar) {
            const docRef = doc(db, "Productos nacionales",
                productoAEditar.id);
            // update
            await updateDoc(docRef, productoFinal);
            alert("Producto actualizado con éxito.");
        } else {
            // create

            await addDoc(collection(db, "Productos nacionales"),
                productoFinal);
            alert("Producto guardado con éxito.");
        }
        // ... (reseteo de formulario) ...
    } catch (error) {
        console.error("Error:", error);
    }

};

const cancelarEdicion = () => {
    setProductoAEditar(null);
};
{/* Podés ponerlo donde quieras. */ }
{
    productoAEditar && (
        <button onClick={cancelarEdicion}>
            Cancelar Edición
        </button>
    )
}
