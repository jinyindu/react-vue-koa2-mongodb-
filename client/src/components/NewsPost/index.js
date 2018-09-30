import React from 'react';
import { Link } from 'react-router-dom';

class NewsPost extends React.Component{

    render(){
        const PostsData = this.props.PostsData

        return(
            <div className="sidebar__block">
                <h3 className="block__title">最新文章</h3>
                <ul className="block-list latest-post-list">
                {
                    PostsData && PostsData.map((item,index) => {
                        return (
                            <li className="latest-post-item" key={index} >
                                <Link to={`/detail/${item._id}`}>
                                    <div className="item__cover">
                                        <img src={item.cover} alt={item.title}/>
                                    </div>
                                    <div className="item__info">
                                        <h3 className="item__title">{item.title}</h3>
                                        <span className="item__text">{ item.meta.createAt }</span>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
                   
                </ul>
            </div>
        )
    }
}

export default NewsPost