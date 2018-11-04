app.UseSwaggerUi(typeof(Startup).Assembly, settings => {
    // configure settings here
});

app.UseSpa( spa => {
    spa.Options.SourcePath = "ClientApp";

    if (env.IsDevelopment()) {
        spa.UseAngularCliServer(npmScript: "start");
    }
});

StoreContainer.UserStore = new UserManager(this.AutofacContainer).UserStore;
StoreContainer.UserStore.Dispatch(new LoadUserListAction());