import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GetUsuario, PutUsuario } from '../services/UsuarioService';
import UsuarioForm from './UsuarioForm'

export default function UsuarioEdit() {

    const params = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState()

    useEffect(() => {
        const fetchUsuario = async () => {
            const response = await GetUsuario(params.id)
            if (response.ok) {
                const result = await response.json()
                setUsuario(result)
            } else {
                if (response.status === 404) {
                    alert("El usuario requerido no se encuentra en el registro.")
                }
                else{
                    alert("Ha ocurrido un error")
                }
                console.error(response)
                navigate("/")
            }
        }
        fetchUsuario();
    }, [params.id, navigate])

    const saveChanges = async (usuario) => {
        // Call PUT endpoint
        const response = await PutUsuario(params.id, usuario)
        if(response.ok){
            alert("Los datos se han guardado correctamente.")
            navigate("/");
        }else{
            if(response.status === 400){
                alert("Los datos ingresados estan erroneos")
            }
            else{
                console.error(response)
                alert("Ha ocurrido un error.")
                navigate("/");
            }
        }      
    }

    return (
        <div className='container-fluid'>
            <div className='row mt-4'>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Usuarios</Breadcrumb.Item>
                    <Breadcrumb.Item >
                        Editar
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{params.id}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <UsuarioForm model={usuario} saveChanges={saveChanges} />
        </div>
    )
}
