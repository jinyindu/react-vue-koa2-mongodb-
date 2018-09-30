/***  
 * 首页头部内容
*/
import React from 'react';

class Nav extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
                <header id="page-header" className="page__small-header page__header--small">
                    <nav className="page__navbar">
                        <div className="page__container navbar-container">
                            <a className="page__logo" title="Tony Du" alt="Tony Du">
                                
                            </a>
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
                </header>
        )
    }
}

export default Nav
