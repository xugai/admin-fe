import React from 'react';
import ReactDOM from 'react-dom';

// React组件的基础用法
function Component(){
	return <h1>i am BERIO</h1>
}
class ES6Component extends React.Component{
	render(){
		return <h1>i am Berio!</h1>
	}
}
ReactDOM.render(
	<div>
		<ES6Component />
		<Component />
	</div>,
	document.getElementById('app')
);

// state && props基本用法
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: 'Behe'
		};
	}
	render(){
		// setTimeout(() => {
		// 	this.setState({
		// 		name: 'Berio'
		// 	});
		// }, 2000);
		return <h1>i am {this.props.name}!</h1>
	}
}

ReactDOM.render(
	<div>
		<Component name="又饿又累" />
	</div>,
	document.getElementById('app')
);

// 事件处理的方式
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '又饿又累',
			age: 22
		};
	}
	addAge(e){
		this.setState({
			age: this.state.age + 1
		});
	}
	onAgeChange(e){
		this.setState({
			age: e.target.value
		});
	}
	render(){
		return (
			<div>
				<h1>i am {this.state.name}</h1>
				<h1>i am {this.state.age} years old.</h1>
				<button onClick={(e) => {this.addAge(e)}}>加一岁</button>
				<input type="text" onChange={(e) => {this.onAgeChange(e)}}/>
			</div>
		)
	}
}

ReactDOM.render(
	<Component />,
	document.getElementById('app')
);

// 组件的组合方式
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '又饿又累',
			age: 22
		};
	}
	addAge(e){
		this.setState({
			age: this.state.age + 1
		});
	}
	onAgeChange(e){
		this.setState({
			age: e.target.value
		});
	}
	render(){
		return (
			<div>
				<h1>i am {this.state.name}</h1>
				<h1>i am {this.state.age} years old.</h1>
				<button onClick={(e) => {this.addAge(e)}}>加一岁</button>
				<input type="text" onChange={(e) => {this.onAgeChange(e)}}/>
			</div>
		)
	}
}
class Title extends React.Component{
	constructor(props){
		super(props);
	}
	render(props){
		return <h1>{this.props.children}</h1>
	}
}
class App extends React.Component{
	render(){
		return (
		<div>
			{/* 容器式组件 */}
			<Title>
				<span>APP</span>
				<a href="link">link</a>
			</Title>
			<hr/>
			{/* 单纯式组件 */}
			<Component />
		</div>
	);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);


// 数据传递与状态提升(子组件通过父组件将状态传递到另一个子组件)
class Child1 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '又饿又累',
			age: 22
		};
	}
	onChangeChild2BgColor(){
		this.props.onChangeChild2BgColor('red');
	}
	render(){
		return (
			<div>
				<h1>子组件1</h1>
				<button onClick={(e) => {this.onChangeChild2BgColor(e)}}>改变子组件2的bgColor</button>
			</div>
		)
	}
}

class Child2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '又饿又累',
			age: 22
		};
	}
	render(){
		return (
			<div style={{background: this.props.bgColor}}>
				<h1>子组件2的背景颜色: {this.props.bgColor}</h1>
			</div>
		)
	}
}

class Father extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			bgColor: '#999',
			child2BgColor: '#999'
		};
	}
	changeChild2BgColor(color){
		this.setState({
			child2BgColor: color
		});
	}
	render(props){
		return(
			<div style={{background: this.state.bgColor}}>
				<Child1 onChangeChild2BgColor={(color) => {this.changeChild2BgColor(color)}}/>
				<hr/>
				<Child2 bgColor={this.state.child2BgColor}/>
			</div>
		);
	}
}

ReactDOM.render(
	<Father />,
	document.getElementById('app')
);

// 组件的生命周期
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			status: 'old'
		};
		console.log('构造器构造','constructor');
	}
	componentWillMount(){
		console.log('componentWillMount');
	}
	componentDidMount(){
		console.log('componentDidMount');
	}
	componentWillUnmount(){
		console.log('componentWillUnmount');
	}
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps');
	}
	shouldComponentUpdate(){
		console.log('shouldComponentUpdate');
		return true;
	}
	componentWillUpdate(){
		console.log('componentWillUpdate');
	}
	componentDidUpdate(){
		console.log('componentDidUpdate');
	}
	updateState(){
		console.log('状态改变');
		this.setState({
			status: 'new'
		});
	}
	render(){
		console.log('render');
		return (
			<div>
				<h1>组件props: {this.props.data}</h1>
			</div>
		);
	}
}

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: 'old props',
			hasChild: true
		};
	}
	changeProps(){
		console.log('接收props');
		this.setState({
			data: 'new props'
		});
	}
	destroyComponent(){
		console.log('销毁组件');
		this.setState({
			hasChild: false
		});
	}
	render(){
		return (
			<div>
				{
					this.state.hasChild ? <Component data={this.state.data}/> : null
				}
				<button onClick={() => {this.changeProps()}}>接收props</button>
				<button onClick={() => {this.destroyComponent()}}>销毁组件</button>
			</div>
		);
	}
}
ReactDOM.render(
	<App />,
	document.getElementById('app')
);