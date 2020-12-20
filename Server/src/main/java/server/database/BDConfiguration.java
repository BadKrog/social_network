package server.database;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class BDConfiguration {
    private static BDConfiguration instance;

    public static BDConfiguration getInstance() {
        if(instance == null){
            instance = new BDConfiguration();
        }
        return instance;
    }

    private static SessionFactory factory;

    private BDConfiguration(){setup();}

    private void setup(){
        Configuration configuration = new Configuration();
        configuration.configure();

        factory = configuration.buildSessionFactory();
    }

    public Session getSession(){return factory.openSession();}
}