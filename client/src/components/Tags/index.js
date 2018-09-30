import React from 'react';
import { Link } from 'react-router-dom';

class Tags extends React.Component{

    render(){
        const tagsList = this.props.tagData

        return (
            <div className="sidebar__block">
                <div className="block__title">文章标签</div>
                <ul className="block-list tag-list clearfix">
                {
                    tagsList.map((v,index) => {
                        return (
                            <li className="tag-item" key= { index }>
                                <Link to={`/tag/${v.name}`} className="tag-link">{v.name}</Link>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

export default Tags