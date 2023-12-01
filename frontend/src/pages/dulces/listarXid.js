import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import { confirm } from "react-confirm-box";
import mongoose from 'mongoose';

const ListadulcesId = () => {
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
          closeModal: true,
        },
      },
    });
  };

  const cerrarSesion = () => {
        
    localStorage.removeItem("user");

    // Luego, redirige a la página de inicio de sesión o a donde desees después de cerrar sesión
    window.location.href = "/";
}

  const [dulces, setDulces] = useState([]);
  const userId = localStorage.getItem("user");
  const cargarDulces = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/dulces/cliente/${userId}`);
      console.log(response);
      setDulces(response);
    } catch (error) {
      console.error("Error al obtener la lista de dulces:", error);
    }
  };

  useEffect(() => {
    cargarDulces();
  }, []);

  const eliminarDulce = async (e, id) => {
    e.preventDefault();

    const confirmar = await confirm("¿Desea eliminar este dulce?");
    let msj, titulo, tipo;

    if (confirmar) {
      try {
        const response = await APIInvoke.invokeDELETE(`/dulces/delete/${id}`);
        console.log(response.mensaje);

        msj = "Dulce eliminado correctamente";
        tipo = "success";
        titulo = "Proceso exitoso";
        alerta(msj, tipo, titulo);

        cargarDulces();
      } catch (error) {
        console.error("Error al eliminar el dulce:", error);
      }
    } else {
      msj = "No se ha eliminado el dulce";
      tipo = "warning";
      titulo = "Advertencia";
      alerta(msj, tipo, titulo);
    }
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
              <li>
                <Link to="/crear">Agregar Dulce</Link>
              </li>
              <li>
                <Link to="/catalogo">Catálogo de dulces</Link>
              </li>
              <li><Link onClick={cerrarSesion}>Cerrar Sesión</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container">
        <main className="flex-shrink-0">
          <div className="container">
            <div className="row mt-5">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Referencia</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Región</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Imagen</th>
                    <th> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(dulces) && dulces.length > 0 ? (
                    dulces.map((item) => (
                      <tr key={item._id}>
                        <th scope="row">{item._id}</th>
                        <td>{item.referencia}</td>
                        <td>{item.nombre}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.precio}</td>
                        <td>{item.Descripcion || item.descripcion}</td>
                        <td>{item.region}</td>
                        <td>{item.categoria}</td>
                        <td>
                          {
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              width={"170px"}
                              height={"170px"}
                            ></img>
                          }
                        </td>
                        <td>
                          <Link
                            className="btn btn-danger mx-3" 
                            to={`/actualizar/${item._id}`}
                          >
                            Actualizar
                          </Link>
                          <button
                            className="btn bg-white"
                            onClick={(e) => eliminarDulce(e, item._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">No hay dulces disponibles.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListadulcesId;
