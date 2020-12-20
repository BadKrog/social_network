package server.processing_request;

import java.io.*;
import java.util.Date;

import static server.processing_request.HelperFunction.*;

/**Класс отвечающий за прием запроса POST, его обработку и отправку клиенту*/
public class Get {


    private static final String DEFAULT_FILE = "login.html";

    /**Принимает запрос, обрабатывает и отправляет на сервер
     * @param requested - строка с названием запроса
     * @param out - поток для отправки пакета с запросом
     * @param dataOut - поток для отправки данных
     * @param in - поток для считывания данных запроса
     * @param myClass - класс Class вызывающего класса
     * @exception IOException если произойдут ошибки в работе с потоками*/
    public static void send(String requested, PrintWriter out, BufferedOutputStream dataOut, BufferedReader in, Class myClass) throws IOException {
        // По умолчанию использовать index.html
        if (requested.endsWith("/")) {
            requested += DEFAULT_FILE;
        }

        byte[] fileData = null;

        try {
            fileData = readFileData(getDirectory(requested) + requested, myClass);
        } catch (FileNotFoundException e) {
            requested = "/" + DEFAULT_FILE;
            fileData = readFileData(getDirectory(requested) + requested, myClass);
            System.err.println("Ошибка в имени файла, вывожу default." + e.getMessage());
        }

        String content = getContentType(requested);

        // Шлем HTTP Headers
        out.println("HTTP/1.1 200 OK");
        out.println("Server: Java HTTP Server : 1.0");
        out.println("Date: " + new Date());
        out.println("Content-type: " + content);
        //out.println("Transfer-Encoding: chunked");
        out.println("Connection: keep-alive");
        out.println("Vary: Accept-Encoding");

        // Длина ответа - эхо запроса без первого /
        out.println("Content-length: " + fileData.length);
        out.println();
        out.flush();

        dataOut.write(fileData, 0, fileData.length);

        System.out.println("Ответ отослан");
        dataOut.flush();
    }
}

