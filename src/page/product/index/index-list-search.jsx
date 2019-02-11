import React from 'react';

class SearchComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchType: 'productId',
			searchKeyword: ''
		}
	}
	onValueChange(e){
		if("searchType" === e.target.name){
			this.setState({
				searchType: e.target.value
			});
		}else if("searchKeyword" === e.target.name){
			this.setState({
				searchKeyword: e.target.value
			});
		}
	}
	onSearch(){
		this.props.onSearch(this.state.searchType, this.state.searchKeyword);
	}
	onKeyupSearch(e){
		if(e.keyCode === 13){
			this.onSearch();
		}
	}
	render(){
		return (
			<div className="row search-wrapper">
				<div className="col-md-12">
					<div className="form-inline">
						<div className="form-group">						  
							<select name="searchType" className="form-control" onChange={e => this.onValueChange(e)}>
								<option value="productId">按商品ID查询</option>
								<option value="productName">按商品名称查询</option>
							</select>
						</div>
						<div className="form-group">
							<input name="searchKeyword" type="text" className="form-control" placeholder="查询条件" 
									onChange={e => this.onValueChange(e)} onKeyUp={e => this.onKeyupSearch(e)} />
						</div>
							<button className="btn btn-primary" onClick={e => this.onSearch()}>搜索</button>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchComponent;