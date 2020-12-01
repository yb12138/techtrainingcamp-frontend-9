const { reducer } = require("../reducer");

/*
 * @Author: your name
 * @Date: 2020-11-24 21:00:56
 * @LastEditTime: 2020-11-24 21:56:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\action\index.js
 */
const sendAction =()=>{
    
    return{
        type: "send_type",
        value: "我是一个"
    };
}
module.exports={
    sendAction
}
