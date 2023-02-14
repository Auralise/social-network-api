
# Social Network API

![MIT Licence](https://img.shields.io/badge/licence-MIT-green?style=flat)

## Description

This is an example of a simple RESTful API designed to allow users to create profiles, add thoughts as well as reactions to thoughts of others. 

The project has been written without using async/await to net me some more experience with the conventional promise syntax. 

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Technology](#technology)
- [Credits](#credits)
- [License](#licence)

## Installation

This project is fairly straightforward to run
1. Install Node (v16+) and MongoDB
2. Clone the repo locally
3. From the root directory of the application run `npm i` or `npm install` to install the application and dependencies
4. Run the application using `npm run start` 

## Usage

The application has several endpoints that can be hit. 

Replace all segments of the URL with angle brackets with the corresponding value

### User

#### **/api/user/**

##### GET - Get all users
- No arguments

##### POST - Create user
- username: Required - The username of the profile you wish to create
- email: Required - email associated with the profile

#### **/api/user/\<userId>**

##### GET - Get a user by their user ID
- No arguments

##### PUT - Update a user
- username: Optional - updated username
- email: Optional - updated email
- Note: at least one paramter must be passed

##### DELETE - Remove a user
- No arguments

#### **/api/user/\<userId>/friends/\<friendUserId>**

##### POST - add friend to user
- No arguments

##### DELETE - Remove Friend
- No arguments


### Thoughts and reactions

#### **/api/thoughts/**

##### GET - get all thoughts
- No arguments

##### POST - Create a new thought 
- username: required - Username of the user posting the thought
- thought: required - The contents of the thought 

#### **/api/thoughts/\<thoughtId>**

##### GET - Find thought by ID
- No arguments

##### PUT - Update a specific thought
- thoughtText: required - The updated contents of the thought

##### DELETE - Remove a thought
- No arguments

#### **/api/thought/\<thoughtId>/reactions**

##### POST - Create a reaction
- username: required - Username of the person reacting
- reaction: required - Contents of the reaction

#### **/api/thought/\<thoughtId>/reactions/\<reactionId>**

##### DELETE - remove a reaction
- No arguments

## Technology

- Node
- Express
- Mongoose
- MongoDB


## Credits

- James Prince



## Licence

URL: https://choosealicense.com/licenses/mit/

```

  MIT License

  Copyright (c)  James Prince
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
```

  

---


## Questions

[My Github](https://github.com/Auralise)

[Email me](mailto:james.prince1@gmail.com)

---

Copyright &copy; 2023, James Prince
