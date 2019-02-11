import React from 'react';
import { Link } from 'react-router-dom';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const mmall_util = new MUtil(); 
const userService = new User();

class NavTop extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            username: mmall_util.getLocalStorage('userInfo').username
        }
	}
    // 退出登录
    onLogout(){
        userService.logout();
        let result = mmall_util.removeLocalStorage('userInfo');
        if(result.status){
            window.location.href = '/login';
            return;
        }
        mmall_util.errorTips(result.msg);
        window.location.href = '/login';
    }
	render(){
		return (
			<div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>IMMALL</b>ADMIN</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        {
                            this.state.username ?  <span>欢迎, {this.state.username}</span> : <span>欢迎</span>
                        }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a onClick={() => {this.onLogout()}}>
                                <i className="fa fa-sign-out fa-fw"></i> 
                                <span>退出登录</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
		);
	}
}

export default NavTop;