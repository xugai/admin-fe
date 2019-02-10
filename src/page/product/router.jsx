import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Link, Switch } from 'react-router-dom';

import ProductList from './index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';
import CategoryList from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

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
				<Route path="/product-category/index/:categoryId?" component={CategoryList}/>
				<Route path="/product-category/add" component={CategoryAdd}/>
				<Redirect exact from="/product" to="/product/productlist"/>
				<Redirect exact from="/product-category" to="/product-category/index"/>
			</Switch>
		);
	}
}

export default Router;