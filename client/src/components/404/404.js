import React from 'react'
import Nav from '../Nav/index';

class ErrPage extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="error-page" style= {{backgroundImage:'url(http://pdl1m8qs9.bkt.clouddn.com/FrTAcTMBnt6tY9lXKTaUSs5y2QPA)'}}>
                <Nav/>    
                <div className="error-page__container">
                    <div className="error-page__main">
                        <h1 className="error-page__title">404</h1>
                        <h2 className="error-page__subtitle">你访问的页面走丢了......</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrPage