import React from 'react'
import { Button, Layout } from 'antd';
import Board from '../Board';
import  Rule from './rule'
import {connect} from 'react-redux';
import { send } from '@giantmachines/redux-websocket';
import store from '../../store'
import { Row, Col,List } from 'antd';
import { Content, Header,Footer } from 'antd/lib/layout/layout';
import PlayerList from '../PlayerList';

import { Divider } from 'antd';


 class Play extends React.Component{
    constructor(props){
        super(props);
        console.log("Board 初始化",props);
        let squares=Array(4).fill(0).map(_ => { return new Array(4).fill(0) });
        this.state = {
            current: squares,
            merges: Array(4).fill(0).map(_ => { return new Array(4).fill(0) }),
            score:0,
            status:0,
            flag:0,
            isMove:0,
            roomID:0,
            rank:true,
        }
    }

    componentDidMount(){
        document.addEventListener('keydown',function(e){//渲染完成后绑定键盘事件
            console.log(e.key);
            if(this.state.status<1){  
                return;
            }
             switch(e.key){
                 case 'ArrowLeft':   //左
                       var temp=Rule.moveLeft(this.state.current,this.state.merges,this.state.score);
                       if(temp.isMove==1){
                        store.dispatch(send({ type:"UPLOAD",content:JSON.stringify({"roomID":this.props.roomID,"score":temp.score,"current":temp.squares})}));
                        this.setState({
                            current:temp.squares,
                             merges:Array(4).fill(0).map(_ => { return new Array(4).fill(0) }),
                             score:temp.score,
                             status:2,
                             flag:1,
                            isMove:0}) 
                        }
                       
                 break;
                 case 'ArrowUp': //上
                        var temp=Rule.moveUp(this.state.current,this.state.merges,this.state.score);
                        if(temp.isMove==1){
                            store.dispatch(send({ type:"UPLOAD",content:JSON.stringify({"roomID":this.props.roomID,"score":temp.score,"current":temp.squares})}));
                            this.setState({
                                current:temp.squares,
                                merges:Array(4).fill(0).map(_ => { return new Array(4).fill(0) }),
                                score:temp.score,
                                status:2,
                                flag:1,isMove:0}) 
                        }
                        
                       
                 break;
                 case 'ArrowRight': //右
                         var temp=Rule.moveRight(this.state.current,this.state.merges,this.state.score);
                         if(temp.isMove==1){
                            store.dispatch(send({ type:"UPLOAD",content:JSON.stringify({"roomID":this.props.roomID,"score":temp.score,"current":temp.squares})}));
                            this.setState({
                                current:temp.squares,
                                 merges:Array(4).fill(0).map(_ => { return new Array(4).fill(0) }),
                                 score:temp.score,
                                 status:2,
                                 flag:1,isMove:0})   
                        }
                          
                 break;
                 case 'ArrowDown':    //下
                        var temp=Rule.moveDown(this.state.current,this.state.merges,this.state.score);
                        if(temp.isMove==1){
                            store.dispatch(send({ type:"UPLOAD",content:JSON.stringify({"roomID":this.props.roomID,"score":temp.score,"current":temp.squares})}));
                            this.setState({
                                current:temp.squares,
                                merges:Array(4).fill(0).map(_ => { return new Array(4).fill(0) }),
                                score:temp.score,
                                status:2,
                                flag:1,isMove:0})  
                        }
                        
                 break;
                 default:
                     break;
             }   
        }.bind(this))
    }
    //点击
    sendStart(val){
        store.dispatch(send({ type:"Start",content:JSON.stringify({"roomID":val})}));
    }
    startGame(){
      let squares=Array(4).fill(0).map(_ => { return new Array(4).fill(0) });
      squares=Rule.generateOneNumber(squares); //初始化随机生成两个数
      squares=Rule.generateOneNumber(squares);
      this.setState ( {
        current: squares,
        merges: Array(4).fill(0).map(_ => { return new Array(4).fill(0) }),
        score:0,
        status:2,
        flag:1,
        isMove:0,
      });
    }
   
    
    render(){
    const roomtitle="欢迎来到"+this.props.roomID+"号房间";
    let otherplays=[];
    if(this.props.roomInfo&&this.props.roomInfo.playerList){
        otherplays=this.props.roomInfo.playerList; //排行榜
    }
    
    if(this.props.Game_Status===2&&this.state.flag==0){
        this.startGame();
    }
    let start=null;
    switch(this.state.status){
        case 0:start=(<Button onClick={()=>this.sendStart(this.props.roomID)}>准备</Button>)
             break;
        case 1:start=(<Button>已准备</Button>)
             break;
    }
return(
    <Layout className="layout" style={{height:'100%'}} >
      <Row justify="center" align="middle" >
         <Col span={12} style={{marginTop:'15px'}}>
         <h2 style={{textAlign:'right',margin:'0'}}>{roomtitle}</h2>

          </Col>
          <Col span={10} style={{textAlign:'right'}} >
          <Button >退出房间</Button>
          </Col>
      </Row>
      <Divider style={{margin:'15px 0 0 0'}} />
     <Content>

     <Row  align="top" style={{'height':'100%'}}>
            <Col span={6} style={{textAlign:'center'}}>
            <PlayerList playerList={otherplays} />
            
            </Col>
            <Divider type="vertical" style={{'height':'100%'}} />
             <Col span={17} >
             <Board   current={this.state.current} score={this.state.score}></Board>
             {start}
        </Col>
        
    </Row>
     </Content>
    </Layout>
   
    
    )
    }
    
}

const mapStateToProps=(state)=>{
    
    return state;
  }
  
export default connect(mapStateToProps)(Play)