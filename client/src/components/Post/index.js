import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class Post extends React.Component{
    constructor(props){
        super(props)
    }
    static props = {
        dataItem : PropTypes.object
    }

    render(){

        const { title,author,subtitle,meta,tags,cover,_id } = this.props.dataItem
        const month = new Date(meta.createAt).getMonth()+1, day = new Date(meta.createAt).getDate()
     
        return (
            <div className="page__post">
                <article className="page__mini-article">
                    <div className="mini-article__cover">
                        <img src={cover} alt="" />
                        <div className="mini-article__date">
                            <span className="date__day">{day}</span>
                            <span className="date__month">{month}月</span>
                        </div>
                        <Link to={`/detail/${_id}`} className="iconfont icon-enter"></Link>
                    </div>
                    <div className="mini-article__info">
                        <h3 className="mini-article__title">
                            <Link to={`/detail/${_id}`}>{title}</Link>
                        </h3>                
                        <p className="mini-article__author">
                            作者：
                            <span>
                                <Link to="/">
                                     <span>{author}</span>
                                </Link>
                            </span>                
                        </p>                
                        <p className="min-article__desc">
                            {subtitle}
                        </p>
                        <div className="min-article__tags">
                            <i className="iconfont icon-tab"></i>
                            <ul className="tags__list clearfix">
                                { 
                                    tags.map((item,index) => {
                                       return <li className="tags__item" key={index}><Link to={`/tag/${item.name}`}>{item.name}</Link></li>
                                    })
                                }
                            </ul>
                        </div>    
                                    
                    </div>                   
                </article>
            </div>
        )
    }
}

export default Post