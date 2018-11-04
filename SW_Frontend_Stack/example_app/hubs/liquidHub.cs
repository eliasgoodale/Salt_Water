
/* 
    Hubs replace Controllers. In normal request response MVC the controller listens for requests, and sends back
    responses. The idea is to keep the business logic out of the hub because it's central responsibility is 
    communication with the client. Just the same as the controller processes incoming requests. 

    We can dependency inject into the hub the same way as we do in a controller, but since we are handling our
    business logic in the redux loop, it is better to dependency inject into effects. Reducers cannot be dependency
    injections since that produces a side effects and reducers should be pure.
*/
namespace LiquidTrace.Hubs {
    [Authorize]
    public class UserHub: Hub {
        private readonly IHubContext<UserHub> _hubContext;
        private readonly ILogger<UserHub> _logger;
        private readonly HubSubscriptionManager _hubSubscriptionManager;
    }
}