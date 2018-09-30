/**
 * 文章分类
 */
import React from 'react';
import { withRouter} from 'react-router-dom';

@withRouter
class ArticleCategory extends React.Component{

    constructor(props){
        super(props)
        this.handleCategory = this.handleCategory.bind(this)
    }
    handleCategory(v){
        this.props.history.push(`/categories/${v._id}`)
    }

    render(){
        return (
            <div className="sidebar__block">
                <h3 className="block__title">文章分类</h3>
                <ul className="block-list">
                    {
                        this.props.CategoryData ? this.props.CategoryData.map((v,index) => {
                           return (
                               <li className="block-list-item" key={index}>
                                    <a href="javascript:;" className="block-list-link" onClick={ () =>this.handleCategory(v)}>{v.name}</a>
                                    <span className="block-list-count">{v.count}</span>
                               </li>
                            )
                        }):null
                    }
                    
                </ul>
            </div>
        )
    }
}

export default ArticleCategory
// <Link to={`/categories/${v._id}`} className="block-list-link">{v.name}</Link>