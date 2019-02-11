import MUtil from 'util/mm.jsx';

const mmall_util = new MUtil(); 
class User{
	login(loginInfo){
		return mmall_util.request({
			url: '/manage/user/login.do',
			type: 'post',
			data: loginInfo
		});
	}
	checkLoginInfo(loginInfo){
		let username = $.trim(loginInfo.username),
			password = $.trim(loginInfo.password);
		if(typeof username !== 'string' || username.length === 0){
			return {
				status: false,
				msg: '用户名不能为空!'
			}
		}
		if(typeof password !== 'string' || password.length === 0){
			return {
				status: false,
				msg: '密码不能为空!'
			}
		}
		return {
			status: true,
		}
	}
	logout(){
		return mmall_util.request({
			url: '/user/logout.do',
			type: 'post'
		});
	}
	getUserList(pageNum){
		return mmall_util.request({
			url: '/manage/user/list.do',
			type: 'post',
			data: {
				pageNum: pageNum
			}
		});
	}
}

export default User;