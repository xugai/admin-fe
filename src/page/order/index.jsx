import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import PaginationPlugin from 'util/pagination/index.jsx';
import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list.jsx';
import SearchComponent from './index-list-search.jsx';

import 'component/layout/index.scss';

const orderService = new Order();
const mmall_util = new MUtil(); 

class OrderList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageNum: 1,
			list: [],
			type: 'list',
		};
		this.loadOrderList();
	}
	loadOrderList(){
		let listParam = {};
		listParam.pageNum = this.state.pageNum;
		listParam.type = this.state.type;
		listParam.searchType = this.state.searchType;
		listParam.searchKeyword = this.state.searchKeyword;
		orderService.getOrderList(listParam).then((res) => {
			this.setState(res.data);
		}, (err) => {
			this.setState({
				list: [],
				total: 1
			});
			mmall_util.errorTips(err);
		});
	}
	onSearch(orderNo){
		let listType = orderNo === '' ? 'list' : 'search';
		this.setState({
			pageNum: 1,
			type: listType,
			searchType: 'orderNo',
			searchKeyword: orderNo
		}, () => {
			this.loadOrderList();
		});
	}
	onClick(){
		this.onSearch('');
		$(".searchKeyword").val('');
	}
	onPageNumChange(pageNum){
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadOrderList();
		});
	}
	render(){
		let headers = ['订单号', '收件人', '订单状态', '订单总价', '创建时间' ,'操作'];
		return (
			<div id="page-wrapper">
				<PageTitle title="订单列表">
					{
						this.state.list.length ? null : 
						<div className="page-title-right">
						<button onClick={e => this.onClick()} className="btn btn-primary">
							<i className="fa fa-arrow-left"></i>
							<span>返回首页</span>
						</button>
			</div>
					}
				</PageTitle>
					<SearchComponent onSearch={(orderNo) => this.onSearch(orderNo)}/>
					<TableList headers={headers}>
						{
							this.state.list.map((order, index) => {
							return (
									<tr key={index}>
										<td>
											<Link className="oper" to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
										</td>
										<td>{order.receiverName}</td>
										<td>{order.statusDesc}</td>
										<td>{order.payment}</td>
										<td>{order.createTime}</td>
										<td>
											<Link className="oper" to={`/order/detail/${order.orderNo}`}>详情</Link>
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

export default OrderList;