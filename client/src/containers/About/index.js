import React from 'react';
import { Link } from 'react-router-dom';

/*component*/
import Header from '../../components/Header/index';


class About extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let bgImage = { backgroundImage: 'url(http://pdl1m8qs9.bkt.clouddn.com/FrTAcTMBnt6tY9lXKTaUSs5y2QPA)' }

        return (
            <div>
                <Header bgImage={bgImage}/>
                <div className="page__container page__main">
                    <div className="page__content">
                        <div className="content__container">
                            <h3 id="关于我">
                                <Link to="/about" /> 关于我
                            </h3>
                            <blockquote>
                                <p>一个有着百度情结的小菜鸟，在前端路上不停爬行。</p>
                            </blockquote>
                            <p>偏爱前端开发，固执己见，正在尝试进入后端领域。</p>
                            <p>以下是我的联系方式</p>
                            <ul>
                                <li>邮件: <a href="dujinyin520@163.com" target="_blank" rel="external">dujinyin520@163.com</a></li>
                                <li>github: <a href="https://github.com/jinyindu" target="_blank" rel="external">https://github.com/jinyindu</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About