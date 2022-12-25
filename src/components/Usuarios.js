import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DeleteUsuario, GetUsuarios } from '../services/UsuarioService';

export default function Usuarios() {

    const navigate = useNavigate();

    const [Usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios()
    }, [])

    const fetchUsuarios = async () => {
        const result = await GetUsuarios()
        setUsuarios(result)
    }

    const handleCreate = () => {
        navigate("create");
    }

    const handleEdit = (e, id) => {
        navigate("edit/" + id);
    }

    const handleDelete = async (e, id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('¿Seguro desea eliminar el registro?')) {
            const response = await DeleteUsuario(id)
            if (response.ok) {
                console.log(response)
                fetchUsuarios();
            }else{
                console.error(response)
                alert("Error al eliminar el registro.")
            }
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <h1>Mantenedor Usuarios</h1>
            </div>

            <div className='row'>
                <div className='col align-self-end'>
                    <Button onClick={handleCreate}>Agregar un nuevo usuario</Button>
                </div>
            </div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Rut</th>
                            <th>Correo</th>
                            <th>Fecha Nacimiento</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Usuarios.map(p => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.nombre}</td>
                                    <td>"{p.rut}"</td>
                                    <td>"{p.correo}"</td>
                                    <td>"{p.fechaNacimiento}"</td>
                                    <td>
                                        <Button variant="primary" onClick={(e) => handleEdit(e, p.id)}> Editar</Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={(e) => handleDelete(e, p.id)}> Eliminar</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}