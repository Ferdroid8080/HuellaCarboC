import React from 'react';
import { Container } from 'semantic-ui-react';

import Toolbar from './Toolbar';


function Layout({ children }) {
    return (
        <Container>
            <Toolbar items={[
                { key: '/travels', name: 'Viajes registrados' },
                { key: '/travels/new', name: 'Registrar viaje' }
            ]} />
            { children }
        </Container>
    )
}

export default Layout;
