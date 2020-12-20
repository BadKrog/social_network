package server.database.tables;

import javax.persistence.*;

@Entity
@Table(name="Login")
public class Login {
    @Id
    private String login;

    public String getLogin() { return login;}
    public void setLogin(String login) { this.login = login;}

    @Column
    private String password;

    public String getPassword() { return password;}
    public void setPassword(String password) { this.password = password;}

    @OneToOne (optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user")
    private User user = null;

    public User getUser() { return user;}
    public void setUser(User user) { this.user = user;}

    public Login(){}
    public Login(String login, String password){
        this.login = login;
        this.password = password;
    }
    public Login(String login, String password, User user){
        this.login = login;
        this.password = password;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Login: login="+login+"  password="+password;
    }
}
