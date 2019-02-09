import FileUpload from './react-fileupload.jsx';
import React from 'react';

class FileUploader extends React.Component{
	render(){
		/*指定参数*/
		let options={
			baseUrl:'/manage/product/upload.do',
			dataType: 'json',
			fileFieldName: 'upload_file',
			chooseAndUpload: true,
			uploadSuccess: res => {
				this.props.onUploadSuccess(res);
			},
			uploadError: err => {
				this.props.onUploadError(err);
			}
		}
		/*调用FileUpload,传入options。然后在children中*/
		/*传入两个dom(不一定是button)并设置其ref值。*/
		return (
			<FileUpload options={options}>
				<button className="btn btn-xs btn-default" ref="chooseAndUpload">请上传图片</button>
				
			</FileUpload>
		)	        
	}
}

export default FileUploader;