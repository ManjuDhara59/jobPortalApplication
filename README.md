# Job Portal Application

Welcome to the Job Portal Application! This application serves as a platform for connecting job seekers with employers, facilitating job postings, applications, and more.

## Installation

To set up the Job Portal Application frontend, follow these steps:

1. Clone this repository to your local machine:

     
    git clone https://github.com/ManjuDhara59/jobPortal
     

2. Navigate to the project directory:

     
    cd my-app
     

3. Install dependencies using npm:

     
    npm install
     

For the backend setup, please ensure that you have a database configured and running. Then, use SQL insert commands to populate the necessary data. For example, to insert admin credentials:

## Usage
To use the Job Portal Application, follow these steps:

1) Admin Setup: After inserting admin credentials, log in as an admin. Set up subscription plans for employers.

 use this sql command to insert the data

 INSERT INTO admin (username, password, fullname, email, phone, otp)
 VALUES ('admin', 'password123', 'Admin User', 'admin@example.com', '1234567890', '123456');

2) start the react application using below command
   npm start
3) Employer Signup and Approval: Employers need to sign up and wait for admin approval. Admin generates credentials for approved employers. Employers can then log in and post job details.

4) Job Seeker Signup and Job Search: Job seekers can sign up and start applying for jobs posted by approved employers.


## Libraries/Frameworks Used
The Job Portal Application frontend utilizes the following libraries/frameworks:

React: A JavaScript library for building user interfaces.
React Router DOM: Declarative routing for React applications.
Axios: Promise-based HTTP client for making API requests.
Framer Motion: Animation library for React components.
React Icons: Library for popular icon sets as React components.
React Toastify: Notification system for React applications.
Emotion: CSS-in-JS library for styling React components.
Material-UI: React components for faster and easier web development.
Semantic UI: CSS framework for styling user interfaces.


For backend testing, the application utilizes Jacoco for code coverage reports. Run tests and generate reports as follows:

1) Navigate to profiles > jobportal > lifestyle.
2) Select "clean and test" to run tests.
3) Find code coverage reports under target/site/jacoco/index.html.




