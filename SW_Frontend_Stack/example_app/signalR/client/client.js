"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UsersHubService = /** @class */ (function () {
    function UsersHubService(hubConnection) {
        this.hubConnection = hubConnection;
    }
    ;
    /* Subscribe to the changing list of users */
    UsersHubService.prototype.subscribeUserList = function () {
        this.hubConnection.invoke('UserListSubscribe');
    };
    UsersHubService.prototype.openUserInEdit = function (userId) {
        console.log('hub invoking OpenUserInEdit', userId);
        this.hubConnection.invoke('OpenUserInEdit', userId);
    };
    UsersHubService.prototype.saveUser = function (user) {
        console.log('hub invoking SaveUser');
        this.hubConnection.invoke('SaveUser', user);
    };
    UsersHubService = __decorate([
        core_1.Injectable()
    ], UsersHubService);
    return UsersHubService;
}());
exports.UsersHubService = UsersHubService;
