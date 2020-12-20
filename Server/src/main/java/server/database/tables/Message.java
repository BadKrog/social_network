package server.database.tables;

import javax.persistence.*;

@Entity
@Table(name="Message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public long getId() { return id;}
    public void setId(long id) { this.id = id;}

    @ManyToOne(cascade = CascadeType.ALL)
    private Dialogs dialog;

    public Dialogs getDialog() { return dialog;}
    public void setDialog(Dialogs dialog) { this.dialog = dialog;}

    @Column
    private int id_human;

    public int getId_human() { return id_human;}
    public void setId_human(int id_human) { this.id_human = id_human;}

    @Column
    private String valueMsg;

    public String getValueMsg() { return valueMsg;}
    public void setValueMsg(String valueMsg) { this.valueMsg = valueMsg;}

    public Message(){}
    public Message(Dialogs dialog, int id_sender, String message){
        this.dialog = dialog;
        this.id_human = id_sender;
        this.valueMsg = message;
    }

    @Override
    public String toString() {
        return id_human+"\n"+valueMsg;
    }
}
