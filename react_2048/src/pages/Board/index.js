/*
 * @Author: your name
 * @Date: 2020-11-27 10:41:59
 * @LastEditTime: 2020-11-27 10:41:59
 * @LastEditors: Please set LastEditors
 * @Description: 游戏盘组件，仅显示数据
 * @FilePath: \src\pages\play\index.js
 */
import React from 'react'
import '../Board/play.css'


function Square(props) {
    const data = props.value;
    const color = "n" + data;
    var rowClass = 'gride-cell ' + color;
    return (
        <div className={rowClass}>
            {props.value}
        </div>
    );
}

export default class Board extends React.Component {


    renderSquare(i, j) {

        return (
            <Square
                value={this.props.current[i][j]}
            />
        );
    }

    render() {

        return (
            <div className="main">
                <header>
                    <h1>当前分数{this.props.score}</h1>
                </header>

                <div className="game">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}


                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}


                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}


                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}

                </div>

            </div>
        );
    }
}