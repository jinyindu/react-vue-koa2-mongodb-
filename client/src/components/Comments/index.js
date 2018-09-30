//评论
import React from 'react';

class Comments extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div id="comment-container">
                <div className="gt-container">
                    <div className="gt-meta">
                        <span className="gt-counts">
                            6条评论
                        </span>
                        <div className="gt-user">
                            <div className="gt-user-inner">
                                <span className="gt-user-name">未登录用户</span>
                            </div>
                        </div>
                    </div>
                    <div className="gt-header">
                        <div className="gt-header-comment">
                            <textarea className="gt-header-textarea" placeholder="说点什么"></textarea>
                        </div>
                    </div>
                    <div className="gt-comments">
                        <div>
                            <div className="gt-comment gt-comment-admin">
                                <div className="gt-avatar gt-comment-avatar">
                                    <img src="https://avatars1.githubusercontent.com/u/24197735?v=4" alt="头像" />>
                                </div>
                                <div className="gt-comment-content">
                                    <div className="gt-comment-header">
                                        <span>Tony</span>
                                        <span className="gt-comment-text">发表于</span>
                                        <span className="gt-comment-date">4 个月前</span>
                                    </div>
                                    <div className="gt-comment-body markdown-body">
                                        <p>测试评论</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Comments