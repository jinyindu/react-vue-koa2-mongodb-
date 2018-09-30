import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import asyncComponent from '../utils/asyncComponent';
/** 首页 **/

const Home = asyncComponent(() => import(/* webpackChunkName: "index" */'../containers/Home/index').then(module => module.default), {name: 'Home'});
const Categories = asyncComponent(() => import(/* webpackChunkName: "index" */'../containers/Categories/index').then(module => module.default), {name: 'Categories'});
const SearchPage = asyncComponent(() => import(/* webpackChunkName: "index" */'../containers/Search/index').then(module => module.default), {name: 'SearchPage'});
const TagPage = asyncComponent(() => import(/* webpackChunkName: "index" */'../containers/Tags/index').then(module => module.default), {name: 'TagPage'});
const Details = asyncComponent(() => import(/* webpackChunkName: "index" */'../containers/Details/index').then(module => module.default), {name: 'Details'});
const About = asyncComponent(() => import(/* webpackChunkName: "index" */'../containers/About/index').then(module => module.default), {name: 'About'});
const ErrPage = asyncComponent(() => import(/* webpackChunkName: "index" */'../components/404/404').then(module => module.default), {name: 'ErrPage'});

class App extends React.Component{
    constructor(props,context){
        super(props,context)
        this.state = {
            initialDone: true
        }
    }

    render (){
        let Routes =(
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/categories/:categoryid" component = { Categories } />
                <Route path="/search/:key" component= { SearchPage  }/>
                <Route path="/tag/:key" component = {TagPage} />
                <Route path="/detail/:id" component = {Details} />
                <Route path="/about" component ={About} />

                <Route component={ErrPage}></Route>
            </Switch>
        );
        return (
            <Router>
                <div>
                    { this.state.initialDone? Routes:(<div>加载中...</div>) }
                </div>
            </Router>
        )
    }
}

export default App;