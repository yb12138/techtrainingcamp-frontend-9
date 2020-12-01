package com.example.demo.controller;

import com.example.demo.ChatRoomServerEndpoint;
import com.example.demo.WebSocketUtils;
import com.example.demo.model.entity.PlayRoom;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("room")
public class RoomController {
    /**
     * 获取所有房间信息
     * @param
     * @return
     */
    @RequestMapping(value="/list", method= RequestMethod.GET)
    public List<PlayRoom> sendAllMessage(){
        return WebSocketUtils.rooms;
    }
}
