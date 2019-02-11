import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import PaginationPlugin from 'util/pagination/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list.jsx';
import SearchComponent from 'page/product/index/index-list-search.jsx';

import './index.scss';
import 'component/layout/index.scss';

const productService = new Product();
const mmall_util = new MUtil(); 

class ProductList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageNum: 1,
			list: [],
			type: 'list'
		};
		this.loadProductList();
	}
	loadProductList(){
		let listParam = {};
		listParam.pageNum = this.state.pageNum;
		listParam.type = this.state.type;
		listParam.searchType = this.state.searchType;
		listParam.searchKeyword = this.state.searchKeyword;
		productService.getProductList(listParam).then((res) => {
			this.setState(res.data);
		}, (err) => {
			this.setState({
				list: []
			});
			mmall_util.errorTips(err);
		});
	}
	onSearch(searchType, searchKeyword){
		let listType = searchKeyword === '' ? 'list' : 'search';
		this.setState({
			pageNum: 1,
			type: listType,
			searchType: searchType,
			searchKeyword: searchKeyword
		}, () => {
			this.loadProductList();
		});
	}
	updateStatus(id, status){
		// 进行二次确认
		let alertText = status === 1 ? '确认下架该商品吗?' : '确认上架该商品吗?';
		if(window.confirm(alertText)){
			let newStatus = status === 1 ? 2 : 1,
			productInfo = {
				productId: id,
				status: newStatus
			};
			productService.setSaleStatus(productInfo).then(res => {
				mmall_util.successTips(res.msg);
				//修改完商品的状态后应该重新刷新当前的商品列表
				this.loadProductList();
			}, err => {
				mmall_util.errorTips(err);
			})
		}
	}
	onPageNumChange(pageNum){
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadProductList();
		});
	}
	render(){
		let headers = [
			{name: '商品Id', width: '10%'},
			{name: '商品信息', width: '50%'},
			{name: '价格', width: '10%'},
			{name: '状态', width: '15%'},
			{name: '操作', width: '15%'}
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="商品列表">
					<div className="page-title-right">
						<Link to="/product/save" className="btn btn-primary">
							<i className="fa fa-plus"></i>
							<span>添加商品</span>
						</Link>
					</div>
				</PageTitle>
					<SearchComponent onSearch={(searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)}/>
					<TableList headers={headers}>
						{
							this.state.list.map((product, index) => {
							return (
									<tr key={index}>
										<td>{product.id}</td>
										<td>{product.name}</td>
										<td>¥{product.price}</td>
										<td>
											{product.status === 1 ? '上架' : '下架'}&nbsp;&nbsp;&nbsp;
											<button className="btn btn-xs btn-warning" onClick={e => {this.updateStatus(product.id, product.status)}}>{product.status === 1 ? '下架' : '上架'}</button>
										</td>
										<td>
											<Link className="oper" to={ `/product/detail/${product.id}` }>详情</Link>
											<Link className="oper" to={ `/product/save/${product.id}` }>编辑</Link>
										</td>
									</tr>
								)
							})
						}
					</TableList>
				<PaginationPlugin defaultCurrent={this.state.pageNum} defaultPageSize={this.state.pageSize} total={this.state.total} 
									onChange={pageNum => {this.onPageNumChange(pageNum)}}/>
			</div>
		);
	}
}

export default ProductList;