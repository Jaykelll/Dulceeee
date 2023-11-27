import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import '../auth/login/css/style.css';
import '../auth/assets/css/main.css';

const CrearDulce = () => {
    const userId = localStorage.getItem("user");

    const alerta = (mensaje, tipo, titulo) => {
        swal({
            title: titulo,
            text: mensaje,
            icon: tipo,
            buttons: {
                confirm: {
                    text: "Aceptar",
                    value: true,
                    visible: true,
                    className: "btn btn-secondary",
                    closeModal: true
                }
            }
        });
    }

    const cerrarSesion = () => {
        localStorage.removeItem("user");
        // Luego, redirige a la página de inicio de sesión o a donde desees después de cerrar sesión
        window.location.href = "/";
    }

    const initialCliente = userId;

    const [dulce, setDulce] = useState({
        referencia: "",
        idUsuario: initialCliente,
        nombre: "",
        cantidad: "",
        precio: "",
        descripcion: "",
        region: "",
        categoria: "",
        imagen: "",
    });

    const onChangeRegion = (e) => {
        setDulce({
            ...dulce,
            region: e.target.value
        });
    }

    const onChangeCategoria = (e) => {
        setDulce({
            ...dulce,
            categoria: e.target.value
        });
    }

    const handleImagenChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setDulce({
                    ...dulce,
                    imagen: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const { referencia, nombre, cantidad, precio, descripcion, region, categoria } = dulce;

    const onChange = (e) => {
        setDulce({
            ...dulce,
            [e.target.name]: e.target.value
        });
    };

    const crearDulce = async () => {
        try {
            // Verifica si idUsuario está definido
            if (!userId) {
                console.error("Error: userId es null o no está presente.");
                // Puedes manejar esto de alguna manera, como mostrar un mensaje de error al usuario
                return;
            }

            // Imprime el ID del usuario y el cuerpo de la solicitud antes de la llamada
            console.log("userId:", userId);
            console.log("body:", dulce);

            const response = await APIInvoke.invokePOST("/dulces/new", dulce);
            const mensaje = response.msg;
            let msj, tipo, titulo;

            if (mensaje === "El dulce fue creado") {
                msj = "Dulce guardado correctamente";
                tipo = "success";
                titulo = "Proceso exitoso";
                alerta(msj, tipo, titulo);

                setDulce({
                    referencia: "",
                    nombre: "",
                    cantidad: "",
                    precio: "",
                    descripcion: "",
                    region:"",
                    categoria: "",
                    imagen:"",
                });
            } else if (mensaje === "El dulce ya existe") {
                msj = "Existe un dulce con la misma referencia";
                tipo = "error";
                titulo = "No se pudo guardar";
                alerta(msj, tipo, titulo);
            }
        } catch (error) {
            console.error("Error al crear el dulce:", error);
            // Muestra la ventana emergente con el mensaje de error
            alerta("Error al crear el dulce", "error", "¡Oops!");
        }
    };



    useEffect(() => {
        document.getElementById("referencia").focus();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await crearDulce();
    };

    return (
        <div>
            <header id="header" className="header d-flex align-items-center">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <Link to="/admin" className="logo d-flex align-items-center">
                        <h1>Mi Dulce Online<span>.</span></h1>
                    </Link>
                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><Link to="/crear">Agregar Dulce</Link></li>
                            <li><Link to={`/cliente/${userId}`}>Listar Dulces</Link></li>
                            <li><Link to="/catalogo">Catálogo de Dulces</Link></li>
                            <li><Link onClick={cerrarSesion}>Cerrar Sesión</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <center>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10">
                                <div className="login-wrap p-4 p-lg-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Inserta un dulce</h3>
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
                                                id="descripcion"
                                                placeholder="Descripcion"
                                                name="descripcion"
                                                value={descripcion}
                                                onChange={onChange}
                                                required
                                            />
                                            <label className="label" htmlFor="floatingInput">
                                                Descripcion
                                            </label>
                                        </div>
                                        <div className="form-group mb-3">
                                            <select className="form-select"
                                                value={region}
                                                onChange={onChangeRegion}
                                            >
                                                <option>Seleccionar Región</option>
                                                <option value="andina">Región Andina</option>
                                                <option value="caribe">Región Caribe</option>
                                                <option value="pacifica">Región Pacífica</option>
                                                <option value="amazonica">Región Amazónica</option>
                                                <option value="orinoquia">Región Orinoquía</option>
                                                <option value="insular">Región Insular</option>
                                            </select>
                                            <label className="label" htmlFor="floatingInput">
                                                Región
                                            </label>
                                        </div>
                                        <div className="form-group mb-3">
                                            <select className="form-select"
                                                value={categoria}
                                                onChange={onChangeCategoria}
                                            >
                                                <option>Seleccionar Categoría</option>
                                                <option value="caramelo">Caramelos</option>
                                                <option value="galletas">Galletas</option>
                                                <option value="gomitas">Gomitas</option>
                                                <option value="bebidas">Bebidas</option>
                                                <option value="postre">Postre</option>
                                            </select>
                                            <label className="label" htmlFor="floatingInput">
                                                Categoría
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
                                                Insertar Dulce
                                            </button>
                                            <Link to="/Home">Cancelar</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </center>
            <footer id="footer" className="footer">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-5 col-md-12 footer-info">
                            <a href="/admin" className="logo d-flex align-items-center">
                                <span>Mi Dulce Online</span>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>Contact Us</h4>
                            <p>
                                <strong>Teléfono:</strong> +57 3102276950<br />
                                <strong>Correo:</strong> midulceonline@outlook.com<br />
                            </p>
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

export default CrearDulce;
