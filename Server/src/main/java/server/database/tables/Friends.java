package server.database.tables;

import javax.persistence.*;

@Entity
@Table(name = "Friends")
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    public int getId() { return id;}
    public void setId(int id) { this.id = id;}

    @ManyToOne( cascade = CascadeType.ALL)
    private User user;

    public User getUser() {return user;}
    public void setUser(User user) { this.user = user;}

    @Column
    private int id_friend;

    public int getId_friend() { return id_friend;}
    public void setId_friend(int id_friend) { this.id_friend = id_friend;}

    public Friends(){}
    public Friends(User user, int id_friend){
        this.user = user;
        this.id_friend = id_friend;
    }
}
