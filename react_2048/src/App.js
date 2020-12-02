/*
 * @Author: your name
 * @Date: 2020-11-24 20:47:55
 * @LastEditTime: 2020-11-27 10:32:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\App.js
 */
//导入Provider组件，利用这个组件包裹我们的结构。从而达到统一维护stroe的效果
import {Provider} from 'react-redux';
import Home from './pages/home';
import Login from './pages/login';
import Play from './pages/play';
import {Router, Route, Link, NavLink, HashRouter} from 'react-router-dom'

import store from './store';


function App(props) {

    return (
        <HashRouter>
            <Provider store={store}>
                <div className="App">
                    <Route exact path="/" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/play" component={Play}/>
                </div>
            </Provider>
        </HashRouter>
    );
}


export default App;
