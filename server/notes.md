## 1. app.use(express.urlencoded({extended: true, limit: "10mb"})) - index.ts

- express.urlencoded() : It is a built-in middleware function in Express that parses incoming requests with URL-encoded payloads & Put parsed data inside req.body. It tells Express: "Hey, look out for incoming form submissions, parse them, and put them nicely into req.body so I can use them."

## 2. TryCatch - trycatch.ts 

- When a user hits /register route, that controller function did not executes but it goes to TryCatch then the handler function executes and the handler function it gets from the register controller logic .

It's flow : 

 User hits /register (controller)
       │
       ▼
1. Express calls the TryCatch wrapper function
       │
       ▼
2. The wrapper enters its 'try' block
       │
       ▼
3. The wrapper runs: await handler(req, res, next)
   (This is where your actual register logic finally executes!)
       │
 ┌─────┴────────────────────────┐
 │                              ▼
 │               Did an error happen inside?
 │               ├──► NO:  Your register logic sends the 201 Success response.
 ▼               └──► YES: The wrapper's 'catch' block intercepts it 
                               and sends the 500 Error response.


## 3. userSchema.methods.hasProAccess - userModel.ts 
    code : 
    userSchema.methods.hasProAccess = function(this: IUser): boolean {
    return !!this.subscription && new Date() < new Date(this.subscription) ;
}

- explanation : 
 1. !!this.subscription: The double exclamation mark (!!) converts a value into a strict boolean (true or false). It is checking: "Does a subscription date actually exist for this user?" If subscription is null, this becomes false

 2. new Date() < new Date(this.subscription): This checks if the subscription expiration date is in the future. new Date() is right now. If now is less than (before) the subscription date, the subscription is still active.


## 4. userSchema.methods.canMakeRequest - userModel.ts 
   code : 
    userSchema.methods.canMakeRequest = function(this: IUser): boolean {
    return this.hasProAccess() || this.freeRequestsUsed < 5 ;
}

- explanation : 
 1. canMakeRequest() : This method acts as a gatekeeper. It decides whether the user is allowed to make an API request or use a feature in your app.

 2. this.hasProAccess(): It calls the first method we just talked about. If the user has an active paid subscription, this returns true. Because of the || (OR) operator, if this is true, the whole line returns true immediately. Paid users get unlimited requests.

 3. || this.freeRequestsUsed < 5: If the user is not a Pro member (the first part was false), it checks the second condition. If they have used fewer than 5 free requests, they are allowed to proceed.

 ## **NOTE: Those two lines are defining Instance Methods in Mongoose. Think of instance methods like adding functions directly to a user object. Once you fetch a user from the database (e.g., const user = await User.findOne(...)), you can call user.hasProAccess() or user.canMakeRequest() right on that user object.


 ## 5. "postmessage" - googleconfig.ts 
  export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);

 - Instead of redirecting the entire browser window to a new URL after a user logs in, it tells Google's login popup to send the authorization code back to your frontend application using the browser's native window postMessage API.
 - as the redirect URI is set to "postmessage", Google doesn't redirect the page. Instead, it securely broadcasts a message containing a one-time authorization code directly to your frontend Javascript code via window.postMessage(). - this code we will use in login controller : const {code} = req.body;


 ## 6. interface AuthenticatedRequest extends Request - isAuth.ts (middleware)
      export interface AuthenticatedRequest extends Request {
      user?: IUser | null;
     }
  - Normally Express req object does NOT have: req.user => So TypeScript gives error: Property 'user' does not exist on type  'Request'. So Extend Request by creating custom request type:  AuthenticatedRequest. - which says: "This request may contain user property". 


## 7. 





