import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Link, Switch } from 'react-router-dom';

import ProductList from './index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';

class Router extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Switch>
				<Route path="/product/productlist" component={ProductList}/>
				<Route path="/product/save/:id?" component={ProductSave}/>
				<Route path="/product/detail/:id?" component={ProductDetail}/>
				<Redirect exact from="/product" to="/product/productlist"/>
			</Switch>
		);
	}
}

export default Router;