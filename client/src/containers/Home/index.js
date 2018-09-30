/** 
 * 博客首页
*/
import React from "react";
import { connect } from 'react-redux';

/*actions*/
import * as blog from '../../redux/actions/blog.action'
import * as tag from '../../redux/actions/tags.action'

/*component*/
import Header from '../../components/Header/index';
import Posts from '../../components/Posts/index';
import Footer from '../../components/Footer/index';
import Pagecontainer from '../../components/Paginator/index'
import SideBar from '../../components/SideBar/index'

@connect(
    state =>({
        blogs: state.blogs,
        category: state.category,
        tags: state.tags
    }),
    { ...blog,...tag }
)
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            addClass: false,
            page: 1,                //当前页面
            pageSize: 12,           //每页显示记录数
            totalPage:0
        }
        this.getCurrentPage = this.getCurrentPage.bind(this)
    }

    componentWillMount(){
        window.addEventListener('scroll',this.handleScroll)
        /** 数据请求 */
        this.getData()
    }

    //获取数据
    getData(){
        setTimeout(() => {
            this.props.getBlogsList({
                page: this.state.page,
                pageSize: this.state.pageSize
            })
        },100)
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }
    //分页
    getCurrentPage(currentPage) {
        this.setState({
            page: currentPage
        })
        this.getData()
    }
    handleScroll = () => {
        let _this = this
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if(scrollTop>50){
            _this.setState({
                addClass: true
            })
        }else{
            _this.setState({
                addClass: false
            })
        }
    }

    render(){
        let bgImage = { backgroundImage: 'url(http://pdl1m8qs9.bkt.clouddn.com/FrTAcTMBnt6tY9lXKTaUSs5y2QPA)' }
        const DataList = this.props.blogs.pageData

        return (
            <div>
                <Header bgImage={bgImage} addClass = { this.state.addClass }/>
                <div className="page__container page__main">
                    <div className="page__left">
                        { 
                            DataList ? <Posts PostsData={DataList.list} /> : ""
                        }
                        {
                            DataList ? 
                            <Pagecontainer 
                                totalPage={DataList.pageCount}
                                pageCallbackFn={this.getCurrentPage}>
                            </Pagecontainer> : ""
                        }
                        
                    </div>
                    <SideBar />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home