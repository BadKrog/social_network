package server.database.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Dialogs")
public class Dialogs {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int dialog;
    public int getDialog() { return dialog;}
    public void setDialog(int dialog) { this.dialog = dialog;}

    @OneToMany(mappedBy = "dialog")
    private List<Message> messages;
    public List<Message> getMessages() {return messages;}
    public void setMessages(List<Message> messages) {this.messages = messages;}

    @ManyToMany
    private List<User> users;

    public List<User> getUsers() { return users;}
    public void setUsers(List<User> users) { this.users = users;}

    public Dialogs(){}
    public Dialogs(List<User> users){
        this.users = users;
    }
}
