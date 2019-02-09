import MUtil from 'util/mm.jsx';

const mmall_util = new MUtil(); 
class Product{
	getProductList(listParam){
		let url = '',
			data = {};
		data.pageNum = listParam.pageNum;
		if(listParam.type === 'list'){
			url = '/manage/product/list.do';
		}else if(listParam.type === 'search'){
			url = '/manage/product/search.do';
			data[listParam.searchType] = listParam.searchKeyword;
		}
		return mmall_util.request({
			type: 'post',
			url: url,
			data: data
		});
	}
	setSaleStatus(productInfo){
		return mmall_util.request({
			url: '/manage/product/set_sale_status.do',
			type: 'post',
			data: productInfo
		}); 
	}
	// 检查product对象中各项属性是否合法
	checkProductPropsIfValid(product){
		if(typeof product.name !== 'string' || product.name.length === 0){
			return {
				status: false,
				msg: '商品名称不能为空!'
			}
		}
		if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
			return {
				status: false,
				msg: '商品描述不能为空!'
			}
		}
		if(typeof product.categoryId !== 'number' || product.categoryId === 0){
			return {
				status: false,
				msg: '请为该商品选择种类!'
			}
		}
		/* NaN是number类型,它不能和数字做比较,作比较的话全部都会返回false */
		if(typeof product.price !== 'number' || !(product.price >= 0)){
			return {
				status: false,
				msg: '商品价格非法!'
			}
		}
		if(typeof product.stock !== 'number' || product.stock <= 0){
			return {
				status: false,
				msg: '商品库存非法!'
			}
		}
		return {
			status: true,
			msg: '商品属性校验成功!'
		}
	}
	saveProduct(product){
		return mmall_util.request({
			url: '/manage/product/save.do',
			type: 'post',
			data: product
		}); 
	}
	getProduct(productId){
		return mmall_util.request({
			url: '/manage/product/detail.do',
			type: 'post',
			data: {
				productId: productId
			}
		}); 
	}
	/*
		与商品种类有关的接口请求
	*/
	getCategoryIdList(categoryId){
		return mmall_util.request({
			url: '/manage/category/get_category.do',
			type: 'post',
			data: {
				categoryId: categoryId || 0
			}
		}); 
	}
}

export default Product;