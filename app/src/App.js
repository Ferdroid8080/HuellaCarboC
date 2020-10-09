import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/UI/Layout';
import Travels from './components/pages/Travels';
import NewTravel from './components/pages/NewTravel';

function App() {
	return (
		<Layout>
			<Switch>
				<Route exact path='/' render={() => <div></div>} />
				<Route exact path='/travels' component={Travels} />
				<Route exact path='/travels/new' component={NewTravel} />
				<Route render={() => <h3>404 Pagina no encontrada</h3>} />
			</Switch>
		</Layout>
	);
}

export default App;
