import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../store/actions';
import { calcular_kgco2 } from '../../helpers/utils';

import { Container } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';


function Travels(props) {

    useEffect(() => {
        console.log('[Travels] loaded!')
        props.onFetchTravels()
    }, [])

    return (
        <Container fluid>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>#</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>dia y hora</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>punto de inicio</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>punto de termino</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>km recorridos</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>medio de transporte</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>personas en el viaje</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>ida y vuelta</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Kg CO2</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {props.travels.length > 0 && props.travels.map((item, i) => (
                    <Table.Row key={item._id}>
                        <Table.Cell textAlign='center'>{(i+1)}</Table.Cell>
                        <Table.Cell textAlign='center'>{moment(item.created_at).format('DD/MM/YYYY')}</Table.Cell>
                        <Table.Cell textAlign='center'>{item.startPoint}</Table.Cell>
                        <Table.Cell textAlign='center'>{item.finalPoint}</Table.Cell>
                        <Table.Cell textAlign='center'>{item.kilometers}</Table.Cell>
                        <Table.Cell textAlign='center'>{item.vehicle.name}</Table.Cell>
                        <Table.Cell textAlign='center'>{item.workers.length}</Table.Cell>
                        <Table.Cell textAlign='center'>{item.roundTrip ? 'SI' : 'NO'}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            {
                                calcular_kgco2({ 
                                    factor_emision: item.vehicle.emitfactor, 
                                    kilometers: item.kilometers, 
                                    roundTrip: item.roundTrip 
                                })
                            }
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
        </Container>
    )
}

const mapStateToProps = state => ({
    travels: state.travels
})

const mapDispatchToProps = dispatch => ({
    onFetchTravels: () => dispatch(actions.fetchTravels())
})

export default connect(mapStateToProps, mapDispatchToProps)(Travels);
