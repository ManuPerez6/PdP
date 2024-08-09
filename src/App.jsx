import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const App = () => {
  const [idEmpleado, setIdEmpleado] = useState();
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [localidad, setLocalidad] = useState("");
  const [cargo, setCargo] = useState("");
  const [sede, setSede] = useState("");
  const [años, setAños] = useState();
  const [empleadosList, setEmpleadosList] = useState([]);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getEmpleados();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3006/create", {
      nombre,
      edad,
      localidad,
      cargo,
      sede,
      años,
    }).then(() => {
      getEmpleados();
      Swal.fire({
        title: "<strong>Registrado con éxito!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue registrado en la empresa</i>",
        icon: 'success'
      });
      clearForm();
    });
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setIdEmpleado(val.idEmpleado);
    setNombre(val.nombre);
    setEdad(val.edad);
    setLocalidad(val.localidad);
    setCargo(val.cargo);
    setSede(val.sede);
    setAños(val.años);
  };

  const update = () => {
    Axios.put("http://localhost:3006/update", {
      idEmpleado,
      nombre,
      edad,
      localidad,
      cargo,
      sede,
      años,
    }).then(() => {
      getEmpleados();
      Swal.fire({
        title: "<strong>Actualizado con éxito!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado.</i>",
        icon: 'success'
      });
      setEditar(false);
      clearForm();
    });
  };

  const deleteEmpleado = (val) => {
    Swal.fire({
      title: "¿Eliminar empleado?",
      html: "<i>¿Desea eliminar al empleado " + val.nombre + "?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3006/delete/${val.idEmpleado}`).then(() => {
          getEmpleados();
          Swal.fire({
            title: "Empleado eliminado.",
            text: "El empleado " + val.nombre + " ha sido eliminado",
            icon: "success"
          });
        });
      }
    });
  };

  const clearForm = () => {
    setNombre("");
    setEdad(undefined);
    setLocalidad("");
    setCargo("");
    setSede("");
    setAños(undefined);
    setEditar(false);
    setIdEmpleado(undefined);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3006/Empleados").then((response) => {
      setEmpleadosList(response.data);
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registro de Empleados</h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={edad || ""}
            onChange={(e) => setEdad(e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Edad"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            placeholder="Localidad"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Cargo"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            placeholder="Sede"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={años || ""}
            onChange={(e) => setAños(e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Años"
          />
        </div>
        <div className="card-footer text-muted">
          {
            editar ?
              <div>
                <button type="button" className="btn btn-warning m-2" onClick={update}>Actualizar</button>
                <button type="button" className="btn btn-info m-2" onClick={clearForm}>Cancelar</button>
              </div>
              : <button type="button" className="btn btn-success" onClick={add}>Registrar</button>
          }
        </div>
      </form>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Localidad</th>
            <th>Cargo</th>
            <th>Sede</th>
            <th>Años</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val) => (
            <tr key={val.idEmpleado}>
              <td>#{val.idEmpleado}</td>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.localidad}</td>
              <td>{val.cargo}</td>
              <td>{val.sede}</td>
              <td>{val.años}</td>
              <td className="btn btn-group">
                <button
                  className="btn btn-warning px-3"
                  onClick={() => editarEmpleado(val)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger px-3"
                  onClick={() => deleteEmpleado(val)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;