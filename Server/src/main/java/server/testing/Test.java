package server.testing;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import server.database.tables.Login;
import server.database.tables.User;

public class Test {
    public static void main(String[] args) {
        Manager man = new Manager();
        man.add();

    }
}

class DBConf{
    private static DBConf instance;

    public static DBConf getInstance() {
        if(instance == null){
            instance = new DBConf();
        }
        return instance;
    }

    private static SessionFactory factory;

    public DBConf(){setup();}

    private void setup(){
        Configuration configuration = new Configuration();
        configuration.configure();

        factory = configuration.buildSessionFactory();
    }

    public Session getSession(){return factory.openSession();}
}

class Manager{
    // Добавляем значение
    public void add() {
        Login log = new Login("My_first_Login", "qwerty", new User("Антон"));
        try {
            Session session = DBConf.getInstance().getSession();
            session.beginTransaction();
            session.save(log);
            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
    }
}