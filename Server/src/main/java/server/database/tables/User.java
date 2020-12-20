package server.database.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_user;

    public int getId_user() { return id_user;}
    public void setId_user(int id_user) { this.id_user = id_user;}

    @Column
    private String nickname;

    public String getNickname() { return nickname;}
    public void setNickname(String nickname) { this.nickname = nickname;}

    @OneToMany(mappedBy = "user")
    private List<Friends> friends;

    public List<Friends> getFriends() { return friends;}
    public void setFriends(List<Friends> friends) { this.friends = friends;}

    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<Dialogs> dialogs;

    public List<Dialogs> getDialogs() { return dialogs;}
    public void setDialogs(List<Dialogs> dialogs) { this.dialogs = dialogs;}

    public User(){}
    public User(String nickname){
        this.nickname = nickname;
    }
    public User(int id){ id_user = id;}

    @Override
    public String toString() {
        return id_user+"\n"+nickname;
    }
}
