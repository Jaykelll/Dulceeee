import React from "react";
import { useEffect, useState } from "react";
import APIInvoke from "../../utils/APIInvoke";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { confirm } from "react-confirm-box";

const Listadulces = () => {

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

    const [dulces, setdulces] = useState([]);

    const cargardulces = async () => {
        const response = await APIInvoke.invokeGET("/dulces/list");
        console.log(response);
        setdulces(response);
    }

    useEffect(() => {
        cargardulces();
    }, [])
    
    
    const eliminarVehiculo = async (e, id) => {
        e.preventDefault();

        const confirmar = await confirm("¿Desea eliminar este registro?");
        let msj, titulo, tipo;

        if (confirmar) {
            const response = await APIInvoke.invokeDELETE("/dulces/delete/" + id);
            console.log(response.mensaje);

            msj = "Dulce eliminado correctamente";
            tipo = "success";
            titulo = "Proceso exitoso";
            alerta(msj, tipo, titulo);

            cargardulces();
        } else {
            msj = "No se ha eliminado el dulce";
            tipo = "warning";
            titulo = "Advertencia";
            alerta(msj, tipo, titulo);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    }

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
                            <li><Link to="/list">Listar Dulce</Link></li>
                            <li><Link to="/catalogo">Catalogo de dulces</Link></li>
                            <li><Link to="/">Cerrar Sesion</Link></li>
                        </ul>
                    </nav>{/* .navbar */}
                </div>
            </header>
            <div className="container">
                <main className="flex-shrink-0">
                    <div className="container">
                        <br></br>
                        <h2 className="mt-5">Lista de dulces</h2>
                        <form onSubmit={onSubmit}><br></br>
                            <div className="row">
                            </div>
                        </form>
                        <div className="row mt-5">
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Referencia</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Descripcion</th>
                                        <th scope="col">Region</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Imagen</th>
                                        <th> Acciones </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dulces.map(
                                            item =>
                                                <tr>
                                                    <th scope="row">{item._id}</th>
                                                    <td>{item.referencia}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.precio}</td>
                                                    <td>{item.Descripcion}</td>
                                                    <td>{item.region}</td>
                                                    <td>{item.categoria}</td>
                                                    <td>{<img src={item.imagen} width={"170px"} height={"170px"}></img>}</td>
                                                    <td>
                                                        <Link class="btn btn-outline-success mx-3"
                                                            to={`/actualizar/${item._id}`} >
                                                            Actualizar
                                                        </Link>
                                                        <button
                                                            class="btn btn-outline-secondary"
                                                            onClick={(e) => eliminarVehiculo(e, item._id)}>
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
    </div>
    );
}

export default Listadulces; 