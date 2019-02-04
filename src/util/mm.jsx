
class MUtil{
	request(param){
		return new Promise((resolve, reject) => {
			$.ajax({
				url 	: param.url 		|| '',
				type 	: param.type 		|| 'get',
				dataType: param.dataType 	|| 'json',
				data 	: param.data 		|| null,
				success: res => {
					// 若返回的状态码为0,代表登录成功
					if(0 === res.status){
						typeof resolve === 'function' && resolve({
							data: res.data,
							msg: res.msg
						});
					}
					// 若返回的状态码为10,代表用户未登录,需要强制登录
					else if(10 === res.status){
						this.doLogin();
					}
					// 若返回的是其他状态码,则代表本次AJAX请求出错,交由reject处理
					else{
						typeof reject === 'function' && reject(res.msg);
					}
				},
				error: err => {
					typeof reject === 'function' && reject(err.statusText);
				}
			});
		});
	}
	doLogin(){
		// window.location.pathname表示当前浏览器请求窗口里面的相对路径
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	// 获取URL中指定的参数值
	getUrlParam(name){
		//param1=123&param2=456
		let queryStr = window.location.search.split('?')[1] || '',
			reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
			result = queryStr.match(reg);
		// 实际上正则会返回一个数组,里面包含了符合正则表达式以及子表达式的字符串元素,
		// result['param1=123&', '', '123', '&']
		return result ? decodeURIComponent(result[2]) : null;
	}
	errorTips(errMsg){
		alert(errMsg || '好像哪里不对,刷新重试下!');
	}
	resultObj(status, msg){
		return {
			status: status,
			msg: msg
		}
	}
	// 本地存储设置
	setLocalStorage(name, data){
		let dataType = typeof data;
		// 如果data类型是对象,则序列化成JSON字符串后再进行本地存储
		if(dataType === 'object'){
			window.localStorage.setItem(name, JSON.stringify(data));
			return this.resultObj(true, '本地存储设置成功!');
		}
		// 如果是基本数据类型,则直接进行存储
		else if(['string', 'number', 'boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name, data);
			return this.resultObj(true, '本地存储设置成功!');
		}
		else{
			alert('该数据类型无法用于本地存储!');
			return;
		}
	}
	// 获取本地存储
	getLocalStorage(name){
		let jsonStr = window.localStorage.getItem(name);
		if(jsonStr){
			return JSON.parse(jsonStr).data;
		}
		return '';
	}
	// 删除本地存储
	removeLocalStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			window.localStorage.removeItem(name);
			return this.resultObj(true, '本地存储删除成功!');
		}
		return this.resultObj(false, '用户未登录,请尝试重新登录!');
	}
}

export default MUtil;