# Technical Assessment project - Alvin Lew

## Explanation
1. I have added security token check for all 3 end point in the assessment. Before calling the 3 API, please register a user account using POST http://localhost:3030/api/auth/register by passing in request body of {email: *youemail@email.com*, *password: yourpassword*}. The response body will contains a token which will expire in 24 hours. When query the 3 API in the assessment, please set header by adding this token to "x-access-token". Please contact me if you have any question/issue using the API. The reason for adding the security check is because I think it is essential to control who can access data from the database, if this is not required, please contact me to remove the security check.
2. This API is built using Node.js with ExpressJs framework. ORM is done using sequelize. 
3. Unit test is done using Mocha and Chai (unit test located in test/mochaTest.js).
4. Please create a database in MySQL and configure it before starting the server (Create DB script is inside mysql_createdbscript folder). MySQL configuration is in db.js line 7. "techassess_elearning" below is database name, "root" is username, 3rd param is the password which is empy.
```
const sequelize = new Sequelize('techassess_elearning', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: { $and: Op.and, $in: Op.in }
});
```

## Common setup
Clone the repo and install the dependencies via npm install.

```bash
git clone https://github.com/lewtw87/tech-assess-project
```

```bash
npm install
```

**Please configure you MySQL connection inside db.js before starting the server.**

To start the node.js server, run the following
```bash
node server.js
```

The application will be running at http://localhost:3030 .

## Testing the application before running
To test the application, run the following
```bash
npm test
```


## Usage
There are 5 endpoints in this application (3 from assessment specification, and 2 added by me for security purpose):
#### 1. Alvin Added Endpoint 1: Create a user
- End point: POST /api/auth/register
- Request body: Specifies email and password of the user
- Example (Request Body): 
```json
{
	"email": "lewtw87@gmail.com",
	"password": "alvinlew"
}
```
- Example (Response Body): 
```json
{
	"auth":true,
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```



#### 2. Alvin Added Endpoint 2: Login with existing user
- End point: POST /api/auth/login
- Request body: Specifies email and password of the user
- Example (Request Body): 
```json
{
	"email": "lewtw87@gmail.com",
	"password": "alvinlew"
}
```
- Example (Response Body): 
```json
{
	"auth": true,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```



#### 3. Assessment Endpoint 1: Add a question
<br />**You must set header's "x-access-token" value with the token obtained via previous end point.**
- End point: POST /api/questions
- Request body: Specifies question text and tags of question to be added
- Header:
```json
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```
- Example (Request Body): 
```json
{
	"question": "What is the boiling point of water?",
	"tags": ["science","physics","easy"]
}
```
- Example (Response Body): 
```json
{
	"id": 167
}
```



#### 4. Assessment Endpoint 2: Find questions by tags
<br />**You must set header's "x-access-token" value with the token obtained via previous end point.**
- End point: GET /api/questions
- Request body: Specifies question text and tags of question to be added
- Header:
```json
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```
- Example (Request Param): 
```json
?tag=easy&tag=science
```
- Example (Response Body): 
```json
{
	"questions": [
		{ 
			"question": "What is the boiling point of water?",
			"id": 167
		},
		{
			"question": "When ice melts, does it absorb or release heat?",
			"id": 170
		}
	]
}
```



#### 5. Assessment Endpoint 3: Make a random quiz
<br />**You must set header's "x-access-token" value with the token obtained via previous end point.**
- End point: POST /api/quiz
- Request body: Specifies list of question IDs in the pool, and their corresponding weights
- Header:
```json
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```
- Example (Request Body): 
```json
{
	"questions": [
		{ "id": 1, "weight": 0.5},
	    { "id": 2, "weight": 1.5},
	    { "id": 3, "weight": 1},
	    { "id": 4, "weight": 1}
	],
	"length": 3
}
```
- Example (Response Body): 
```json
{
	"questions": [2, 3, 4]
}
```


