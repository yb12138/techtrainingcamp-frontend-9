/**
 * 小型Board组件,主要直接供展示使用
 */
import React from 'react'
import '../Board/play.css'


function Square(props) {
    const data = props.value;
    const color = "n" + data;
    var rowClass = 'gride-cell-smell ' + color;
    return (
        <div className={rowClass}>
            {props.value}
        </div>
    );
}

export default class SmellBoard extends React.Component {

    renderSquare(i, j) {

        return (
            <Square
                value={this.props.current[i][j]}
            />
        );
    }

    render() {
        return (
            <div>
                <h5>当前分数{this.props.score}</h5>
                <div className="game_smell">

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

