package ro.happyhyppo.sockets;

import javax.websocket.ClientEndpoint;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ClientEndpoint
@ServerEndpoint(value = "/events/")
public class EventSocket {

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("Socket Connected: " + session);
    }

    @OnMessage
    public String onMessage(String message, Session session) {
        System.out.println("Received TEXT message: " + message);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            System.err.println(e.getMessage());
        }
        return message.toUpperCase();
    }

    @OnClose
    public void onClose(CloseReason reason) {
        System.out.println("Socket Closed: " + reason);
    }

    @OnError
    public void onError(Throwable cause) {
        cause.printStackTrace(System.err);
    }
}
