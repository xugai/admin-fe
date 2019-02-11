import MUtil from 'util/mm.jsx';

const mmall_util = new MUtil();
class Order{
	getOrderList(listParam){
		let url = '',
			data = {};
		if(listParam.type === 'list'){
			url = '/manage/order/list.do';
			data.pageNum = listParam.pageNum;
		}else if(listParam.type === 'search'){
			url = '/manage/order/search.do';
			data[listParam.searchType] = listParam.searchKeyword;
		}
		return mmall_util.request({
			type: 'post',
			url: url,
			data: data
		});
	}
	getOrderDetail(orderNo){
		return mmall_util.request({
			type: 'post',
			url: '/manage/order/detail.do',
			data: {
				orderNo: orderNo
			}
		});
	}
	sendGoods(orderNo){
		return mmall_util.request({
			type: 'post',
			url: '/manage/order/send_goods.do',
			data: {
				orderNo: orderNo
			}
		});
	}
}

export default Order;