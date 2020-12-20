package server;

import server.processing_request.ClientHandler;

import java.io.IOException;
import java.net.ServerSocket;

/**
 * @author Зубреев А. И.
 * Класс необходим для прослушивания запросов и соединения с клиентом.
 * */
public class HttpServer {
    public static void main(String[] args) {
        try{
            ServerSocket serverConnect = new ServerSocket(80);
            System.out.println("Сокет создан на порту 80 - ждем запросов от клиентов");

            // Начинаем слушать запросы
            while (true){
                // Установили соединение
                ClientHandler myServer = new ClientHandler(serverConnect.accept());

                System.out.println("Соединение установлено.");

                // Создаем отдельный поток для обработки запроса формирования ответа
                Thread thread = new Thread(myServer);
                thread.start();
                Thread.sleep(100);
            }
        }
        catch (IOException | InterruptedException e){
            e.printStackTrace();
            System.out.println("Соединение потеряно.");
        }
    }
}
