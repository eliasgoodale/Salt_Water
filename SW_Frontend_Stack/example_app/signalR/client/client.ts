import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Store } from '@ngxs/store';

declare interface User {
    // ... UserDataShape
}


@Injectable()
export class UsersHubService {
    public constructor( public hubConnection: HubConnection ) {};

    /* Subscribe to the changing list of users */
    subscribeUserList() {
        this.hubConnection.invoke('UserListSubscribe')
    }

    openUserInEdit(userId: string) {
        console.log('hub invoking OpenUserInEdit', userId);
        this.hubConnection.invoke('OpenUserInEdit', userId)
    }

    saveUser(user: User) {
        console.log('hub invoking SaveUser');
        this.hubConnection.invoke('SaveUser', user);
    }
}



