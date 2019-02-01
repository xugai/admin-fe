/*
* @Author: Xugai
* @Date:   2019-01-27 21:02:28
* @Last Modified by:   Xugai
* @Last Modified time: 2019-01-27 23:22:01
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';

class App extends React.Component{
	render(){
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/product' component={Home} />
						<Route path='/product-category' component={Home} />
						<Route path='/order' component={Home} />
						<Route path='/user' component={Home} />
					</Switch>
				</Layout>		
			</Router>		
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);





