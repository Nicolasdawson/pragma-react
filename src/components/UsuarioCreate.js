import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { PostUsuario } from '../services/UsuarioService';
import UsuarioForm from './UsuarioForm'

export default function UsuarioCreate() {

    const navigate = useNavigate();

    const saveChanges = async (usuario) => {
        const response = await PostUsuario(usuario)
        if(response.ok){
            alert("Los datos se han guardado correctamente.")
            navigate("/");
        }else{
            if(response.status === 400){
                alert("Los datos ingresados estan erroneos")
                console.log(response)
            }
            else{
                console.error(response)
                alert("Ha ocurrido un error.")
                navigate("/");
            }
        }    
    }

    let  model = {
        nombre: '',
        rut: '',
        correo: '',
        fechaNacimiento: ''
    }

  return (
    <div className='container-fluid'>
            <div className='row mt-4'>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to:"/"}}>Usuarios</Breadcrumb.Item>
                    <Breadcrumb.Item >
                        Crear
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <UsuarioForm model={model} saveChanges={saveChanges}/>
        </div>
  )
}
