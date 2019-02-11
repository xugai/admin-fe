import React from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Director from 'component/director/index.jsx';

import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list.jsx';

import './detail.scss'; 
const orderService = new Order();
const mmall_util = new MUtil(); 

class OrderDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			orderNo: this.props.match.params.orderNo,
			orderInfo:{

			}
		}
		// 订单详情回填
		this.loadOrderDetail();
	}
	loadOrderDetail(){
		if(this.state.orderNo){
			orderService.getOrderDetail(this.state.orderNo).then(res => {
				this.setState({
					orderInfo: res.data
				});
			}, err => {
				mmall_util.errorTips(err);
			});
		}
	}
	onClick(){
		if(window.confirm('是否确认该订单物流已经发货?')){
			orderService.sendGoods(this.state.orderNo).then(res => {
				mmall_util.successTips(res.data);
				this.loadOrderDetail();
			}, err => {
				mmall_util.errorTips(err);
			});
		}
	}
	render(){
		let headers = [
			{name: '商品图片', width: '15%'},
			{name: '商品信息', width: '40%'},
			{name: '单价', width: '15%'},
			{name: '数量', width: '15%'},
			{name: '合计', width: '15%'}
		];
		let receiverInfo = this.state.orderInfo.shippingVo || {},
			orderItemList = this.state.orderInfo.orderItemVoList || [];
		return (
			<div id="page-wrapper">
				<PageTitle title="订单详情" >
					<Director targetLink="/order"/>
				</PageTitle>
				<div className="form-horizontal">
				  <div className="form-group">
				    <label className="col-md-2 control-label">订单号</label>
				    <div className="col-md-5">
				      <p className="form-control-static">{this.state.orderNo}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">创建时间</label>
				    <div className="col-md-5">
				       <p className="form-control-static">{this.state.orderInfo.createTime}</p>
				    </div>
				  </div>
				   <div className="form-group">
				    <label className="col-md-2 control-label">收件人</label>
				    <div className="col-md-5">
				    	<p className="form-control-static">{receiverInfo.receiverName}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">订单状态</label>
				    <div className="col-md-5">
				    	<p className="form-control-static">
				    		{this.state.orderInfo.statusDesc}
				    		{
				    			this.state.orderInfo.status === 20 ?
				    			<button className="btn btn-primary btn-sm sendGoods" onClick={e => this.onClick()}>立即发货</button>
				    			: null
				    		}
				    	</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">支付方式</label>
				    <div className="col-md-3">
				    	<p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">订单金额</label>
				    <div className="col-md-3">
				    	<p className="form-control-static">¥{this.state.orderInfo.payment}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品列表</label>
				    <div className="col-md-10">
					   	<TableList headers={headers}>
							{
								orderItemList.map((orderItem, index) => {
								return (
										<tr key={index}>
											<td>
												<img src={`${this.state.orderInfo.imageHost}${orderItem.productImage}`} alt={`${orderItem.productName}`}/>
											</td>
											<td>{orderItem.productName}</td>
											<td>¥{orderItem.currentUnitPrice}</td>
											<td>{orderItem.quantity}件</td>
											<td>¥{orderItem.totalPrice}</td>
										</tr>
									)
								})
							}
						</TableList>
					</div>
				  </div>
				</div>
			</div>
		);
	}
}

export default OrderDetail;