// 1. Arrow Functions
// function greet(username) {
//     return 'Hello, ' + username; 
// }

// const greetArrow = (username) => {
//     return `Hello, ${username}`;
// }; 

// const greetshort = username => `Hello, ${username}`; 

// console.log(greet('Alex'));
// console.log(greetArrow('Alex'));
// console.log(greetshort('Alex'));

// 2. Template Literals
// const testUser = 'John Doe';
// const testEnvironment = 'staging';
// const testCount = 5; 

// const oldMessage = 'Running ' + testCount +
//     ' tests for user ' + testUser +
//     ' in ' + testEnvironment;

// console.log(oldMessage); 

// const newMessage =
//     `Running ${testCount} tests for user ${testUser} in ${testEnvironment}`;

// console.log(newMessage);

// 3. Destructuring
// const testConfig = {
//     baseUrl: 'https://insurance.roadtoqa.com',
//     timeout: 30000,
//     retries: 2,
// }; 
// const baseUrl = testConfig.baseUrl;
// const timeout = testConfig.timeout;
// const retries = testConfig.retries;

// console.log(baseUrl, timeout, retries);  
   
// const { baseUrl, timeout, retries } = testConfig;

// console.log(baseUrl, timeout, retries);

// 4. Spread Operator

// const basicTests = ['login', 'logout'];
// const advancedTests = ['api test', 'performance test'];

// const defaultConfig = { timeout: 3000, retries: 3 }; 

// const allTests = [...basicTests, ...advancedTests, 'security test'];

// console.log(allTests); 

// const customConfig = { ...defaultConfig, browser: 'firefox' };

// console.log(customConfig); 

// 5. Default Parameters

// const runTest = (testName, browser = 'chromium', timeout = 3000) =>
//     `${testName} on ${browser} with ${timeout}ms timeout`; 

// console.log(runTest('Login test'));
// console.log(runTest('Login test', 'firefox'));
// console.log(runTest('Login test', 'firefox', 6000)); 

// 6. Enhanced Object Literals

// const username = 'testuser';
// const password = 'testpass';
// const user1 = {
//     username: username,
//     password: password
// };
// const user2 = {
//     username,
//     password
// };
// console.log(user1);
// console.log(user2);
// const admin1 = {
//     name: 'admin',
//     login: function() {
//         return 'Logged in';
//     }
// };
// const admin2 = {
//     name: 'admin',
//     login() {
//         return 'Logged in';
//     }
// }; 
// console.log(admin1.login());
// console.log(admin2.login());

// 7. ES6 Practice — Arrow Functions

// function testLogin(username, password) {
//     const valid = username === 'admin' && password === 'Test1';
//     return valid ? 'success' : 'error';
// }

// console.log(testLogin('admin', 'wrongpassword')); 

// const testLoginArrow = (username, password) => {
//     const valid = username === 'admin' && password === 'Test1';
//     return valid ? 'success' : 'error';
// };

// console.log(testLoginArrow('admin', 'wrongpassword'));

// Homework 7 — String Concatenation Practice
// const loginUser = 'testuser';
// const loginAttempts = 1;
// const maxAttempts = 3;

// // Traditional JavaScript: String concatenation
// const loginMessage = 'User ' + loginUser + ' has made ' + loginAttempts +
//     ' login attempt out of ' + maxAttempts + ' allowed.'; 

// // ES6: Template Literal
// const loginMessageES6 = `User ${loginUser} has made ${loginAttempts} login attempt out of ${maxAttempts} allowed.`;

// console.log(loginMessage);
// console.log(loginMessageES6);

// Homework 7 — Default Browser Parameter

const openSite = (url, browser = 'chromium') => {
    return `Opening ${url} in ${browser}`;
};
console.log(openSite('testamplify.com'));
console.log(openSite('testamplify.com', 'firefox'));
console.log(openSite('testamplify.com', 'webkit'));