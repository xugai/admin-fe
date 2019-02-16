import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import PaginationPlugin from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list.jsx';

const userService = new User();
const mmall_util = new MUtil(); 

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageNum: 1,
			list: []
		};
		this.loadUserList();
	}
	loadUserList(){
		userService.getUserList(this.state.pageNum).then((res) => {
			this.setState({
				list: res.data
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
		let headers = [
			{name: 'id', width: '10%'},
			{name: '用户名', width: '45%'},
			{name: '邮箱', width: '10%'},
			{name: '联系方式', width: '15%'},
			{name: '注册时间', width: '20%'}
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="用户列表"/>
				<TableList headers={headers}>
					{
						this.state.list.map((user, index) => {
								return (
									<tr key={index}>
										<td>{user.id}</td>
										<td>{user.username}</td>
										<td>{user.email}</td>
										<td>{user.phone}</td>
										<td>{new Date(user.createTime).toLocaleString()}</td>
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

export default UserList;