import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Checkbox, Container, Form, Grid, Header, Message, Modal, Select } from 'semantic-ui-react';
import * as actions from '../../store/actions';
import SemanticField from '../../helpers/hoc/SemanticField';


function NewTravel(props) {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalPerson, setModalPerson] = useState(false)
    const [worker, setWorker] = useState({
        firstName: '',
        lastName: ''
    })

    const formSubmittedHandler = values => {
        if (values.workers.length <= 0) {
            alert('Por favor agregue trabajadores')
            return
        }
        props.onRegisterTravel(values)
        props.history.redirect('/')
    }

    const modalPeopleHandler = e => {
        e.preventDefault()
        setModalPerson(!modalPerson)
    }

    useEffect(() => {
        console.log('[NewTravel] loaded!')
        props.onFetchVehicles()
        initialWorkers.splice(0, initialWorkers.length) // reset workers list
    }, [])

    return (
        <Container fluid>
            <Grid columns={1}>
                <Grid.Row centered>
                    <Grid.Column width={6}>
                        <Header as='h2' textAlign='center'>Registra un nuevo viaje</Header>
                        <Formik 
                            validationSchema={schemaValidation} 
                            initialValues={{
                                startPoint: '',
                                finalPoint: '',
                                vehicleLabel: '',
                                kilometers: '',
                                workers: initialWorkers,
                                roundTrip: false
                            }} 
                            onSubmit={formSubmittedHandler}>
                            {({
                                handleSubmit, handleChange, handleBlur, setFieldValue,
                                values, touched, isValid, errors
                            }) => {
                                return (
                                    <Form 
                                        error={error} 
                                        loading={loading} 
                                        onSubmit={handleSubmit}>
                                        {
                                            error 
                                                ? <Message error header='Ocurrió un error inesperado' content={error} />
                                                : null
                                        }
                                        <Form.Field>
                                            Punto de inicio
                                            <Form.Input 
                                                name='startPoint' value={values.startPoint} onChange={handleChange}
                                                error={touched.startPoint && errors.startPoint} autoComplete='off' />
                                        </Form.Field>
                                        <Form.Field>
                                            Punto de termino
                                            <Form.Input 
                                                name='finalPoint' value={values.finalPoint} onChange={handleChange}
                                                error={touched.finalPoint && errors.finalPoint} autoComplete='off' />
                                        </Form.Field>
                                        <Form.Field>
                                            Medio de transporte
                                            <Form.Select 
                                                control={Select} options={
                                                    props.vehicles && props.vehicles.map(item => 
                                                        ({ key: item._id, value: item.label, text: item.name }))
                                                } 
                                                placeholder='Seleccione un vehiculo' 
                                                name='vehicleLabel' value={values.vehicleLabel} onChange={(e, { value }) => setFieldValue('vehicleLabel', value)}
                                                error={touched.vehicleLabel && errors.vehicleLabel} />
                                        </Form.Field>
                                        <Form.Field>
                                            Kilometros recorridos
                                            <Form.Input 
                                                name='kilometers' value={values.kilometers} onChange={handleChange}
                                                error={touched.kilometers && errors.kilometers} autoComplete='off' />
                                        </Form.Field>
                                        <Form.Field>
                                            <SemanticField
                                                name='roundTrip'
                                                label='¿Ida y vuelta?'
                                                onChange={handleChange}
                                                checked={values.roundTrip}
                                                WrappedCmp={Checkbox} />
                                        </Form.Field>
                                        <Container textAlign='center'>
                                            <Modal 
                                                open={modalPerson} 
                                                trigger={<Button size='large' onClick={modalPeopleHandler}>Añadir trabajadores</Button>}
                                                onClose={() => setModalPerson(!modalPerson)} size='tiny'>
                                                <Modal.Header>Añadir trabajadores al viaje</Modal.Header>
                                                <Modal.Content>
                                                    <Form.Field>
                                                        Nombre
                                                        <Form.Input 
                                                            name='firstNameWorker' value={worker.firstName} onChange={(e) => setWorker({
                                                                ...worker,
                                                                firstName: e.target.value
                                                            })} autoComplete='off' />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        Apellido
                                                        <Form.Input 
                                                            name='lastNameWorker' value={worker.lastName} onChange={(e) => setWorker({
                                                                ...worker,
                                                                lastName: e.target.value
                                                            })} autoComplete='off' />
                                                    </Form.Field>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button 
                                                        content='Guardar' labelPosition='right' 
                                                        onClick={() => {
                                                            if (worker.firstName && worker.lastName) {
                                                                initialWorkers.push({
                                                                    firstName: worker.firstName,
                                                                    lastName: worker.lastName
                                                                })
                                                                setFieldValue('workers', initialWorkers)
                                                                setWorker({
                                                                    firstName: '',
                                                                    lastName: ''
                                                                })
                                                            }
                                                            setModalPerson(!modalPerson)
                                                        }}
                                                        icon='checkmark' positive />
                                                </Modal.Actions>
                                            </Modal>
                                            <Button primary size='large' type='submit'>Registrar</Button>
                                        </Container>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6}>
                        {initialWorkers.length > 0 ? <h4>Trabajadores añadidos:</h4> : null}
                        <ul>
                        {initialWorkers && initialWorkers.map((item, i) => (
                            <li key={i}>{`${item.firstName} ${item.lastName}`}</li>
                        ))}
                        </ul>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

const initialWorkers = []

yup.setLocale({
    mixed: {
        required: 'Esto es un dato requerido'
    }
})

const schemaValidation = yup.object({
    startPoint: yup.string().required(),
    finalPoint: yup.string().required(),
    vehicleLabel: yup.string().required(),
    // workers: yup.array().required(),
    kilometers: yup.number().required(),
    roundTrip: yup.string().required()
})

const mapStateToProps = state => ({
    vehicles: state.vehicles
})

const mapDispatchToProps = dispatch => ({
    onFetchVehicles: () => dispatch(actions.fetchVehicles()),
    onRegisterTravel: (params) => dispatch(actions.registerTravel(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTravel));
