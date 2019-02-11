import React from 'react';
import { Link } from 'react-router-dom';

import MUtil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import Statistic from 'service/statistic-service.jsx';
import './index.scss';

const mmall_util = new MUtil(); 
const statisticService = new Statistic();
class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userCount: '',
			productCount: '',
			orderCount: ''
		}
	}
	componentDidMount(){
		this.loadCount();
	}
	loadCount(){
		statisticService.getCount().then((res) => {
			this.setState(res.data);
		}, (err) => {
			mmall_util.errorTips(err);
		});
	}
	render(){
		return (
			<div id="page-wrapper"> 
				<PageTitle title="首页">
					<div className="row">
						<div className="col-md-4">
							<Link to="/user" className="color-box brown">
								<p className="count">{this.state.userCount}</p>
								<p className="desc">
									<i className="fa fa-user-o"></i>
									<span>用户总数</span>
								</p>
							</Link>
						</div>
						<div className="col-md-4">
							<Link to="/product" className="color-box green">
								<p className="count">{this.state.productCount}</p>
								<p className="desc">
									<i className="fa fa-list"></i>
									<span>商品总数</span>
								</p>
							</Link>
						</div>
						<div className="col-md-4">
							<Link to="/order" className="color-box blue">
								<p className="count">{this.state.orderCount}</p>
								<p className="desc">
									<i className="fa fa-check-square-o"></i>
									<span>订单总数</span>
								</p>
							</Link>
						</div>
					</div>
					<div className="footer">
						<span>CopyRight Reserved®. www.immall.tk 2018-2019  ©IMMALL.</span>
					</div>
				</PageTitle>
			</div>
		);
	}
}

export default Home;