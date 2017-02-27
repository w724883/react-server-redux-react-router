import React from 'react';
import ReactDOMServer from 'react-dom/server'
// import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';
// import './index.scss';

class Index extends React.Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	getArticle(){
		return fetch('http://localhost:1024/home').then(res => res.json()).then(json => {
			this.setState(json);
		})
	}
	componentWillMount(){
		this.getArticle();
	}
	render(){
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
							this.state.data && this.state.data.length ? this.state.data.map((value,key) => (
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
				<div className="home-loading text-center">
					<i className="fa fa-spinner fa-spin"></i>寡人正在拼命加载中....
				</div>
				<div className="home-more"><a href="javascript:;">{this.state.current_page ? this.state.current_page : 0} 查看更多</a> </div>

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

module.exports = ReactDOMServer.renderToString(<Index/>);