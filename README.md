# Technical Assessment project - Alvin Lew


## Common setup
Clone the repo and install the dependencies.

```bash
git clone https://github.com/lewtw87/tech-assess-project
```

```bash
npm install
```

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


##Usage
There are 5 endpoints in this application (3 from assessment specification, and 2 is added by me for security purpose):
- Alvin Added Endpoint 1: Create a user
End point: POST /api/auth/register
Request body: Specifies email and password of the user
Example (Request Body): 
```json
{
	"email": "lewtw87@gmail.com",
	"password": "alvinlew"
}
```
Example (Respond Body): 
```json
{
	"auth":true,
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```

- Alvin Added Endpoint 2: Login with existing user
End point: POST /api/auth/login
Request body: Specifies email and password of the user
Example (Request Body): 
```json
{
	"email": "lewtw87@gmail.com",
	"password": "alvinlew"
}
```
Example (Respond Body): 
```json
{
	"auth": true,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```

- Assessment Endpoint 1: Add a question
* You must set header's "x-access-token" value with the token obtained via previous end point.
End point: POST /api/questions
Request body: Specifies question text and tags of question to be added
Header:
```json
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```
Example (Request Body): 
```json
{
	"question": "What is the boiling point of water?",
	"tags": ["science","physics","easy"]
}
```
Example (Respond Body): 
```json
{
	"id": 167
}
```

- Assessment Endpoint 2: Find questions by tags
* You must set header's "x-access-token" value with the token obtained via previous end point.
End point: GET /api/questions
Request body: Specifies question text and tags of question to be added
Header:
```json
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```
Example (Request Param): 
```json
?tag=easy&tag=science
```
Example (Respond Body): 
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

- Assessment Endpoint 3: Make a random quiz
* You must set header's "x-access-token" value with the token obtained via previous end point.
End point: POST /api/quiz
Request body: Specifies list of question IDs in the pool, and their corresponding weights
Header:
```json
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTQyNTIyOTg4LCJleHAiOjE1NDI2MDkzODh9.JSMD6GFe7fGcQXoTkAivBpYmTZrHuJo-96G6ROPykNs"
}
```
Example (Request Body): 
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
Example (Respond Body): 
```json
{
	"questions": [2, 3, 4]
}
```


##Explanation
