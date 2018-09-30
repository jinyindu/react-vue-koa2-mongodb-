/***  
 * 首页头部内容
*/
import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const { bgImage,addClass } = this.props
        return(
                <header id="page-header" className={`page__header ${ addClass ? 'page__header--small':''}`} style={bgImage}>
                    <nav className="page__navbar">
                        <div className="page__container navbar-container">
                            <h1 className="page__logo" title="Tony Du" alt="Tony Du">
                                TONYDU
                            </h1>
                            <nav className="page__nav">
                                <ul className="nav__list clearfix">
                                    <li className="nav__item"><a href="/" alt="首页" title="首页">首页</a></li>
                                    <li className="nav__item"><a href="/about" alt="关于" title="关于">关于</a></li>
                                </ul>
                            </nav>
                            <button className="page__menu-btn" type="button">
                                <i className="iconfont icon-menu"></i>
                            </button>
                        </div>
                    </nav>
                    <section className="page__info">
                        <h1 className="info__title">TONYDU BLOG</h1>
                        <hr className="info__hr"/>
                        <p className="info__desc">前端日常学习与兴趣交流</p>
                    </section>
                </header>
        )
    }
}

export default Header
