
/* Actions invoked on the client side correspond to actions invoked on the server side */
public override async Task<IAction> Effect(UserState prevState, LoadUserListAction action) {
    _logger.LogInformation("Load User List Effect");

    var users = await _dbCtx.users
        .OrderBy(u => u.UserId)
        .Select(u => new User(){
            username = u.username,
            password = u.password,
            firstname = u.firstname,
            lastname = u.lastname,
            // ...
        }).toListAsync();

    /* This action as a parameter, the list of users */
    return new LoadUserListCompleteAction(users);
}

/* 
    Creates a subscription task that allows the UserList from the common store to be subscribed to by all
    clients and adds that subscription to the SubscriptionManager refCount.
 */
public async Task UserListSubscribe() {
    var connectionId = Context.ConnectionId;
    _logger.LogInformation("UserListSubscribe {connectionId}", connectionId);

    /* Subscribe to the store */
    var sub = StoreContainer.UserStore
    /* Select UserList from current state returns an Observable IEnumerable<TSource> */
        .Select(state => state.UserList)
        /* Only emit when value is changing throughout the system */
        .DistinctUntilChanged()
        /* Subscribe to observable */
        .Subscribe(async userList => {
            /* 
                Wait until the observable gives us a value. Block wakes up when a new UserList value is pushed
                onto the observable. By firing one function that returns an Observable.of(state.UserList) we 
                set up the listener, which will call UserListPush, pushing the list of users back to the client.
                We never have to make another request for the changes. Instead, whenever the list changes our 
                duplex communication allows for the changed list to be pushed to the client dynamically, which
                allows us to closely regulate the flow of information to all of our clients.
            */
            _logger.LogInformation("Pushing User List");
            await _hubContext.Clients.Client(connectionId).sendAsync("PushUserList", userList);
        });

    _hubSubscriptionManager.Add(connectionId, "UserList", sub);
}

public async Task OpenUserInEdit(string userId) {
    var connectionId = Context.ConnectionId;
    _logger.LogInformation("hub: OpenUserInEdit {userId} for {connectionId}", userId, Context.ConnectionId);

    /* Set up a subscription to that UserInEdit to describe further events being processed */

    var sub = StoreContainer.UserStore
        .Select(state => state.OpenUsersInEdit.FirstOrDefault(u => u.User.UserId == UserId))
        .DistinctUntilChanged()
        /* oc = Observable Collection */
        .Subscribe(async oc => {
            if (oc == null) return;
            _logger.LogInformation("hub: user {userId} changed. calling push", oc.User.UserId);
            await _hubContext.Clients.Client(connectionId).SendAsync("PushUser", oc);
        });
        _hubSubscriptionManager.Add(connectionId, "User", sub);

        /* Dispatch OpenUserInEdit action */
        StoreContainer.UserStore.Dispatch(new OpenUserInEdit(userId, $"{Context.User.Identity.Name} - {connectionId}"));
}

public void SaveUser(User user) {
    _logger.LogInformation("save user {userId}", user.UserId);
    StoreContainer.UserStore.Dispatch(new SaveUser(user));
}

/* Save user action => Save user effect =>  */
public override async Task<IAction> Effect(UserState prevState, SaveUser action) {
    _logger.LogInformation("Save User Effect");
    var userEntity = (await _dbCtx.Set<LiquidTrace.Domain.Users.User>()
                            .FirstAsync(u => u.UserId == action.User.UserId)
                            ?? new LiquidTrace.Domain.Users.User());
    userEntity.username = action.User.username;
    userEntity.password = action.User.password;
    userEntity.firstname = action.User.firstname;
    userEntity.lastname = action.User.lastname;

    if (userEntity.UserId == null) {
        _dbCtx.Set<LiquidTrace.Domain.Users.User>().Add(userEntity);
    }
    
    await _dbCtx.SaveChangesAsync();
}

public override Task<IAction> Effect(UserState prevState, SaveUserSuccessful action) {
    _logger.LogInformation("SaveUserSuccessfulReloadListEffect");
    return Task.fromResult<IAction>(new LoadUserListAction());
}

