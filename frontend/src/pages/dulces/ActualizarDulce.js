import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import APIInvoke from "../../utils/APIInvoke"; 
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const userId = localStorage.getItem("user");
const Actualizardulce = () => {
    const alerta = (mensaje, tipo, titulo) => {
        swal({
            title: titulo,
            text: mensaje,
            icon: tipo,
            buttons: {
                confirm: {
                    text: 'Aceptar',
                    value: true,
                    visible: true,
                    className: 'btn btn-secondary',
                    closeModal: true,
                },
            },
        });
    };

    const navegador = useNavigate();
    const { id } = useParams();

    const [dulce, setDulce] = useState({
        referencia: '',
        nombre: '',
        cantidad: '',
        precio: '',
        Descripcion: '',
        imagen: '', // Nueva propiedad para almacenar la URL de la imagen
    });

    const { referencia, nombre, cantidad, precio, Descripcion} = dulce;

    const cargarDatos = async () => {
        const response = await APIInvoke.invokeGET('/dulces/find/' + id);
        setDulce(response);
    };

    useEffect(() => {
        document.getElementById('referencia').focus();
        cargarDatos();
    }, []);

    const onChange = (e) => {
        setDulce({
            ...dulce,
            [e.target.name]: e.target.value,
        });
    };

    const handleImagenChange = (e) => {
        // Manejar la carga de la imagen
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setDulce({
                    ...dulce,
                    imagen: reader.result, // Almacenar la URL de la imagen
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const editardulce = async () => {
        const data = {
            referencia: dulce.referencia,
            nombre: dulce.nombre,
            cantidad: dulce.cantidad,
            precio: dulce.precio,
            Descripcion: dulce.Descripcion,
            imagen: dulce.imagen,
        };

        const response = await APIInvoke.invokePUT('/dulces/edit/' + id, data);
        let msj, tipo, titulo;

        if (response.mensaje === 'Se edito el dulce correctamente') {
            msj = 'No se pudo editar el dulce';
            tipo = 'error';
            titulo = 'Error en el proceso';
            alerta(msj, tipo, titulo);

            navegador(`/cliente/${userId}`);
        } else {
            msj = 'Dulce editado correctamente';
            tipo = 'success';
            titulo = 'Proceso exitoso';
            alerta(msj, tipo, titulo);

            navegador(`/cliente/${userId}`);
        }
    };

    const cerrarSesion = () => {
        
        localStorage.removeItem("user");

        // Luego, redirige a la página de inicio de sesión o a donde desees después de cerrar sesión
        window.location.href = "/";
    }
    const onSubmit = (e) => {
        e.preventDefault();
        editardulce();
    };

    return (
        <div>
            <header id="header" className="header d-flex align-items-center">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <Link to="/admin" className="logo d-flex align-items-center">
                        <h1>Mi Dulce Online<span>🍬</span></h1>
                    </Link>
                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><Link to="/crear">Agregar Dulce</Link></li>
                            <li><Link to={`/cliente/${userId}`}>Listar Dulces</Link></li>
                            <li><Link to="/catalogo">Catalogo de Dulces</Link></li>
                            <li><Link onClick={cerrarSesion}>Cerrar Sesión</Link></li>
                        </ul>
                    </nav>{/* .navbar */}
                </div>
            </header>
            <center> <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">

                            <div className="login-wrap p-4 p-lg-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Actualiza un dulce</h3>
                                    </div>
                                </div>
                                <form onSubmit={onSubmit} className="signin-form">
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="referencia"
                                            placeholder="Referencia"
                                            name="referencia"
                                            value={referencia}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="label" htmlFor="floatingInput">
                                            Referencia
                                        </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            placeholder="Nombre"
                                            name="nombre"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="label" htmlFor="floatingInput">
                                            Nombre
                                        </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="cantidad"
                                            placeholder="Cantidad"
                                            name="cantidad"
                                            value={cantidad}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="label" htmlFor="floatingInput">
                                            Cantidad
                                        </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="precio"
                                            placeholder="Precio"
                                            name="precio"
                                            value={precio}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="label" htmlFor="floatingInput">
                                            Precio
                                        </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Descripcion"
                                            placeholder="Descripcion"
                                            name="Descripcion"
                                            value={Descripcion}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="label" htmlFor="floatingInput">
                                            Descripcion
                                        </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="file"
                                            id="imagen"
                                            name="imagen"
                                            onChange={handleImagenChange}
                                        />
                                        <label className="label" htmlFor="floatingInput">
                                            Imagen
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary submit px-3">
                                            Actualizar Dulce
                                        </button>
                                        <Link to="/admin">Cancelar</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section></center>
            <footer id="footer" className="footer">
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-5 col-md-12 footer-info">
          <a href="/admin" className="logo d-flex align-items-center">
            <span>Mi Dulce Online</span>
          </a>
        </div>
        <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
        </div>
      </div>
    </div>
    <div className="container mt-4">
      <div className="copyright">
        © Copyright <strong><span>MiDulceOnline</span></strong>. Derechos Reservados
      </div>
    </div>
  </footer>
        </div>
    );
}

export default Actualizardulce; 