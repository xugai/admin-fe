import React from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';
import FileUploader from 'util/file-upload/index.jsx';
import RichtextEditor from 'util/richtext-editor/index.jsx';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
import './save.scss';

const productService = new Product();
const mmall_util = new MUtil(); 

class ProductSave extends React.Component{
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
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value;
		this.setState({
			[name]: value
		});
	}
	// 商品种类发生改变时触发的事件
	onCategoryChange(categoryId, parentCategoryId){
		this.setState({
			categoryId:categoryId,
			parentCategoryId: parentCategoryId
		});
	}
	// 上传图片成功的处理事件
	onUploadSuccess(res){
		let imgs = this.state.subImages;
		imgs.push(res.data);
		this.setState({
			subImages: imgs
		});
	}
	// 上传图片失败的处理事件
	onUploadError(err){
		mmall_util.errorTips(err);
	}
	// 删除图片操作触发的事件
	onDeleteImg(e){
		let index = parseInt(e.target.getAttribute("index")),
			imgs = this.state.subImages;
		imgs.splice(index, 1);
		this.setState({
			subImages: imgs
		});
	}
	// 富文本编辑器中内容发生改变时触发的事件
	onEditorContextChange(context){
		this.setState({
			detail: context
		});
	}
	getImgesWithString(){
		return this.state.subImages.map(img => img.uri).join(',');
	}
	// 进行商品信息的提交
	onSubmit(){
		let product = {
			categoryId: parseInt(this.state.categoryId),
			name: this.state.name,
			subtitle: this.state.subtitle,
			subImages: this.getImgesWithString(),
			detail: this.state.detail,
			price: parseFloat(this.state.price),
			stock: parseInt(this.state.stock),
			status: 1
		};
		if(this.state.id){
			product.id = this.state.id;
		}
		let resultObj = productService.checkProductPropsIfValid(product);
		if(resultObj.status){
			productService.saveProduct(product).then(res => {
				// 该接口返回的data就是操作提示信息
				mmall_util.successTips(res.data);
				this.props.history.push('/product/productlist');
			}, err => {
				mmall_util.errorTips(err);
			});
		}else{
			mmall_util.errorTips(resultObj.msg);
		}
	}
	render(){
		return (
			<div id="page-wrapper">
				{
					this.state.id ? <PageTitle title="商品编辑"/> : <PageTitle title="商品添加"/>
				}
				<div className="form-horizontal">
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品名称</label>
				    <div className="col-md-5">
				      <input name="name" value={this.state.name} type="text" className="form-control" placeholder="请输入商品名称" 
				      			onChange={e => this.onValueChange(e)} />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品描述</label>
				    <div className="col-md-5">
				      <input name="subtitle" value={this.state.subtitle} type="text" className="form-control" placeholder="请输入商品描述" 
				      			onChange={e => this.onValueChange(e)} />
				    </div>
				  </div>
				   <div className="form-group">
				    <label className="col-md-2 control-label">所属分类</label>
				    <div className="col-md-10">
				    	<CategorySelector categoryId={this.state.categoryId} parentCategoryId={this.state.parentCategoryId} 
				    					onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}} />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品价格</label>
				    <div className="col-md-3">
				    	<div className="input-group">
						  <input name="price" value={this.state.price} type="number" className="form-control" placeholder="请输入商品价格" 
						  		onChange={e => this.onValueChange(e)} />
						  <span className="input-group-addon" id="basic-addon2">元</span>
						</div>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品库存</label>
				    <div className="col-md-3">
				    	<div className="input-group">
						  <input name="stock" value={this.state.stock} type="number" className="form-control" placeholder="请输入商品库存" 
						  		onChange={e => this.onValueChange(e)} />
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
										<img className="img" src={img.url} alt="上传此图片"/>
										<i className="fa fa-close" index={index} onClick={e => this.onDeleteImg(e)}></i>
									</div>
								)
							}) : (<div>请上传图片</div>)
						}
				    </div>
				    <div className="col-md-offset-2 col-md-10 file-upload-con">
						<FileUploader onUploadSuccess={res => this.onUploadSuccess(res)} 
				    				onUploadError={err => this.onUploadError(err)} />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">商品详情</label>
				    <div className="col-md-10">
				    	<RichtextEditor detail={this.state.detail} onContextChange={context => this.onEditorContextChange(context)}/>
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

export default ProductSave;