package com.example.demo.model.entity;


import java.io.Serializable;
import java.util.List;


public class PlayRoom implements Serializable {

    private long roomId;            // 房间Id号
    private int maxPlayerNumber;    // 最大玩家数量
    private int actualPlayerNumber; // 实际房间玩家数量
    private List<Player> playerList; // 玩家列表
    private int maxScore;           // 该房间实时最高分数
    private Player winner;          // 该房间最终赢家
    private int preNumber = 0; //该房间已准备玩家数，默认为0
    private int status=0; //0为空闲中,1为已满员,2为正在游戏中

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getRoomId() {
        return roomId;
    }

    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }

    public int getMaxPlayerNumber() {
        return maxPlayerNumber;
    }

    public void setMaxPlayerNumber(int maxPlayerNumber) {
        this.maxPlayerNumber = maxPlayerNumber;
    }

    public int getActualPlayerNumber() {
        return actualPlayerNumber;
    }

    public void setActualPlayerNumber(int actualPlayerNumber) {
        this.actualPlayerNumber = actualPlayerNumber;
    }

    public List<Player> getPlayerList() {
        return playerList;
    }

    public void setPlayerList(List<Player> playerList) {
        this.playerList = playerList;
    }

    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
    }

    public Player getWinner() {
        return winner;
    }

    public void setWinner(Player winner) {
        this.winner = winner;
    }

    public PlayRoom() {
    }

    public PlayRoom(long roomId, int maxPlayerNumber, int actualPlayerNumber, List<Player> playerList, int maxScore, Player winner) {
        this.roomId = roomId;
        this.maxPlayerNumber = maxPlayerNumber;
        this.actualPlayerNumber = actualPlayerNumber;
        this.playerList = playerList;
        this.maxScore = maxScore;
        this.winner = winner;
    }

    public PlayRoom(long roomId, int maxPlayerNumber, int actualPlayerNumber, List<Player> playerList, int maxScore, Player winner, int preNumber) {
        this.roomId = roomId;
        this.maxPlayerNumber = maxPlayerNumber;
        this.actualPlayerNumber = actualPlayerNumber;
        this.playerList = playerList;
        this.maxScore = maxScore;
        this.winner = winner;
        this.preNumber = preNumber;
    }

    public int getPreNumber() {
        return preNumber;
    }

    public void setPreNumber(int preNumber) {
        this.preNumber = preNumber;
    }
}
