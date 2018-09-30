/**
 * 文章单个项
 */
import React from "react";


/*** components */
import Post from '../Post/index';

class Posts extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { PostsData } = this.props
        return (
            <div className="page__content">
                <div className="page__posts clearfix">
                    { PostsData && PostsData.length>0 ?
                        PostsData.map((item,index) => {
                           return (
                                <Post dataItem={item} key={index}/>
                           )
                        }): <p>无数据</p>
                    }
                </div>
            </div>
        )
    }
}

export default Posts