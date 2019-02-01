// 页面路由
window.location.href = 'https://www.baidu.com';
history.back();		// 根据历史记录回退到上一个浏览过的页面地址

// hash路由
window.location = '#hash';
window.onhashchange = function(){
	console.log('current hash: ', window.location.hash);
}

// h5路由
// 推进一个状态
history.pushState('name', 'title', '/path');
// 替换一个状态
history.replaceState('name', 'title', '/path');
// popstate
window.onpopstate = function(){
	console.log(window.location.href);
	console.log(window.location.pathname);
	console.log(window.location.hash);
	console.log(window.location.search);
}

// React Router
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class A extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				component A
				<Switch>
					{/* 添加exact限制，表明是精确匹配 */}
					<Route exact path={`${this.props.match.path}`} render={(route) => {
						return <div>当前是不带参数的组件A</div>
					}}/>
					<Route path={`${this.props.match.path}/sub`} render={(route) => {
						return <div>匹配到拥有子路径而不是携带参数的组件A</div>
					}}/>
					<Route path={`${this.props.match.path}/:id`} render={(route) => {
						return <div>当前是带参数的组件A,其参数是: {route.match.params.id}</div>
					}}/>
				</Switch>
			</div>
		);
	}
}
class B extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <h1>component B</h1>
	}
}

class Wrapper extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<Link to='/a'>组件A</Link>
				<br/>
				<Link to='/a/123'>带参数的组件A</Link>
				<br/>
				<Link to='/a/sub'>访问不带参数却有子路径的组件A</Link>
				<br/>
				<Link to='/b'>组件B</Link>
				{this.props.children}
			</div>
		);
	}
}
ReactDOM.render(
	<Router>
		<Wrapper>
			<Route path='/a' component={A}/>
			<Route path='/b' component={B}/>
		</Wrapper>		
	</Router>,
	document.getElementById('app')
);
