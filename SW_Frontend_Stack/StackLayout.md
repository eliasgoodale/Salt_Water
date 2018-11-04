# Goodnight SWD Single Tenant SPA Web Application


## New Frontend Stack


![](https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png =200x65)



Features:
  
*   Lightweight, reusable components

*   Easy to write / understand

*   Virtual Dom 

*   Great ready-made component libraries like Kendo

> Advantages
*   View is easily configurable for new component compositions
*   Stateless components make using redux easy

> Disadvantages

* Need more tools

![](https://www.valentinog.com/blog/wp-content/uploads/2017/12/redux-react-tutorial-beginner-2018.png =250x)


    The role of software architecture is to impose artificial constraints in order to promote consistency and predictability.
Features:

*   MVC Pattern
*   Synchronous Loop
*   Immutable State, Each change has an **action** mapped to a reducer that returns a new state
*   Store, View, Reducers are related to **observable** changes over time
*   Do something, load something, return new state

>Key Advantages: 

*   Predictability
*   Immutable, Centralized state
*   Single Source of truth for View Matrix
*   All SWD clients get the same data

>Challenges

*   Simultaneous Asychronous/Synchronous Handling is messy when data changes frequently and needs validation
*   Increased probability of state key collisions
*   Increased data flow complexity, 

![](https://cdn-images-1.medium.com/fit/t/1600/480/1*gD37OB2-PtMqZdk3X1YnEQ.png =250x75)

Features:

* Easy, maintainable code handling Sync/Async event streams using the Observer Pattern

* Promise Cancellation

* Fine tuned control and behavior oriented approach to UI design (debouncing, event emitters, action stream captures)

>Key Advantages

*   UI performance boost 

*   Better network request logic

*   Readable, maintainable code for handling the redux store as a stream of changing data

* Less implementation details for complex behaviors

> Challenges
*   RxJs library is massive
*   Memory leaks with rogue action streams

### Redux-Observable Middleware
![](https://cdn-images-1.medium.com/max/1600/1*fdzQpORTUt1yCFFOvD_whg.png =200x)

![](https://redux-observable.js.org/logo/logo-small.gif =75x75) 

Core concepts: 

*   Epics - functions that take streams of actions and return streams of actions.

*   Cancellable Ajax calls (Never waste resources or worry about UI view updates based on a Promise resolve/reject we dont care about)

*   Merge Epics to create compound, dynamic action stream behaviors

*   Keeps our state dynamic while allowing for a consistent user experience.


### API Query Gateway
![](https://www.vectorlogo.zone/logos/graphql/graphql-card.png =200x)

>Advantages

*   Single flexible endpoint for data retrieval ( No structured endpoints for specific client needs )

*   Since our data has a single source of truth (redux) we can make this data pool available to users according to region/permissions/other constraints

*   Avoid over-fetching(exhausting limited network resources) and under-fetching(n + 1 requests problem) data

*   Increase product iteration speed

*   Easier, more insightful analytics with resolver functions

*   Type system throughout backend/frontend/request/response



### Proposed Solutions