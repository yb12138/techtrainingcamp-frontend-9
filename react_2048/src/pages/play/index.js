import React from 'react'
import {Button, Layout} from 'antd';
import Board from '../Board';
import Rule from './rule'
import {connect} from 'react-redux';
import {send} from '@giantmachines/redux-websocket';
import store from '../../store'
import {Row, Col} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import PlayerList from '../PlayerList';
import {Divider} from 'antd';
import Clock from "../Clock/Clock";
import Count from '../Count/index'

class Play extends React.Component {
    constructor(props) {
        super(props);
        console.log("Board 初始化", props);
        let squares = Array(4).fill(0).map(_ => {
            return new Array(4).fill(0)
        });
        this.state = {
            current: squares,
            merges: Array(4).fill(0).map(_ => {
                return new Array(4).fill(0)
            }),
            score: 0,
            status: 0,
            flag: 0,
            isMove: 0,
            roomID: 0,
            rank: true,
            countstart: false,
            seconds:0,
            minutes: 0,
            isOver: false
        }
    }
    sendMessage(temp) {
        store.dispatch(send({
            type: "UPLOAD",
            content: JSON.stringify({
                "roomID": this.props.roomID,
                "score": temp.score,
                "current": temp.squares
            })
        }));
        this.setState(
            Object.assign({},this.state,
                {
                    current: temp.squares,
                    merges: Array(4).fill(0).map(_ => {
                        return new Array(4).fill(0)
                    }),
                    score: temp.score,
                    status: 2,
                    flag: 1,
                    isMove: 0
                }
            )
        )
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDoneEvent)
    }
    keyDoneEvent=(e)=>{
        console.log(e.key);
        if (this.state.status < 1) {
            return;
        }
        switch (e.key) {
            case 'ArrowLeft':   //左
                var temp = Rule.moveLeft(this.state.current, this.state.merges, this.state.score);
                if (temp.isMove === 1) {
                    this.sendMessage(temp);
                }
                break;
            case 'ArrowUp': //上
                var temp = Rule.moveUp(this.state.current, this.state.merges, this.state.score);
                if (temp.isMove === 1) {
                    this.sendMessage(temp);
                }
                break;
            case 'ArrowRight': //右
                var temp = Rule.moveRight(this.state.current, this.state.merges, this.state.score);
                if (temp.isMove === 1) {
                    this.sendMessage(temp);
                }

                break;
            case 'ArrowDown':    //下
                var temp = Rule.moveDown(this.state.current, this.state.merges, this.state.score);
                if (temp.isMove === 1) {
                    this.sendMessage(temp);
                }
                break;
            default:
                break;
        }
    }
    

    //点击
    sendStart(val) {
        store.dispatch(send({type: "Start", content: JSON.stringify({"roomID": val})}));
        this.setState(Object.assign({},this.state,{status:1}))
    }

    getInfo(){
        store.dispatch(send({type: "GetInfo"}));
    }

    exitGame(){
        store.dispatch(send({type:"LEAVE"}));
    }
    gameOver(){
        this.setState(Object.assign({},this.state,{status:-1,isOver:true}));
        document.removeEventListener('keydown',this.keyDoneEvent);
    }

    startGame() {
        let squares = Array(4).fill(0).map(_ => {
            return new Array(4).fill(0)
        });
        squares = Rule.generateOneNumber(squares); //初始化随机生成两个数
        squares = Rule.generateOneNumber(squares);
        this.setState(
            Object.assign({},this.state,{
                current: squares,
                merges: Array(4).fill(0).map(_ => {
                    return new Array(4).fill(0)
                }),
                score: 0,
                status: 2,
                flag: 1,
                isMove: 0,
                countstart: true
            })
            );
    }
    getState = ()=>{
        this.setState(Object.assign({},this.state,{status:-1,isOver:true}))
    }


    render() {
        //离开房间
        if(this.props.status==="ONLINE"){
            this.props.history.push('/home');
        }
        const roomtitle = "欢迎来到" + this.props.roomID + "号房间";
        let otherplays = [];
        let roomInfo=this.props.roomInfo;
        let rooms=this.props.rooms;
        if(!roomInfo){
            rooms.forEach(element => {
                if(element.roomId===this.props.roomID){
                roomInfo=element;
                }
            });
        }

        if (roomInfo && roomInfo.playerList) {
            otherplays = roomInfo.playerList; //排行榜
        }
        otherplays.sort(sortScore);
        if (this.props.Game_Status === 2 && this.state.flag === 0) {
            this.startGame();
        }
        let level=roomInfo.actualPlayerNumber-roomInfo.preNumber;
        let start = null;
        switch (this.state.status) {
            case 0:
                start = (<Button style={{margin:'auto'}} onClick={() => this.sendStart(this.props.roomID)}>准备</Button>)
                break;
            case 1:
        start = (<div style={{margin:'auto'}}>已准备,尚有{level}位玩家未准备</div>)
                break;
            default:break;
        }
        const _this = this;

        return (
            <Layout className="layout" style={{height: '100%'}}>
                <Row justify="center" align="middle">
                    <Col span={12} style={{marginTop: '15px'}}>
                        <h2 style={{textAlign: 'right', margin: '0'}}>{roomtitle}</h2>
                    </Col>
                    <Col span={10} style={{textAlign: 'right'}}>
                        <Button onClick={()=>{this.exitGame(this.props.history)}}>退出房间</Button>
                    </Col>
                </Row>
                <Divider style={{margin: '15px 0 0 0'}}/>
                <Content>

                    <Row align="top" style={{'height': '100%'}}>
                        <Col span={6} style={{textAlign: 'center'}}>
                            <PlayerList playerList={otherplays}/>
                        </Col>
                        <Divider type="vertical" style={{'height': '100%'}}/>
                        <Col span={17}>
                            <Row align="top">
                                <Col style={{textAlign:'right'}} span={24}>
                                    <Count endTime={5000} gameOver={_this.getState} />
                                </Col>
                            </Row>
                            <Row align="top">
                            <Col span={24}>
                            <Board current={this.state.current} score={this.state.score}/>
                            {start}
                            </Col>
                            </Row>
                        </Col>

                    </Row>
                </Content>
            </Layout>


        )
    }

}
function sortScore(a,b){  
    return b.score-a.score  
 }
const mapStateToProps = (state) => {

    return state;
}

export default connect(mapStateToProps)(Play)