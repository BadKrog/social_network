package server.testing;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import server.database.BDConfiguration;
import server.database.DataManager;
import server.database.tables.Dialogs;
import server.database.tables.Friends;
import server.database.tables.Login;
import server.database.tables.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TestBD {
    public static void main(String[] args) {
        String id_user1 = "16";
        String id_user2 = "1";

        if(!DataManager.isFriendCreated(id_user1, id_user2)){
            System.out.println("Они еще не друзья, создаем связь");
            DataManager.addFriend(id_user1, id_user2);
            if(DataManager.isFriendCreated(id_user1, id_user2)) System.out.println("Они подружились");
        }
        else{
            System.out.println("Они уже дружат");
        }

        System.out.println(DataManager.getMyFriend(id_user1));
    }

}
