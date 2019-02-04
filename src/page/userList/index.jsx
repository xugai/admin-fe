import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import PaginationPlugin from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const userService = new User();
const mmall_util = new MUtil(); 

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageNum: 1,
			list: [],
			firstLoading: true
		};
		this.loadUserList();
	}
	loadUserList(){
		userService.getUserList(this.state.pageNum).then((res) => {
			this.setState(res.data, () => {
				this.setState({
					firstLoading: false
				});
			});
		}, (err) => {
			this.setState({
				list: []
			});
			mmall_util.errorTips(err);
		});
	}
	onPageNumChange(pageNum){
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadUserList();
		});
	}
	render(){
		let pageBody = this.state.list.map((user, index) => {
									return (
										<tr key={index}>
											<td>{user.id}</td>
											<td>{user.username}</td>
											<td>{user.email}</td>
											<td>{user.phone}</td>
											<td>{new Date(user.createTime).toLocaleString()}</td>
										</tr>
									)
								}
							);
		let errorBody = (
			<tr align="center">
				<td colSpan="5">{this.state.firstLoading ? '正在加载中,请稍后...' : '没有查找到相应的结果,请尝试其他操作!~'}</td>
			</tr>
		);
		return (
			<div id="page-wrapper">
				<PageTitle title="用户列表"/>
				<div className="row">
					<div className="col-md-12">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>id</th>
									<th>username</th>
									<th>email</th>
									<th>phone</th>
									<th>createTime</th>
								</tr>
							</thead>
							<tbody>
							{ 
								this.state.list.length === 0 ? errorBody : pageBody
							}
							</tbody>
						</table>
					</div>
				</div>
				<PaginationPlugin defaultCurrent={this.state.pageNum} defaultPageSize={this.state.pageSize} total={this.state.total} 
									onChange={pageNum => {this.onPageNumChange(pageNum)}}/>
			</div>
		);
	}
}

export default UserList;