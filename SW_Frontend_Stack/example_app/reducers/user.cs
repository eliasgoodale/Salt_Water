
public class SaveUserSuccessfulReducer: ActionReducer<SaveUserSucessful, UserState> {
    public override UserState Reducer(UserState state, SaveUserSuccessful action) {
        
        var prevOc =
            state.OpenUsersInEdit.FirstOrDefault(oc => oc.User.UserId == action.User.UserId) 
            ?? throw new Exception($"user {action.User.UserId} is not opened");;
        
        var newOc = new OpenedUserInEdit() {
            User = action.User,
            Users = prevOc.Users,
            IsChanged = false,
        };
        state.OpenUsers.Remove(prevOc);
        state.OpenUsers.Add(newOc);
        return state;
    }
}

/* User state is passed as previous state and the action payload is applied and returned as the new state */
public class LoadUserListCompleteReducer: ActionReducer<LoadUserListCompleteAction, UserState> {
    
    public override UserState Reducer(UserState prevState, LoadUserListCompleteAction action) {
        return new UserState() {
            OpenUsers = prevState.OpenUsers,
            UserList = action.Users
        }
    }
}

