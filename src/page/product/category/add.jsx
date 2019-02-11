import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Director from 'component/director/index.jsx';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const mmall_util = new MUtil(); 
const productService = new Product();

class CategoryAdd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			categoryIdList: [],
			parentCategoryId: 0,
			categoryName: ''
		};
	}
	componentDidMount(){
		this.loadCategoryList();
	}
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value;
		this.setState({
			[name]: value
		});
	}
	loadCategoryList(){
		productService.getCategoryIdList(this.state.categoryId).then(res => {
			this.setState({
				categoryIdList: res.data
			});
		}, err => {
			this.setState({
				categoryIdList: []
			});
			mmall_util.errorTips(err);
		});
	}
	onSubmit(){
		let data = {
			parentId: this.state.parentCategoryId,
			categoryName: this.state.categoryName
		};
		productService.addCategory(data).then(res => {
			// 该接口返回的res里,data才是提示信息 = =
			mmall_util.successTips(res.data);
			// 添加一个新的品类后,回退到品类列表页面
			this.props.history.push('/product-category/index');
		}, err => {	
			mmall_util.errorTips(err);
		});
	}
	render(){	
		return (
			<div id="page-wrapper">
				<PageTitle title="品类添加" >
					<Director targetLink="/product-category/index"/>
				</PageTitle>
				<div className="form-horizontal">
					<div className="form-group">
					    <label className="col-md-2 control-label">所属分类</label>
					    <div className="col-md-3">
					    	<select name="parentCategoryId" className="form-control"  onChange={e => this.onValueChange(e)}>
								<option value="0">/根品类</option>
								{
									this.state.categoryIdList.length ? 
									this.state.categoryIdList.map((category, index) => {
										return (
											<option value={category.id} key={index}>/根品类/{category.name}</option>
										)
									}) : null
								}
					    	</select>
					    </div>
				 	</div>
					<div className="form-group">
						<label className="col-md-2 control-label">品类名称</label>
						<div className="col-md-3">
					  		<input name="categoryName" type="text" className="form-control" placeholder="请输入品类名称" 
					  			onChange={e => this.onValueChange(e)} />
						</div>
					</div>
					<div className="form-group">
					    <div className="col-md-offset-2 col-md-10">
					      <button className="btn btn-primary" onClick={e => this.onSubmit()}>提交</button>
					    </div>
				  	</div>
				</div>
			</div>
		);
	}
}

export default CategoryAdd;