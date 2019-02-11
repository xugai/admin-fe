import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';
class RichtextEditor extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.loadRichtextEditor();
	}
	componentWillReceiveProps(nextProps){
		let isNewDetail = this.simditor.getValue() !== nextProps.detail;
		if(isNewDetail){
			this.simditor.setValue(nextProps.detail);
		}
	}
	loadRichtextEditor(){
		let element = this.refs['textarea'];
		this.simditor = new Simditor({
			textarea: $(element),
			defaultValue: this.props.placeholder || '请输入内容',
			upload:{
				url: '/manage/product/richtext_img_upload.do',
				fileKey: 'upload_file',
				leaveConfirm: '文件正在上传中,确定要离开当前页面吗?'
			}
		});
		this.bindEditorChangeEvent();
	}
	// 绑定富文本编辑器的内容改变事件
	bindEditorChangeEvent(){
		this.simditor.on('valuechanged', e => {
			this.props.onContextChange(this.simditor.getValue());
		});
	}
	render(){
		return (
			<div className="richtext-editor">
				<textarea ref="textarea"></textarea>
			</div>			
		);
	}
}

export default RichtextEditor;