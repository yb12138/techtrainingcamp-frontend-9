/*
 * @Author: your name
 * @Date: 2020-11-24 21:29:23
 * @LastEditTime: 2020-11-26 09:15:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\store\index.js
 */
import { createStore, applyMiddleware} from 'redux';
import reduxWebsocket from '@giantmachines/redux-websocket';
import { reducer } from '../reducer';
const reduxWebsocketMiddleware = reduxWebsocket();
const store=createStore(reducer,applyMiddleware(reduxWebsocketMiddleware));
export default store;

