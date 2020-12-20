package server.processing_request;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

/**
 * Класс предназначенный для вспомогательных функций в обработке запросов.
 * */
public class HelperFunction {

    /**Помогает определить, является ли файл расширения html
     * @param fileRequested - Название файла
     * @return true - файл html, false - в ином случае*/
    static boolean isHtml(String fileRequested) {
        return (fileRequested.endsWith(".htm") || fileRequested.endsWith(".html"));
    }

    /**Помогает определить, является ли файл расширения css
     * @param fileRequested - Название файла
     * @return true - файл css, false - в ином случае*/
    static boolean isCss(String fileRequested){
        return fileRequested.endsWith(".css");
    }

    /**Помогает определить, является ли файл расширения js
     * @param fileRequested - Название файла
     * @return true - файл js, false - в ином случае*/
    static boolean isJs(String fileRequested){
        return fileRequested.endsWith(".js");
    }

    /**Получает относительный путь к папке где лежат html, css и js файлы
     * @param fileRequested - название файла
     * @return если нужно, то возвращает путь к папке с файлом*/
    static String getDirectory(String fileRequested){
        if(isHtml(fileRequested)) return "/html";
        // if(isCss(fileRequested)) return "/css";
        // if(isJs(fileRequested)) return "/js";
        return "";
    }

    /**В зависимости от расширения отправляемого файла возвращает нужный ContentType
     * @param fileRequested - название файла
     * @return строка с ContentType*/
    static String getContentType(String fileRequested) {
        if(isHtml(fileRequested)){
            return "text/html; charset=UTF-8";
        }
        else if (isCss(fileRequested)){
            return "text/css;";
        }
        else return "text/plain";
    }

    /**Переводит файлы, лежащие в ресурсах, в байтовый массив
     * @param filePath - относительный адрес файла
     * @param myClass - Класс Сlass, для получения доступа к ресурсам
     * @return массив byte c записанным файлом
     * @throws FileNotFoundException - если такого файла не существует*/
    static byte[] readFileData(String filePath, Class myClass) throws IOException {
        InputStream fileIn = null;
        int fileLength;
        byte[] fileData;

        try {
            fileIn = myClass.getClass().getResourceAsStream(filePath);
            if (null == fileIn) {
                throw new FileNotFoundException();
            }
            fileLength = fileIn.available();
            fileData = new byte[fileLength];
            fileIn.read(fileData);
        } finally {
            if (fileIn != null) {
                fileIn.close();
            }
        }
        return fileData;
    }

}
