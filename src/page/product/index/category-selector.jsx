import React from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

import './category-selector.scss';

const productService = new Product();
const mmall_util = new MUtil(); 

class CategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstCategoryIdList: [],
			firstCategoryId: 0,
			secondCategoryIdList: [],
			secondCategoryId: 0
		}
		this.loadFirstCategoryIdList();
	}
	componentWillReceiveProps(nextProps){
		let isNewFirstCategory = this.state.firstCategoryId !== nextProps.parentCategoryId,
			isNewSecondCategory = this.state.secondCategoryId !== nextProps.categoryId;
		if(!isNewFirstCategory && !isNewSecondCategory){
			return;
		}
		// 若回填回来的商品只有一级品类
		if(nextProps.parentCategoryId === 0){
			this.setState({
				firstCategoryId: nextProps.categoryId
			});
		}else{
			this.setState({
				firstCategoryId: nextProps.parentCategoryId,
				secondCategoryId: nextProps.categoryId
			}, () => isNewFirstCategory && this.loadSecondCategoryIdList(this.state.firstCategoryId));
		}
	}
	loadFirstCategoryIdList(){
		productService.getCategoryIdList().then(res => {
			this.setState({
				firstCategoryIdList: res.data
			});
		}, err => {
			mmall_util.errorTips(err);
		});
	}
	loadSecondCategoryIdList(categoryId){
		productService.getCategoryIdList(categoryId).then(res => {
			this.setState({
				secondCategoryIdList: res.data
			});
		}, err => {
			mmall_util.errorTips(err);
		});
	}
	onfirstCategoryChange(e){
		if(this.props.ReadOnly) return;
		this.setState({
			firstCategoryId: e.target.value,
			secondCategoryId: 0,
			secondCategoryIdList: []
		}, () => {
			this.loadSecondCategoryIdList(this.state.firstCategoryId);
			this.onPropsCategoryChange();
		});
	}
	onSecondCategoryChange(e){
		if(this.props.ReadOnly) return;
		this.setState({
			secondCategoryId: e.target.value
		}, () => {
			this.onPropsCategoryChange();
		});
	}
	onPropsCategoryChange(){
		let isFunction = typeof this.props.onCategoryChange === 'function';
		if(this.state.secondCategoryId){
			this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
		}else{
			this.props.onCategoryChange(this.state.firstCategoryId, 0);
		}
	}
	render(){
		return (
			<div>
				<select className="form-control category-select" 
						value={this.state.firstCategoryId}	onChange={e => this.onfirstCategoryChange(e)}
						readOnly={this.props.ReadOnly} >
					<option value="">请选择一级分类</option>
					{
						this.state.firstCategoryIdList.map((category, index) => {
							return (
								<option value={category.id} key={index}>{category.name}</option>
							)
						})
					}
				</select>
				{
					this.state.secondCategoryIdList.length ? 
					(
						<select className="form-control category-select" 
								value={this.state.secondCategoryId} onChange={e => this.onSecondCategoryChange(e)}
								readOnly={this.props.ReadOnly} >
						<option value="">请选择二级分类</option>
							{
								this.state.secondCategoryIdList.map((category, index) => {
									return (
										<option value={category.id} key={index}>{category.name}</option>
									)
								})
							}
						</select>
					) : null
				}
			</div>
		);
	}
}

export default CategorySelector;