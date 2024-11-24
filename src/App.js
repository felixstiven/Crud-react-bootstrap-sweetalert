
import './App.css';
import {useState} from 'react';
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState();

  const [empleadosList,setEmpleados] = useState([]);
  
  
  const add = () => {
    Axios.post("http://localhost:3001/create", { // metodo utilzado en el back
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(()=>{ //luego de que se envie la peticion
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: " <h1>Registro exitoso!!</h1>",
        html: "el empleado <strong>"+nombre+"</strong> se ha agregado correctamente",
        icon: "succes",
        timer : 3000
      })
    }).catch(function(err){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logro agregar el empleado",
        footer: JSON.parse(JSON.stringify(err)).message==="Network Error" ? "Intenta mas tarde" : "Error en el servidor"
      });
    })
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", { // metodo utilzado en el back
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(()=>{ //luego de que se envie la peticion
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: " <h1>Actualizacion exitosa!!</h1>",
        html: "el empleado <strong>"+nombre+"</strong> fue actualizado correctamente",
        icon: "succes",
        timer : 4000
      })
    }).catch(function(err){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logro actualizar el empleado",
        footer: JSON.parse(JSON.stringify(err)).message==="Network Error" ? "intenta mas tarde" : JSON.parse(JSON.stringify(err)).message
      });
    })
  };

  const deleteEmpleados = (val) => {  
      Swal.fire({
        title: "Eliminar empleado?",
        html: "<i> ¿Estas seguro de eliminar al empleado <strong>"+val.nombre+"</strong>?</i>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{ //luego de que se envie la peticion
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Eliminado",
              text: `${val.nombre} fue eliminado`,
              icon: "success",
              timer : 3000
            });
          }).catch(function(err){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro eliminar el empleado!",
              footer: JSON.parse(JSON.stringify(err)).message==="Network Error" ? "intenta mas tarde" : JSON.parse(JSON.stringify(err)).message
            });
          })
        }
      })
  }
  
  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
    setEditar(false);
    
  }
  
  const editarEmpleado = (val) =>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }



  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }  
  
  return (


  <div className="container">
  
      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Nombre:</span>
            <input 
                onChange={(event)=> {
                  setNombre(event.target.value);
                }}
              type="text" className="form-control" placeholder='ingresa un nombre'  value={nombre} aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Edad:</span>
            <input 
                onChange={(event)=> {
                  setEdad(event.target.value);
                }}
              type="number" className="form-control" placeholder='ingresa una edad' value={edad} aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Pais:</span>
            <input 
                onChange={(event)=> {
                  setPais(event.target.value);
                }}
              type="text" className="form-control" placeholder='ingresa un pais' value={pais} aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">cargo:</span>
            <input 
                onChange={(event)=> {
                  setCargo(event.target.value);
                }}
              type="text" className="form-control"  placeholder='ingresa un cargo' value={cargo} aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Años de experiencia:</span>
            <input 
                onChange={(event)=> {
                  setAnios(event.target.value);
                }}
              type="number" className="form-control" placeholder='ingresa años' value={anios} aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar?
                <div>
                  <button  className="btn btn-info m-2" onClick={update}>Actualizar</button>
                  <button  className="btn btn-warning m-2" onClick={limpiarCampos}>Cancelar</button>
                </div>  
                  :<button  className="btn btn-primary" onClick={add}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {/* <button className='btn btn-success' onClick={getEmpleados}>Listar</button>  */}
            {
              empleadosList.map((val, key)=>{
                return  <tr key={val.id}>
                            <th >{val.id}</th>
                            <td>{val.nombre}</td>
                            <td>{val.edad}</td>
                            <td>{val.pais}</td>
                            <td>{val.cargo}</td>
                            <td>{val.anios}</td>
                            <td>
                              <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" className="btn btn-info"
                                  onClick={()=>{
                                      editarEmpleado(val);
                                  }}
                                >Editar</button>
                                <button type="button" onClick={()=>{
                                  deleteEmpleados(val);
                                }} className="btn btn-warning">Eliminar</button>
                              </div>
                            </td>
                        </tr>         
              })

            }
        </tbody>
      </table>
  </div>  
  );
}


export default App;
