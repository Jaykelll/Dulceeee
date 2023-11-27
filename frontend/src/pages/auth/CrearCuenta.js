import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const CrearCuenta = () => {
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
    };

    const [usuario, setUsuario] = useState({
        idRol: "655a590e6d60ee6e6679f989",
        nombre: "",
        apellido: "",
        email: "",
        contra: ""
    });

    const { nombre, apellido, email, contra } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, []);

    const crearCuenta = async () => {
        // Validar longitud de la contraseña
        if (usuario.contra.length < 6) {
            alerta("La contraseña debe tener al menos 6 caracteres", "error", "Error al crear el usuario");
            return;
        }

        // Validar letras mayúsculas en la contraseña
        const mayusculas = usuario.contra.match(/[A-Z]/g);
        if (!mayusculas || mayusculas.length < 2) {
            alerta("La contraseña debe tener al menos dos letras mayúsculas", "error", "Error al crear el usuario");
            return;
        }

        // Resto del código...
        const data = {
            idRol: usuario.idRol,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            contra: usuario.contra
        };

        const response = await APIInvoke.invokePOST("/usuarios/new", data);

        const respuesta = response.mensaje;
        let titulo, msg, tipo;
        if (respuesta === "Usuario Existente") {
            titulo = "Error al crear el usuario";
            msg = "El usuario ya existe";
            tipo = "error";
            alerta(msg, tipo, titulo);
        } else if (respuesta === "Usuario Creado") {
            titulo = "Proceso Exitoso!";
            msg = "Usuario Creado correctamente";
            tipo = "success";
            alerta(msg, tipo, titulo);
        }

        setUsuario({
            idRol: "655a590e6d60ee6e6679f989",
            nombre: "",
            apellido: "",
            email: "",
            contra: ""
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    };

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                <div className="text w-100">
                                    <h2>Bienvenido a Mi Dulce Online</h2>
                                    <p>¿Ya tienes una cuenta?</p>
                                    <Link to="/login" className="btn btn-white btn-outline-white">
                                        Inicia Sesion
                                    </Link>
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-lg-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Registrate</h3>
                                    </div>
                                </div>
                                <form onSubmit={onSubmit} className="signin-form">
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="floatingInput">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            placeholder="Nombre"
                                            name="nombre"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                            autoComplete="off"
                                            autoCapitalize="none"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="floatingInput">
                                            Apellido
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="apellido"
                                            placeholder="Apellido"
                                            name="apellido"
                                            value={apellido}
                                            onChange={onChange}
                                            required
                                            autoComplete="off"
                                            autoCapitalize="none"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="floatingInput">
                                            Correo
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Correo"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            required
                                            autoComplete="off"
                                            autoCapitalize="none"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="floatingInput">
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="contra"
                                            placeholder="Contraseña"
                                            name="contra"
                                            value={contra}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="form-control btn btn-primary submit px-3"
                                        >
                                            Registrarse
                                        </button>
                                        <Link to="/">Cancelar</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CrearCuenta;
