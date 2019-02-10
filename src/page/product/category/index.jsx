import React from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list.jsx';

import '../index/index.scss';
const mmall_util = new MUtil(); 
const productService = new Product();

class CategoryList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list: [],
			categoryId: this.props.match.params.categoryId || 0
		};
	}
	componentDidMount(){
		this.loadCategoryList();
	}
	componentDidUpdate(prevProps, prevState){
		let oldPath = prevProps.location.pathname,
			newPath = this.props.location.pathname,
			categoryId = this.props.match.params.categoryId || 0;
		if(oldPath !== newPath){
			this.setState({
				categoryId: categoryId
			}, () => {
				this.loadCategoryList();
			});
		}
	}
	loadCategoryList(){
		productService.getCategoryIdList(this.state.categoryId).then(res => {
			this.setState({
				list: res.data
			});
		}, err => {
			this.setState({
				list: []
			});
			mmall_util.errorTips(err);
		});
	}
	onUpdateName(categoryId, categoryName){
		let newName = window.prompt('请输入新的品类名称', categoryName);
		if(newName){
			productService.updateName(categoryId, newName).then(res => {
				mmall_util.successTips(res.data);
				this.loadCategoryList();
			}, err => {
				mmall_util.errorTips(err);
			});
		}
	}
	render(){
		let headers = [
			{name: '品类id', width: '30%'},
			{name: '品类名称', width: '30%'},
			{name: '操作', width: '40%'},
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="品类列表" >
					<div className="page-title-right">
						<Link to="/product-category/add" className="btn btn-primary">
							<i className="fa fa-plus"></i>
							<span>添加品类</span>
						</Link>
						{
							this.state.categoryId !== 0 ?
							<Link to="/product-category/index" className="btn btn-primary">
								<i className="fa fa-arrow-left"></i>
								<span>返回首页</span>
							</Link> : null
						}
					</div>
				</PageTitle>
				<div className="row">
					<div className="col-md-12">
						<p>父品类ID: {this.state.categoryId}</p> 
					</div>
				</div>
				<TableList headers={headers}>
					{
						this.state.list.map((category, index) => {
							return (
								<tr key={index}>
									<td>{category.id}</td>
									<td>{category.name}</td>
									<td>
										<a className="oper" onClick={e => this.onUpdateName(category.id, category.name)}>修改名称</a>
										{
											category.parentId === 0 ?
											<Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
											: null
										}
									</td>
								</tr>
							)
						})
					}
				</TableList>
			</div>
		);
	}
}

export default CategoryList;