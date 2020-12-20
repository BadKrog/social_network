package server.database;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import server.database.tables.*;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

public class BDManager {
    private static BDManager instance;

    public static BDManager getInstance() {
        if (instance == null) {
            instance = new BDManager();
        }
        return instance;
    }

    public void addLogin(Login login){
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            session.save(login);
            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
    }

    public void addMessage(Message message){
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            session.save(message);
            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
    }

    /**0-несуществует, 1-вход разрешен, -1-вход запрещен*/
    public int isLogin(Login login){
        Login log = null;
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            log = session.get(Login.class, login.getLogin());
            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        if(log == null){
            return 0;
        }
        else if(log.getPassword().equals(login.getPassword())){
            return 1;
        }
        else return -1;
    }


    public Login getLogin(String loginId){
        Login login = null;
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            login = session.load(Login.class, loginId);
            session.getTransaction().commit();
            session.close();

        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return login;
    }

    public User getUserById(int id_user){
        User user = null;
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            user = session.load(User.class, id_user);
            session.getTransaction().commit();
            session.close();

        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return user;
    }

    public User getUserByLoginId(String id_login){
        User user = null;
        Login login = null;
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            login = session.load(Login.class, id_login);
            user = login.getUser();
            session.getTransaction().commit();
            session.close();

        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return user;
    }

    public void addFriend(Friends friend){
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            session.save(friend);
            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
    }

    public void addDialog(Dialogs dialog){
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            session.save(dialog);
            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
    }

    public List<User> getAllUser(){
        CriteriaBuilder builder = BDConfiguration.getInstance().getSession().getCriteriaBuilder();
        CriteriaQuery<User> cq = builder.createQuery(User.class);
        Root<User> rootEntry = cq.from(User.class);
        CriteriaQuery<User> all = cq.select(rootEntry);

        TypedQuery<User> allQuery = BDConfiguration.getInstance().getSession().createQuery(all);
        return allQuery.getResultList();
    }

    public Dialogs getDialogById(int id){
        Dialogs dialog = null;
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            dialog = session.load(Dialogs.class, id);
            session.getTransaction().commit();
            session.close();

        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return dialog;

    }

    public void updateUser(User user){
        try {
            Session session = BDConfiguration.getInstance().getSession();
            session.beginTransaction();
            session.update(user);
            session.getTransaction().commit();
            session.close();

        } catch (HibernateException e) {
            e.printStackTrace();
        }
    }

}
