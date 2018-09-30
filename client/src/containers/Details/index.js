/**
 * 文章详情页
 */
import React from 'react';
import { connect } from 'react-redux'
/*component*/
import Nav from '../../components/Nav/index';
import Footer from '../../components/Footer/index';
import Detail from '../../components/Detail/index';
import SideBar from '../../components/SideBar/index'

//utils
import tools from '../../utils/tools'

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
class Details extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            id: 0
        }
    }
    componentWillMount(){
        let query = this.props.match.params
        this.props.getBlogDetail({ id: query.id })
        this.setState({ id: query.id })
    }

    componentWillReceiveProps(nextProps){
        let query = nextProps.match.params
        if (query.id !== this.state.id) {
            this.setState({ id: query.id },()=>{
                this.props.getBlogDetail({ id: query.id })
            })
        }
    }

    render(){
        const detail = this.props.blogs.detailData

        return (
            <div>
                <Nav />
                <div className="page__container page__main">
                    {
                        !tools.isEmptyObject(detail) ? <Detail dataItem = { detail }/> : <div className="page__content detail">写点什么...</div>
                    }
                    <SideBar />
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Details