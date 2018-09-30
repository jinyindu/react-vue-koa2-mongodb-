import React from 'react'
import { connect } from 'react-redux';

/*actions*/
import * as blog from '../../redux/actions/blog.action'
import * as tag from '../../redux/actions/tags.action'

//components
import Search from '../Search/index';
import Intro from '../Intro/index';
import ArticleCategory from '../ArticleCategory/index';
import NewsPost from '../NewsPost/index';
import Tags from '../Tags/index';

@connect(
    state =>({
        blogs: state.blogs,
        category: state.category,
        tags: state.tags
    }),
    { ...blog,...tag }
)
class SideBar extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
         //文章分类
         this.props.getCatrgoriesCount()
         //热门文章
         this.props.getPostTop10()
         //标签
         this.props.getAllTags()
    }

    render(){
        const categorys = this.props.category.pageData
        const newBlogs = this.props.blogs.newsDataList
        const tagsList = this.props.tags.tagList

        return (
            <aside className="page__sidebar">
                        <Search />
                        <Intro />
                        {
                            categorys ? <ArticleCategory CategoryData = { categorys }/> : ""
                        }
                        {
                            newBlogs ? <NewsPost  PostsData = {newBlogs }/> : ""
                        }
                        {
                            tagsList ?  <Tags tagData = {tagsList} /> : ""
                        }
                    </aside>
        )
    }
}

export default SideBar