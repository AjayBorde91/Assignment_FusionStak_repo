here we can add some text that should be read first when new user going to handle this assignment this assignment made by Ajay Borde for the first assignment at Fusionstak llc \

name : Ajay Borde
email: ajayborde@gmail.com
phone number: 9579546693
github : github.com/ajayborde91
linkedin : linkedin.com/in/ajay-borde-7782b31b4

updates: 
1 checked if username is already exist them show error messege and then reset the input . 
3 fixed the routing after signup new user to the login page for security
4 added the dialog box to reset the user password 
2 given the proper naming for components services and functions 
5 added the dialog box to add new user 
6 authenticated the token 
7 added validation for confirm password that both should be same
8 updated the routing to dashboard , user not able to access the dashboard until login and token generated 
9 updated the details description so that new developer can run the code and understand code fastly 
10 fixed the login and signup page styles

components: login = to login the user signup= to create new user dashboard = to display all the users and add and update user with logout functionality
dialog-addnewuser = dialogbox to add new user dialog-editprofile = dialogbox to update password of user by the name of the user

steps to run the project or assignment : step1 : open visual studio
step 2 : open DotnetAngularApi folder in visual studio step 3 : open swagger by running the code step 4 : open visual studio code step 5 : open angular-app-fusionstak2 file in visual studio code step 6 : run the angular code executing 'ng serve -o' or 'ng serve' command step 7 : click on signup first to create account step 8 : after login form the valid username and password step 9 : to update password click on welcome user and then edit profile step 10 : to add new user click on add new user button or icon srep 11 : to log out click on welcome user and then logout button

figma link of assignment : https://www.figma.com/proto/cEnP3ub17wS946bHeV7Ytk/Cap-Table?type=design&node-id=398-172330&t=YEEmnTINVqIJVdh8-0&scaling=scale-down&page-id=398%3A172329&starting-point-node-id=398%3A172330

Assignment Documentation: Login and Registration Form with JWT Token

Introduction This documentation provides instructions on how to create a web application that includes a login and registration form using JWT token-based authentication. The application consists of two separate parts: an Angular 16.0.0 frontend and a .NET Core 6.0.0 backend. The frontend communicates with the backend API to handle user authentication, registration, and user display

Prerequisites 
 Node.js 
 Angular CLI 16.0 
 .NET Core SDK 6 
 SQL Server

NuGet Package Installed : Microsoft.AspNetCore.Authentication.JwtBearer 6.0.11 Microsoft.EntityFrameworkCore 7.0.10 Microsoft.EntityFrameworkCore.SqlServer 7.0.10 Microsoft.EntityFrameworkCore.Tools 7.0.10

Steps to be perform: Step 1: Create Angular Application

Open a terminal and navigate to the desired directory.
Run the following command to create a new Angular application:
Step 2: Create .NET Core Application

Navigate to the "angular-app" directory.
Create components for login, registration, and user display using Angular CLI commands.
Set up Angular routing for the different pages.
Step 3: Set Up .NET Core Application

Navigate to the "dotnet-core-app" directory.
Create controllers and actions for user authentication, registration, and user retrieval. User Authentication and Registration/Sign Up
Login Page

Create a login component in Angular.
Implement a form with user name and password input fields.
Validate the form inputs, including password and user email.
Use Angular services to call the .NET Core API for user authentication.
Registration/SignUp Page

Create a registration component in Angular.
Implement a form with user registration fields (e.g., user name, email, password).
Validate the form inputs, including password and email.
Use Angular services to call the .NET Core API to store user registration information.
User Display and Logout User Display Grid

Create a user display component in Angular.
Use Angular services to call the .NET Core API to retrieve user information.
Display the list of registered users in a grid format.
Logout Functionality

Implement a logout functionality.
Upon clicking the logout button, clear the session and redirect to the login screen.
Backend Integration

Implement JWT token-based authentication in the .NET Core application.
Configure CORS to allow requests from the Angular frontend.
Create API controllers to handle user authentication, registration, and user retrieval.
Store user information in an SQL database.
