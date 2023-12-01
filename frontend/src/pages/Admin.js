import React from "react";
import { Link } from "react-router-dom";
import './auth/assets/css/main.css'


const Admin = () => {
    const nombre = localStorage.getItem("nombre");
    const idUsuario = localStorage.getItem("user");
    if (idUsuario === null) {
        window.location.href = "/";
    }
    const userId = localStorage.getItem("user");
    return (
<div>
    
  <div>
    <header id="header" className="header d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link to="/admin" className="logo d-flex align-items-center">
          <h1>Mi Dulce Online<span>🍬</span></h1>
        </Link>
        <nav id="navbar" className="navbar">
          <ul>
            <li><Link to="/">Cerrar Sesion</Link></li>
          </ul>
        </nav>{/* .navbar */}
      </div>
    </header>{/* End Header */}
    {/* End Header */}
    {/* ======= Hero Section ======= */}
    <section id="hero" className="hero">
      <div className="container position-relative">
        <div className="row gy-5" data-aos="fade-in">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
            <h2>Bienvenido {nombre}</h2>
          </div>
        </div>
      </div>
      <div className="icon-boxes position-relative">
        <div className="container position-relative">
          <div className="row gy-4 mt-5">
            <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay={100}>

            <Link to="/crear">
  <button type="submit" className="form-control btn btn-primary submit px-3" style={{backgroundColor: 'purple'}}>
    Presiona aqui para vender tus dulces 😊😊
  </button>
</Link>
            </div>{/*End Icon Box */}
            <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay={200}>
            <Link to="/crear">
  <button type="submit" className="form-control btn btn-primary submit px-3" style={{backgroundColor: 'purple'}}>
    Da click para ver los productos que vendes 🍭
  </button>
</Link>
            </div>{/*End Icon Box */}
            <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay={200}>
            <Link to={'/catalogo'}>
  <button type="submit" className="form-control btn btn-primary submit px-3" style={{backgroundColor: 'purple'}}>
    Observa tu catalogo de dulces 🍬
  </button>
</Link>
            </div>{/*End Icon Box */}

          </div>
        </div>
      </div>
    </section></div>
  {/* End Hero Section */}

 
</div>

    );
}

export default Admin; 