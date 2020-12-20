package server.processing_request;

import java.io.*;
import java.net.Socket;
import java.util.StringTokenizer;

public class ClientHandler implements Runnable{
    static final String DEFAULT_FILE = "login.html";

    private static Socket clientDialog;

    public ClientHandler(Socket client) {
        clientDialog = client;
    }

    @Override
    public void run() {
        BufferedReader in = null;
        PrintWriter out = null;
        BufferedOutputStream dataOut = null;

        String fileRequested = null;
        String user_number = null;
        String dop_info = null;

        try {

//--------------- обработка полученного запроса ---------------

            // Канал чтения из сокета
            in = new BufferedReader(new InputStreamReader(clientDialog.getInputStream()));
            // канал записи в сокет (для HEADER)
            out = new PrintWriter(clientDialog.getOutputStream());
            // канал записи в сокет (для данных)
            dataOut = new BufferedOutputStream(clientDialog.getOutputStream());

            System.out.println("Прочитали сокет");
            // Первая строка запроса
            String input = in.readLine();

            // Разбираем запрос по токенам
            StringTokenizer parse = new StringTokenizer(input);
            // Получаем HTTP метод от клиента
            String method = parse.nextToken().toUpperCase();
            // Текст запроса от клиента
            fileRequested = parse.nextToken();

            int index = fileRequested.indexOf("?");
            if(index != -1) {
                user_number = fileRequested.substring(index+1);
                fileRequested = fileRequested.substring(0, index);
            }

            index = fileRequested.indexOf("&");
            if(index != -1){
                dop_info = user_number.substring(index+1);
                user_number = user_number.substring(0, index);
            }

            System.out.println("Stroka: " + input);
            System.out.println("Method: " + method);
            System.out.println("Request: " + fileRequested);
            System.out.println("User: "+ user_number);
            System.out.println("Dop_info: "+ dop_info);

//------------------------ POST ---------------------------------------------
            if(method.equals("POST")) {
                Post.send(fileRequested, out, dataOut, in);
            }
//------------------------ GET ---------------------------------------------
            if (method.equals("GET")) {
                Get.send(fileRequested, out, dataOut, in, getClass());
            }

        } catch (IOException e) {
            System.err.println("Input exception: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                clientDialog.close();
                in.close();
                out.close();
                dataOut.close();
                System.out.println("Вышел из потока");
            } catch (NullPointerException | IOException e) {
                System.err.println("Error closing stream: " + e.getMessage());
            }
        }

    }




}

