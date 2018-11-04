public class LoadUserListAction : IAction {

}

public class LoadUserListCompleteAction: IAction {
    
    public LoadUserListCompleteAction(IList<User> users) {
        Users = users;
    }

    public IList<User> Users { get; private set; };
}

public class SaveUser: IAction {
    public SaveUser(User user) {
        User = user;
    }
    public User User { get; private set; }
}

public class SaveUserSuccessful: IAction {
    public SaveUserSuccessful(User user) {
        User = user;
    }
    public User User { get; private set; }
}