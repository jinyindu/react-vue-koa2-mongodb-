/** 
 * 博客首页
*/
import React from "react";
import { connect } from 'react-redux';

/*component*/
import Nav from '../../components/Nav/index';
import Posts from '../../components/Posts/index';
import Footer from '../../components/Footer/index';
import Pagecontainer from '../../components/Paginator/index';
import SideBar from '../../components/SideBar/index'
//actions
import * as blog from '../../redux/actions/blog.action'
import * as tag from '../../redux/actions/tags.action'

@connect(
    state =>({
        blogs: state.blogs,
        category: state.category,
        tags: state.tags
    }),
    { ...blog,...tag }
)

class Categories extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page: 1,                //当前页面
            pageSize: 12,           //每页显示记录数
            totalPage:0,
            categoryId:''
        }
        this.getCurrentPage = this.getCurrentPage.bind(this)
    }
    componentDidMount(){
        /** 数据请求 */
        this.getData()
    }
    
    componentWillReceiveProps(nextProps){
        const categoryId = nextProps.match.params.categoryid
        if(categoryId!==this.state.categoryId){
            this.setState({
                categoryId
            },()=>{
                this.getData();
            })
        }
    }
    //获取数据
    getData(){
            let query = this.props.match.params
            let params = {
                page: this.state.page,
                pageSize: this.state.pageSize
            }
            if(query){
                params.categoryId = query.categoryid
                this.setState({
                    categoryId: query.categoryid
                })
            }
        setTimeout(() => {
            this.props.getBlogsList(params)
        },100)
    }
    //分页
    getCurrentPage(currentPage) {
        this.setState({
            page: currentPage
        })
        this.getData()
    }

    render(){
        const DataList = this.props.blogs.pageData
        const totalPage = DataList ? DataList.pageCount : 0
        return (
            <div>
                <Nav />
                <div className="page__container page__main">
                    <div className="page__left">
                        { 
                            DataList ? <Posts PostsData={DataList.list} /> : ""
                        }
                        <Pagecontainer 
                            totalPage={totalPage}
                            pageCallbackFn={this.getCurrentPage}>
                        </Pagecontainer>
                        
                    </div>
                    <SideBar/>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Categories
