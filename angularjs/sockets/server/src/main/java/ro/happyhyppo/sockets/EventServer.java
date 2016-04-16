package ro.happyhyppo.sockets;

import javax.websocket.server.ServerContainer;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;

public class EventServer {
    public static void main(String[] args) {
        try {
            Server server = new Server(8080);
            ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
            context.setContextPath("/");
            ResourceHandler resourceHandler = new ResourceHandler();
            resourceHandler.setResourceBase("../client/");
            resourceHandler.setWelcomeFiles(new String[]{ "index.html" });
            resourceHandler.setDirectoriesListed(true);
            resourceHandler.setMinMemoryMappedContentLength(-1);
            HandlerList handlers = new HandlerList();
            handlers.setHandlers(new Handler[] { resourceHandler, context });
            server.setHandler(handlers);
            ServerContainer wscontainer = WebSocketServerContainerInitializer.configureContext(context);
            wscontainer.addEndpoint(EventSocket.class);
            server.start();
            server.join();
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
}
