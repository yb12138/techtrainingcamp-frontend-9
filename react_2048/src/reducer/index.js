/*
* 
 * @Author: your name
 * @Date: 2020-11-24 21:21:12
 * @LastEditTime: 2020-11-27 10:31:56
 * @LastEditors: Please set LastEditors
 * @Description: 全局状态管理，存储房间号，房间内用户信息，以及各用户当前棋盘
 * @FilePath: \src\reducer\index.js
 */

const initState={
    username:null,
    rooms:[],
    current:[],
    roomID:[],
    roomInfo:null,
    status:'ONLINE',
    Game_Status:0,
}
exports.reducer=(state=initState,action)=>{
    switch(action.type){
        case 'add_action':
            return{
                count:state.count+1
            }
        case 'REDUX_WEBSOCKET::CONNECT':
            console.log("CONNECT",action);
            return state;
        case 'REDUX_WEBSOCKET::SEND':
            console.log("SEND",action);
            return state;
        
        case 'REDUX_WEBSOCKET::OPEN':
            return state;
        case 'REDUX_WEBSOCKET::MESSAGE':
            const data=eval('('+action.payload.message+')');
            switch(data.type){
                case 'Rooms': 
                    return Object.assign({},state,{rooms:eval('('+data.content+')') });
                case 'USERINFO':
                    var user=eval('('+data.content+')');
                    return Object.assign({},state,{roomID:user.roomID,status:user.status,username:user.username,score:user.score });
                case 'START':
                    return Object.assign({},state,{Game_Status:2});
                case 'RoomInfo':
                    var room=eval('('+data.content+')');
                    console.log("RoomInfo",room);
                    return Object.assign({},state,{roomInfo:room});
            }
            return state;
        case 'REDUX_WEBSOCKET::CLOSED':
            console.log("关闭 websocket 连接...");
            return state;
        default:
            return state;
    }
   
};