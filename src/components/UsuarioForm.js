import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Validator from '../utilities/validation';
export default function UsuarioForm(props) {

    const navigate = useNavigate()

    let model;
    if (!props.model) {
       model = {
            nombre: '',
            rut: '',
            correo: '',
            fechaNacimiento: ''
        }
    }
    else{
        model = props.model
    }
    
    const [usuario, setUsuario] = useState(model);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setUsuario(model)
    },[model])
    
    const validateModel = (model) => {

        let errors = {};

        if(Validator.isNotValidRut(model.rut)){
            errors.rut = "Rut invalido"
        }
        if(Validator.isNotValidcorreo(model.correo)){
            errors.correo = "Correo inválido"
        }

        if(Validator.isNullOrEmptyString(model.nombre)){
            errors.nombre = "El campo Nombre es requerido"
        }

        setErrors(errors);

        if(Object.keys(errors).length > 0){
            return false;
        }
        return true
    }

    const handleSaveChanges = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(validateModel(usuario)){
            props.saveChanges(usuario);
        }     
    }

    const handleCancel = (e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate("/")
    }

    const onChange = (e) => {
        let model = { ...usuario }
        model[e.target.name] = e.target.value
        setUsuario(model)
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().split("T")[0]
    }

    return (
        <div className='container-fluid'>
            {
            Object.keys(errors).length > 0 && 
            <Alert variant="danger">{Object.keys(errors).map(e => <p>{errors[e]}</p>)}</Alert>
            }
            <Form>
                <FormGroup>
                    <div className='row'>
                        <Form.Label htmlFor='rut'>Rut</Form.Label>
                        <Form.Control id='rut' name="rut" placeholder="11.111.111-1" onChange={(e) => onChange(e)} value={usuario.rut} isInvalid={errors.rut} />
                    </div>
                    <div className='row'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control id="nombre" name="nombre" placeholder="nombre" onChange={(e) => onChange(e)} value={usuario.nombre} isInvalid={errors.nombre}/>
                    </div>
                    <div className='row'>
                        <Form.Label>Correo</Form.Label>
                        <Form.Control id="correo" name="correo" type="correo" placeholder="correo@correo.cl" onChange={(e) => onChange(e)} value={usuario.correo} isInvalid={errors.correo}/>
                    </div>
                    <div className='row'>
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control id="fechaNacimiento" name="fechaNacimiento" type="date" placeholder="01-01-1980" onChange={(e) => onChange(e)} value={usuario.fechaNacimiento ? formatDate(usuario.fechaNacimiento): ''} />
                    </div>
                </FormGroup>
                <div className='row mt-4 justify-content-end'>
                    <div className='col-auto'>
                        <Button variant="primary" type="submit" onClick={(e) => handleSaveChanges(e)}> Guardar cambios </Button>
                    </div>
                    <div className='col-auto'>
                        <Button variant="danger" onClick={(e) => handleCancel(e)}> Cancelar </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}
