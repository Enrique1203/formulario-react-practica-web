// src/App.js (Versión final con validaciones)
import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-header text-center">
                <h2 className="mb-0">Formulario de Registro</h2>
              </div>
              <div className="card-body">
                <FormularioRegistro />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente del formulario con validaciones dinámicas
function FormularioRegistro() {
  // useState para controlar inputs
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const [errores, setErrores] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  // Función para validar correo con formato
  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Función para validar contraseña con 8+ caracteres
  const validarContrasena = (contrasena) => {
    return contrasena.length >= 8;
  };

  // Función para manejar cambios en los inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    
    // Actualizar el estado del formulario
    setFormData({
      ...formData,
      [name]: value
    });

    // Validaciones en tiempo real
    let nuevosErrores = { ...errores };

    switch (name) {
      case 'nombre':
        nuevosErrores.nombre = value.trim() === '' ? 'El nombre es requerido' : '';
        break;
      case 'correo':
        if (value === '') {
          nuevosErrores.correo = 'El correo es requerido';
        } else if (!validarCorreo(value)) {
          nuevosErrores.correo = 'El formato del correo no es válido';
        } else {
          nuevosErrores.correo = '';
        }
        break;
      case 'contrasena':
        if (value === '') {
          nuevosErrores.contrasena = 'La contraseña es requerida';
        } else if (!validarContrasena(value)) {
          nuevosErrores.contrasena = 'La contraseña debe tener al menos 8 caracteres';
        } else {
          nuevosErrores.contrasena = '';
        }
        break;
      default:
        break;
    }

    setErrores(nuevosErrores);
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Verificar que no hay errores
    const hayErrores = Object.values(errores).some(error => error !== '');
    const camposVacios = Object.values(formData).some(campo => campo.trim() === '');
    
    if (!hayErrores && !camposVacios) {
      alert('Formulario enviado correctamente!');
      console.log('Datos del formulario:', formData);
    } else {
      alert('Por favor, corrija los errores en el formulario');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre:</label>
        <input 
          type="text" 
          className={`form-control ${errores.nombre ? 'is-invalid' : formData.nombre ? 'is-valid' : ''}`}
          id="nombre" 
          name="nombre"
          value={formData.nombre}
          onChange={manejarCambio}
          placeholder="Ingrese su nombre"
        />
        {/* Mensaje de error dinámico para nombre */}
        {errores.nombre && (
          <div className="invalid-feedback">
            {errores.nombre}
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <label htmlFor="correo" className="form-label">Correo:</label>
        <input 
          type="email" 
          className={`form-control ${errores.correo ? 'is-invalid' : formData.correo && validarCorreo(formData.correo) ? 'is-valid' : ''}`}
          id="correo" 
          name="correo"
          value={formData.correo}
          onChange={manejarCambio}
          placeholder="Ingrese su correo electrónico"
        />
        {/* Mensaje de error dinámico para correo */}
        {errores.correo && (
          <div className="invalid-feedback">
            {errores.correo}
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <label htmlFor="contrasena" className="form-label">Contraseña:</label>
        <input 
          type="password" 
          className={`form-control ${errores.contrasena ? 'is-invalid' : formData.contrasena && validarContrasena(formData.contrasena) ? 'is-valid' : ''}`}
          id="contrasena" 
          name="contrasena"
          value={formData.contrasena}
          onChange={manejarCambio}
          placeholder="Ingrese su contraseña"
        />
        {/* Mensaje de error dinámico para contraseña */}
        {errores.contrasena && (
          <div className="invalid-feedback">
            {errores.contrasena}
          </div>
        )}
      </div>
      
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </div>
    </form>
  );
}

export default App;