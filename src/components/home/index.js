import React from 'react';
import { connect } from 'react-redux';
// import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';
import * as actions from '../../actions';
// import config from '../../config';
if(typeof __CLIENT__ != 'undefined'){
	require('./index.scss');
}



class Home extends React.Component{
	constructor(props) {
		super(props);
		this.page = 1;
		this.state = {
			loading:false
		}
	}
	handleMore(){
		let {state, dispatch} = this.props;
		this.setState({loading:true});
  		Promise.all([
    	  dispatch(actions.fetchHome("page="+(++this.page)))
  		]).then(() => {
  			this.setState({loading:false});
  		});
		
	}
	componentWillMount(){
		// this.getArticle();
	}
	componentDidMount() {
		
	}
	render(){
		let {state} = this.props;
		let home = state.home;
		return (
			<div className="home">
				<div className="home-nav">
					<div className="nav-wrap">
						<h1 className="nav-title">全栈学习</h1>
					</div>
					
				</div>
				<div className="home-list">
					<div className="list-title">最新文章</div>
					<ul className="list-content">
						{
							home.data && home.data.length ? home.data.map((value,key) => (
								<li key={key}>
									<a href={value.out_url}>
										<p>{value.title}</p>
										<span>{value.user_name}</span><em>{value.updated_at}</em>
									</a>
								</li>
							)) : null
						}
					</ul>
				</div>
				<div className="home-more"><a href="javascript:;" onClick={this.handleMore.bind(this)}>{this.state.loading ? "努力加载中..." : "查看更多"}</a> </div>

				<footer>
					<div className="home-footer">
						<p className="text-center">
						<a href="/about">关于我们</a>
						<a href="/download">全栈学习头条客户端</a>
						<a href="/partner">合作伙伴</a>
						<a target="_blank" href="http://job.manong.io/">程序员招聘</a>
						<a href="/tags">全栈学习头条知识库</a>
					</p>
					<p className="text-center">© 2013-2016 杭州鹊桥科技信息技术有限公司 版权所有 苏ICP备14017389号-2</p>
					</div>
				</footer>
			</div>
		);
	}
}
Home = connect((state) => ({state}))(Home);
export default Home;