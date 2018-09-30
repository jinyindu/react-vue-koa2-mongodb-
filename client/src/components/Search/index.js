/**
 * 搜索
 */
import React from 'react';
import { withRouter } from 'react-router-dom'

@withRouter
class Search extends React.Component{
    constructor(props){
        super(props)
        this.onKeyPress = this.onKeyPress.bind(this)
    }
    onKeyPress(e){
        if (e.which == 13){
            this.props.history.push(`/search/${e.target.value}`)
        }
    }

    render(){
        return(
            <div id="page-search-from" className="page__search-from">
                <label className="search-form__item">
                    <input className="input" type="text" name="search" placeholder="Search..." onKeyDown={this.onKeyPress} />
                    <i className="iconfont icon-search"></i>
                </label>
            </div>
        )
    }
}

export default Search;