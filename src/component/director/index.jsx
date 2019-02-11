import React from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import 'component/layout/index.scss';
class Director extends React.Component{
	render(){
		return (
			<div className="page-title-right">
				<Link to={`${this.props.targetLink}`} className="btn btn-primary">
					<i className="fa fa-arrow-left"></i>
					<span>返回首页</span>
				</Link>
			</div>
		)
	}
}

export default Director;