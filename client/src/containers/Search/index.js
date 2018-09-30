/**
 * 搜索页面
 */
import React from 'react';
import { connect } from 'react-redux';

/*actions*/
import * as blog from '../../redux/actions/blog.action'
import * as tag from '../../redux/actions/tags.action'
//components
import Header from '../../components/Header/index';
import Posts from '../../components/Posts/index';
import Footer from '../../components/Footer/index';
import SideBar from '../../components/SideBar/index'
import Pagecontainer from '../../components/Paginator/index'

@connect(
    state =>({
        blogs: state.blogs,
        category: state.category,
        tags: state.tags
    }),
    { ...blog,...tag }
)

class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addClass: false,
            page: 1,                //当前页面
            pageSize: 12,           //每页显示记录数
            totalPage:0,
            keyword:''
        }
        this.getCurrentPage = this.getCurrentPage.bind(this)
    }

    componentDidMount(){
        /** 数据请求 */
        this.getData()
    }
    componentWillReceiveProps(nextProps){
        const keyword = nextProps.match.params.key
        
        if(keyword!==this.state.keyword){
            this.getData()
        }
    }

    //获取数据
    getData(){
        let query = this.props.match.params
        let params = {
            page: this.state.page,
            pageSize: this.state.pageSize
        }
        if(query && query.key){
            params.key = query.key
            this.setState({ keyword: query.key })
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
        let bgImage = { backgroundImage: 'url(http://pdl1m8qs9.bkt.clouddn.com/FrTAcTMBnt6tY9lXKTaUSs5y2QPA)' }
        const DataList = this.props.blogs.pageData
        const totalPage = DataList ? DataList.pageCount : 0

        return (
            <div>
                <Header bgImage={bgImage}/>
                <div className="page__container page__main">
                    <div className="page__left">
                        { 
                            DataList ? <Posts PostsData={DataList.list} /> : ""
                        }
                        {
                            <Pagecontainer 
                                totalPage={ totalPage }
                                pageCallbackFn={ this.getCurrentPage }>
                            </Pagecontainer>
                        }
                    </div>
                    <SideBar/>
                </div>
                <Footer />
            </div>
        );
    }
}

export default SearchPage