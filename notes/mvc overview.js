// mvc or model view controller is a project structure that separates our application into three main components, the model which takes care of the business logic, the controller which takes care of the application logic and lastly the view which takes care of the user interface and the presentation logic.

// it makes our project easy to maintain and scale by separating the business logic from the application logic and the presentation logic.

// Best security practices for nodeJs applications:

//@ Compromised database:
// strongly Encrypt passwords using (bcrypt)
// Strongly encrypt password tokens (SHA256)

//@ Brute force attacks:
// Rate limiting (requests)
// Implement maximum login attempts
// use bcrypt to make login request slow

//@ Cross-site scripting (XSS) attacks:
// Store sensitive data in httpOnly cookies
// Sanitize user input data
// Use Content Security Policy (CSP)
// set special http headers to prevent XSS attacks

//@ denial of service (DoS) attacks:
// Rate limiting (requests)
// limit the size of incoming requests body payload
// avoid evil regular expressions

//@ NoSQL injection:
// use mongoose to prevent NoSQL injection
// sanitize user input data

//@ other Best practices and security measures:

// all communication between server and client needs to happen over HTTPS.

// always create random password tokens. Not generated from dates or something like that.

// deny JSON web token after the user has changed his password.

// never ever commit a configuration file, like for environment variables, to a version control like Git.

// don't send error details to the client. Instead, send a generic error message.

// Blacklist untrusted tokens.

// confirming the email address after an account is first created.

// implement two-factor authentication.

// use a security package like helmet to secure your app by setting various HTTP headers.
