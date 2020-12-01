
/*
 * @Author: yb
 * @Date: 2020-11-15 22:37:30
 * @LastEditTime: 2020-11-16 13:39:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */






function nospace(squares) {
    for ( var i = 0; i < 4; i++) 
        for ( var j = 0; j < 4; j++) 
            if (squares[i][j] === 0)
                return false;
    return true;
}


/**
 * @description: 判断数组可否左移
 * @event: 
 * @param {*} squares
 * @return {boolean} 
 */
function canMoveLeft(squares){
  for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
          if(squares[i][j]!==0&&j!==0){ 
                if(squares[i][j-1]===0||squares[i][j-1]===squares[i][j]){
                    return true;
                }
          }
      }
  }
  return false;
}


/**
 * @description: 判断数组可否右移
 * @event: 
 * @param {*} squares
 * @return {boolean} 
 */
function canMoveRight(squares){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(squares[i][j]!==0&&j!==3){ 
                  if(squares[i][j+1]===0||squares[i][j+1]===squares[i][j]){
                      return true;
                  }
            }
        }
    }
    return false;
}

/**
 * @description: 判断数组可否上移
 * @event: 
 * @param {*} squares
 * @return {boolean} 
 */
function canMoveUp(squares){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(squares[i][j]!==0&&i!==0){ 
                  if(squares[i-1][j]===0||squares[i-1][j]===squares[i][j]){
                      return true;
                  }
            }
        }
    }
    return false;
}



/**
 * @description: 判断数组可否下移
 * @event: 
 * @param {*} squares
 * @return {boolean} 
 */
function canMoveDown(squares){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(squares[i][j]!==0&&i!==3){ 
                  if(squares[i+1][j]===0||squares[i+1][j]===squares[i][j]){
                      return true;
                  }
            }
        }
    }
    return false;
}

/**
 * @description: 判断水平方向是否有障碍物
 * @event: 
 * @param {Number} row
 * @param {Number} col1
 * @param {Number} col2
 * @param {Array} squares
 * @return {Boolean}
 */
function noBlockHorizontal(row, col1, col2, squares){
    for(var i = col1 + 1; i<col2; i++)
        if(squares[row][i]!==0)
            return false;
    return true;
}

/**
 * @description: 判断竖直方向是否有障碍物
 * @event: 
 * @param {Number} row
 * @param {Number} col1
 * @param {Number} col2
 * @param {Array} squares
 * @return {Boolean}
 */
function noBlockVertical(col, row1, row2, squares){
    for(var i = row1 + 1; i<row2; i++)
        if(squares[i][col]!==0)
            return false;
    return true;
}

  
  /**
 * @description: 随机函数生成数字
 * @event: 
 * @param {*} squares
 * @return {*} squares
 */
function generateOneNumber(squares){
    if (nospace(squares)) 
    return false;
    
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if (squares[randx][randy] === 0) 
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字
    var randNumber = Math.random()<0.5 ? 2 : 4;
    //在随机位置显示随机数字
    squares[randx][randy] = randNumber;
    return squares;
  } 



/**
 * @description: 向左移
 * @event: 
 * @param {Array} squares
 * @param {Array} merges
 * @param {Number} score
 * @return {Object}
 */
function moveLeft(squares,merges,score){
    if(!canMoveLeft(squares)){
        return  {squares:squares,merges:merges,score:score,isMove:0}; 
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(squares[i][j]!==0){
            for(var k=0;k<j;k++){
                //如果该位置为0且中间无障碍物
  
                if(squares[i][k]===0&&noBlockHorizontal(i,k,j,squares)){
                     squares[i][k]=squares[i][j];
                     squares[i][j]=0;
                     continue;
                }else if(squares[i][k]===squares[i][j]&&noBlockHorizontal(i,k,j,squares)){
                    if(merges[i][k]!==0){
                      var temp=squares[i][j]; 
                      squares[i][j]=0;
                      squares[i][k+1]=temp;
                    }else{
                      squares[i][k]+=squares[i][j];
                      squares[i][j]=0;
                      merges[i][k]=1;
                      score +=squares[i][k];
                    }
                    continue;
                }
            }
        }
        }
    }
    let result=generateOneNumber(squares);
    if(result){
        squares=result;
    }
    return {squares:squares,merges:merges,score:score,isMove:1}; 
  }

  /**
 * @description: 向右移
 * @event: 
 * @param {Array} squares
 * @param {Array} merges
 * @param {Number} score
 * @return {Object}
 */
function moveRight(squares,merges,score){
     if(!canMoveRight(squares)){
         return  {squares:squares,merges:merges,score:score,isMove:0}; 
     }
     for(var i=0;i<4;i++){
         for(var j=2;j>=0;j--){
            if(squares[i][j]!==0){
             for(var k=3;k>j;k--){
                 //如果该位置为0且中间无障碍物
   
                 if(squares[i][k]===0&&noBlockHorizontal(i,j,k,squares)){
                      squares[i][k]=squares[i][j];
                      squares[i][j]=0;
                      continue;
                 }else if(squares[i][k]===squares[i][j]&&noBlockHorizontal(i,j,k,squares)){
                     if(merges[i][k]!==0){
                       var temp=squares[i][j]; 
                       squares[i][j]=0;
                       squares[i][k-1]=temp;
                     }else{
                       squares[i][k]+=squares[i][j];
                       squares[i][j]=0;
                       merges[i][k]=1;
                       score +=squares[i][k];
                     }
                     continue;
                 }
             }
            }
         }
     }
     let result=generateOneNumber(squares);
    if(result){
        squares=result;
    }
     return {squares:squares,merges:merges,score:score,isMove:1}; 
   }

     /**
 * @description: 向上移
 * @event: 
 * @param {Array} squares
 * @param {Array} merges
 * @param {Number} score
 * @return {Object}
 */
function moveUp(squares,merges,score){
    if(!canMoveUp(squares)){
        return  {squares:squares,merges:merges,score:score,isMove:0}; 
    }
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
           if(squares[i][j]!==0){
            for(var k=0;k<i;k++){
                //如果该位置为0且中间无障碍物
  
                if(squares[k][j]===0&&noBlockVertical(j,k,i,squares)){
                     squares[k][j]=squares[i][j];
                     squares[i][j]=0;
                     continue;
                }else if(squares[k][j]===squares[i][j]&&noBlockVertical(j,k,i,squares)){
                    if(merges[k][j]!==0){
                      var temp=squares[i][j]; 
                      squares[i][j]=0;
                      squares[k+1][j]=temp;
                    }else{
                      squares[k][j]+=squares[i][j];
                      squares[i][j]=0;
                      merges[k][j]=1;
                      score +=squares[k][j];
                    }
                    continue;
                }
            }
           }
        }
    }
    let result=generateOneNumber(squares);
    if(result){
        squares=result;
    }
    return {squares:squares,merges:merges,score:score,isMove:1}; 
  }

    /**
 * @description: 向下移
 * @event: 
 * @param {Array} squares
 * @param {Array} merges
 * @param {Number} score
 * @return {Object}
 */
function moveDown(squares,merges,score){
    if(!canMoveDown(squares)){
        return  {squares:squares,merges:merges,score:score,isMove:0}; 
    }
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
           if(squares[i][j]!==0){
            for(var k=3;k>i;k--){
                //如果该位置为0且中间无障碍物
  
                if(squares[k][j]===0&&noBlockVertical(j,i,k,squares)){
                     squares[k][j]=squares[i][j];
                     squares[i][j]=0;
                     continue;
                }else if(squares[k][j]===squares[i][j]&&noBlockVertical(j,i,k,squares)){
                    if(merges[k][j]!==0){
                      var temp=squares[i][j]; 
                      squares[i][j]=0;
                      squares[k-1][j]=temp;
                    }else{
                      squares[k][j]+=squares[i][j];
                      squares[i][j]=0;
                      merges[k][j]=1;
                      score +=squares[k][j];
                    }
                    continue;
                }
            }
           }
        }
    }
    let result=generateOneNumber(squares);
    if(result){
        squares=result;
    }
    return {squares:squares,merges:merges,score:score,isMove:1}; 
  }
  
  export default{generateOneNumber,moveLeft,moveRight,moveUp,moveDown,nospace}