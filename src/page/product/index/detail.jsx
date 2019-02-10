import React from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Director from 'component/director/index.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
import './save.scss';

const productService = new Product();
const mmall_util = new MUtil(); 

class ProductDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id 			: this.props.match.params.id,
			categoryId 	: 0,
			name 		: '',
			subtitle 	: '',
			subImages 	: [],
			detail 		: '',
			price 		: '',
			stock 		: 0,
			status  	: 1
		}
		// 商品的信息回填,如果有传入id过来的话
		this.loadProductContext();
	}
	loadProductContext(){
		if(this.state.id){
			productService.getProduct(this.state.id).then(res => {
				let product = res.data,
					imgs = res.data.subImages.split(',');
				res.data.subImages = imgs.map(imgUri => {
					return {
						uri: imgUri,
						url: res.data.imageHost + imgUri
					}
				});
				this.setState(res.data);
			}, err => {
				mmall_util.errorTips(err);
			});
		}
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="商品详情" >
					<Director targetLink="/product/productlist"/>
				</PageTitle>
				<div className="form-horizontal">
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品名称</label>
				    <div className="col-md-5">
				      <p className="form-control-static">{this.state.name}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品描述</label>
				    <div className="col-md-5">
				       <p className="form-control-static">{this.state.subtitle}</p>
				    </div>
				  </div>
				   <div className="form-group">
				    <label className="col-md-2 control-label">所属分类</label>
				    <div className="col-md-10">
				    	<CategorySelector ReadOnly={true} categoryId={this.state.categoryId} parentCategoryId={this.state.parentCategoryId} />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品价格</label>
				    <div className="col-md-3">
				    	<div className="input-group">
						  <input value={this.state.price} type="number" className="form-control" readOnly/>
						  <span className="input-group-addon" id="basic-addon2">元</span>
						</div>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品库存</label>
				    <div className="col-md-3">
				    	<div className="input-group">
						  <input value={this.state.stock} type="number" className="form-control" readOnly/>
						  <span className="input-group-addon" id="basic-addon2">件</span>
						</div>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品图片</label>
				    <div className="col-md-10">
						{
							this.state.subImages.length ? 
							this.state.subImages.map((img, index) => {
								return (
									<div className="img-con" key={index}>
										<img className="img" src={img.url}/>
									</div>
								)
							}) : (<div>暂无该商品图片</div>)
						}
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品详情</label>
				    <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
				  </div>
				</div>
			</div>
		);
	}
}

export default ProductDetail;