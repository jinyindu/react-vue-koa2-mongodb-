/**
 * 文章详情页
 */
import React from 'react';
import PropTypes from 'prop-types'
import hljs from 'highlight';
import { Link } from 'react-router-dom'
import marked from 'marked'
import dateFilter from '../../utils/dateFilter'

import './index.scss';

class Detail extends React.Component{
    rawMarkup(item){
        marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
            highlight: function(code) {
				return hljs.highlightAuto(code).value;
			}
        });
        var rawMarkup = marked( item ? item : '<p>写点什么...</p>')
        return { __html: rawMarkup }
    }

    render(){
        const { title,author,content,cover,meta,tags,browse }  = this.props.dataItem
        
        return (
            <div className="page__content detail">
                <article className="page__post_d">
                    <div className="post__cover">
                        <img src={cover} alt={title} />
                    </div>
                    <header className="post__info">
                        <h1 className="post__title">{title}</h1>
                        <div className="post__mark">
                            <div className="mark__block">
                                <i className="mark__icon iconfont icon-write"></i>
                                <ul className="mark__list clearfix">
                                    <li className="mark__item">
                                        <a href="javascript:;">{author}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mark__block">
                                <i className="mark__icon iconfont icon-time"></i>
                                <ul className="mark__list clearfix">
                                    <li className="mark__item"><span>{dateFilter(meta.createAt,"YYYY-MM-DD") }</span></li>
                                </ul>
                            </div>
                            <div className="mark__block">
                                <i className="mark__icon iconfont icon-tab"></i>
                                <ul className="mark__list clearfix">
                                {
                                    tags && tags.map((v,index) => {
                                       return <li className="mark__item" key={index}><Link to="/">{v.name}</Link></li>
                                    })
                                } 
                                </ul>
                            </div>
                            <div className="mark__block">
                                <i className="mark__icon iconfont icon-eye"></i>
                                <ul className="mark__list clearfix">
                                    <li id="busuanzi_container_page_pv" className="mark__item">
                                        <span id="busuanzi_value_page_pv">{browse}</span>次
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                    <div className="post__content">
                        <div dangerouslySetInnerHTML={this.rawMarkup(content)}></div>
                    </div>
                </article>
            </div>
        )
    }
}

Detail.propTypes = {
    dataItem: PropTypes.object.isRequired
}
export default Detail