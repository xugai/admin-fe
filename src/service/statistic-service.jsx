import MUtil from 'util/mm.jsx';

const mmall_util = new MUtil(); 

class Statistic{
	getCount(){
		return mmall_util.request({
			url: '/manage/statistic/base_count.do'
		});
	}
}

export default Statistic;