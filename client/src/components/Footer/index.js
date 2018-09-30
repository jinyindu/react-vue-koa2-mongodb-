/**
 * 博客底部
 */
import React from 'react';

class Footer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <footer className="page__footer">
                <section className="footer__top" >
                    <div className="page__container footer__container">
                        <div className="footer-top__item footer-top__item--2">
                            <h3 className="item__title">关于</h3>
                            <div className="item__content">
                                <p className="item__text">本站是基于React Vue koa2 webpack mongodb搭建的博客系统，积累前端学习中的点点滴滴。</p>
                                <ul className="footer__contact-info">
                                    <li className="contact-info__item">
                                        <i className="iconfont icon-address"></i>
                                        <span>ShangHai Province, China</span>
                                    </li>
                                    <li className="contact-info__item">
                                        <i className="iconfont icon-email2"></i> 
                                        <span>dujinyin520@163.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-top__item footer__image">
                            
                        </div>
                        <div className="footer-top__item">
                            <h3 className="item__title">构建工具</h3>
                            <div className="item__content">
                                <ul className="footer-top__list">
                                    <li className="list-item">
                                        <a href="https://reactjs.org/" title="React" target="_blank">React</a>
                                    </li>
                                    <li className="list-item">
                                        <a href="https://webpack.js.org/" title="WebPack" target="_blank">webpack</a>
                                    </li>
                                    <li className="list-item">
                                        <a href="https://koa.bootcss.com/" title="Koa2" target="_blank">Koa2</a>
                                    </li>
                                    <li className="list-item">
                                        <a href="https://docs.mongodb.com/" title="mongodb" target="_blank">mongodb</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer__bottom">
                    <div className="page__container footer__container">
                        <p className="footer__copyright">© 2018 copyRight by dujinyin.</p>
                    </div>
                </section>
            </footer> 
        )
    }
}
export default Footer