import React from 'react';
import './index.scss';
import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const mmall_util = new MUtil(); 
const userService = new User();

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: mmall_util.getUrlParam('redirect') || '/'
		}
	}
	componentWillMount(){
		document.title = '登录 - IMMALL ADMIN';
	}
	// 监听表单上面input框输入值的改变
	onInputChange(e){
		let inputName = e.target.name,
			inputValue = e.target.value;
		this.setState({
			[inputName]: inputValue
		});
	}
	// 若监听到用户敲击键盘中的回车键,则同样进行提交操作
	onInputKeyUp(e){
		if(e.keyCode === 13){
			this.onSubmit();
		}
	}
	onSubmit(){
		let loginInfo = {			
			username: this.state.username,
			password: this.state.password			
		},
			checkLoginResult = userService.checkLoginInfo(loginInfo);
		if(checkLoginResult.status){
			userService.login(loginInfo).then((res) => {
				let result = mmall_util.setLocalStorage('userInfo', res);
				if(result.status){
					this.props.history.push(this.state.redirect);
					return;
				}
				mmall_util.errorTips(result.msg);
			}, (err) => {
				mmall_util.errorTips(err);
			});
		}else{
			mmall_util.errorTips(checkLoginResult.msg);
		}
	}
	render(){
		return (
			<div className="col-md-4 col-md-offset-4">
				<div className="panel panel-primary login-panel">
					<div className="panel-heading"><span>欢迎登录 - IMMALL商城后台管理系统</span></div>
					<div className="panel-body">
						<div>
							<div className="form-group">
							   <input name="username" type="text" className="form-control" placeholder="请输入用户名" 
							    onKeyUp={e => {this.onInputKeyUp(e)}} onChange={e => {this.onInputChange(e)}} />
							</div>
							<div className="form-group">
							   <input name="password" type="password" className="form-control" placeholder="请输入密码" 
							    onKeyUp={e => {this.onInputKeyUp(e)}} onChange={e => {this.onInputChange(e)}} />
							</div>
							<button onClick={() => {this.onSubmit()}} className="btn btn-lg btn-default btn-block">登录</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;