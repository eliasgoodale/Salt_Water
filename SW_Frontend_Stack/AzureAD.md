## Current Frontend Stack Solution

![alt text][azureAD]

[azureAD]: https://www.intelogy.co.uk/wp-content/uploads/2018/03/Azure-active-directory-logo-left.png "Azure AD"



### Protocol Flow:

    1.) User navigates to web app

    2.) App returns JS frontend to browser
    
    3.) User initiates sign in(click sign in). Browser sends GET to Azure AD auth endpoint and requests ID token. Request includes App ID and reply URL in query params.

    4.) Azure AD validates Reply URL against registered reply URL configured in Azure portal

    5.) User signs in on sign in page.

    6.) Azure AD creates ID token and returns it as a URL fragment to the apps Reply URL(HTTPS for production). Return Token includes claims about the user and Azure AD that are required by the app to validate token.

    7.) JS client extracts token and uses it for securing calls to Web API back end.

    8.) Browser calls application's web API with ID token in auth header. Azure AD auth service issues ID token that can be used as a bearer token when web api is the client's own backend.

    9.) Azure AD writes cookie into user's browser to establish session(between user and Azure AD). When token expires ADAL.js uses session to silently obtain another token. ADAL.js 

### Current Challenges
*   High volume of volatile data 
*   Multiple data validation requirements
*   Not currently able to integrate all services
