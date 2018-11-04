public class UserState {
    
    /* Users opened for editing */
    public IList<OpenedUser> OpenUsers { get; set; } = new List<OpenedUser>();

    /* List of all saved Users */
    public IList<User> UserList { get; set; } = new List<User>();
}

public class OpenedUser {
    public User User { get; set; };

    public IList<string> Users { get; set; } = new List<string>();

    /* Drives save changes button=disabled? on the frontend */
    public bool IsChanged { get; set; } = false;
}

/* State contains reference to customer State */

public class UserManager {
    public Store<UserState> UserStore { get; private set;}

    public UserManager(IContainer container) {
        UserStore = new Store<UserState>(Reducer, new CustomerState())    
    }
}
