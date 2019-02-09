import React from 'react';

class TableList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstLoading: true
		}
	}
	componentWillReceiveProps(){
		this.setState({
			firstLoading: false
		});
	}
	render(){
		let tableHeaders = this.props.headers.map((header, index) => {
			return (
					<th key={index} width={header.width}>{header.name}</th>
				)
		});
		let tableBody = this.props.children;
		let errorBody = (
			<tr align="center">
				<td colSpan={this.props.headers.length}>
					{this.state.firstLoading ? '正在加载中,请稍后...' : '没有查找到相应的结果,请尝试其他操作!~'}
				</td>
			</tr>
		);
		return (
			<div className="row">
				<div className="col-md-12">
					<table className="table table-hover">
						<thead>
							<tr>
								{tableHeaders}
							</tr>
						</thead>
						<tbody>
							{tableBody.length === 0 ? errorBody : tableBody}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default TableList;