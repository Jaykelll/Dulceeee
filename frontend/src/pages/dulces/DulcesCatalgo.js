import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const DulcesCatalogo = () => {
    const navigate = useNavigate();

    const redirigirARegistro = () => {
        navigate("/registrar");
    };

    const compraExitosa = () => {
        swal({
            title: "Compra",
            text: "Se realizó la compra de forma exitosa",
            icon: "success",
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
    const userId = localStorage.getItem("user");
    const [dulces, setDulces] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [regiones, setRegiones] = useState([]);
    const [filtroRegion, setFiltroRegion] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");

    const cargarDulces = async () => {
        const response = await APIInvoke.invokeGET("/dulces/list");
        setDulces(response);
    };

    const cargarCategorias = async () => {
        const response = await APIInvoke.invokeGET("/dulces/categoria");
        setCategorias(response);
    };

    const cargarRegiones = async () => {
        const response = await APIInvoke.invokeGET("/dulces/regiones");
        setRegiones(response);
    };

    const filtrarDulcesPorCategoria = async () => {
        const response = await APIInvoke.invokeGET(`/dulces/list?categoria=${filtroCategoria}`);
        setDulces(response);
    };

    const filtrarDulcesPorRegion = async () => {
        const response = await APIInvoke.invokeGET(`/dulces/list?region=${filtroRegion}`);
        setDulces(response);
    };
    const cerrarSesion = () => {
        
        localStorage.removeItem("user");

        // Luego, redirige a la página de inicio de sesión o a donde desees después de cerrar sesión
        window.location.href = "/";
    }

    useEffect(() => {
        cargarDulces();
        cargarCategorias();
        cargarRegiones();
    }, []);
    return (
        <div>
             <header id="header" className="header d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <h1>Mi Dulce Online<span>🍬</span></h1>
        </Link>
        <nav id="navbar" className="navbar">
        <ul>
            <li><Link to="/crear">Agregar Dulce</Link></li>
            <li><Link to={`/cliente/${userId}`}>Listar Dulces</Link></li>
            <li><Link to="/catalogo">Catalogo de dulces</Link></li>
            <li><Link onClick={cerrarSesion}>Cerrar Sesión</Link></li>
        </ul>
        </nav>{/* .navbar */}
      </div>
    </header>
            <main>
            <section className="py-3 text-center container">
                    <div className="row py-lg-3">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Catálogo de dulces disponibles</h1>
                            <select
                                className="form-select"
                                value={filtroRegion}
                                onChange={(e) => setFiltroRegion(e.target.value)}
                            >
                                <option>Seleccionar Region</option>
                                <option value="andina">Region Andina</option>
                                <option value="caribe">Region Caribe</option>
                                <option value="pacifica">Region Pacifica</option>
                                <option value="amazonica">Region Amazonica</option>
                                <option value="orinoquia">Region Orinoquia</option>
                                <option value="insular">Region Insular</option>
                                {regiones.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="btn btn-primary mt-2"
                                onClick={filtrarDulcesPorRegion}
                            >
                                Filtrar por Región
                            </button>
                            <select
                                className="form-select"
                                value={filtroCategoria}
                                onChange={(e) => setFiltroCategoria(e.target.value)}
                            >
                                <option>Seleccionar Categoría</option>
                                <option value="caramelo">Caramelos</option>
                                <option value="galletas">Galletas</option>
                                <option value="gomitas">Gomitas</option>
                                <option value="bebidas">Bebidas</option>
                                <option value="postre">Postre</option>
                                {categorias.map((categoria) => (
                                <option key={categoria} value={categoria}>
                                {categoria}
                                </option>
                                ))}
                            </select>
                            <button
                                className="btn btn-primary mt-2"
                                onClick={filtrarDulcesPorCategoria}
                            >
                            Filtrar por Categoría
                            </button>
                        </div>
                        
                    </div>
                </section>

                <div class="album py-5 bg-light">
                    <div class="container">

                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                            {dulces.map(
                                item =>
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <div>
                                                <img src={item.imagen} className="bd-placeholder-img card-img-top" width="100%" height={225} role="img" aria-label="Placeholder: Thumbnail" preserveaspectratio="xMidYMid slice" focusable="false" />
                                            </div>


                                            <div class="card-body">
                                                <p class="card-text">{item.nombre}</p>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="btn-group">
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={(e) => compraExitosa()}
                                                    >
                                                        Comprar
                                                    </button>
                                                    </div>
                                                    <small class="text-muted">Precio ${item.precio}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
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
export default DulcesCatalogo;