import React from 'react';
import ReactDOM from 'react-dom';


// jsx基础语法
let jsx1 = <div>jsx1...</div>
ReactDOM.render(
	jsx1, 
	document.getElementById('app')
);


// jsx样式渲染语法
let style = {
	color: 'blue',
	fontSize: '30px'
};
let jsx2 = <div className="jsx" style={style}>jsx2...</div>
ReactDOM.render(
	jsx2, 
	document.getElementById('app')
);

// jsx变量动态渲染与数据逻辑处理
let name = 'BERIO';
let names = ['BERIO', 'BEHE', 'XUGAI'];
let flag = true;
let jsx3 = (
	<div>	
		{/* 变量的渲染 */}
		{
			<p>hello, i am {name}</p>
		}
		{/* 布尔表达式控制DOM节点的渲染 */}
		{
			flag ? <p>hello, {name}</p> : <p>you are not {name}</p>
		}
		{/* 循环处理数据 */}
		{
			names.map((name, index) => <p key={index}>hello, {name}</p>)
		}
	</div>
);
ReactDOM.render(
	jsx3, 
	document.getElementById('app')
);