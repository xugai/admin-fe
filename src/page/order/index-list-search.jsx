import React from 'react';

class SearchComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchKeyword: ''
		}
	}
	onValueChange(e){		
		this.setState({
			searchKeyword: e.target.value
		});		
	}
	onSearch(){
		this.props.onSearch(this.state.searchKeyword);
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
							<select name="searchType" className="form-control">
								<option value="orderNo">按订单号查询</option>
							</select>
						</div>
						<div className="form-group">
							<input name="searchKeyword" type="text" className="searchKeyword form-control" placeholder="按订单号查询" 
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