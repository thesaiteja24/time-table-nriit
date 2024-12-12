# Overview

This is a Node.js/Express.js backend application with MongoDB Atlas integration.


# 1. Express Server Setup

Your can refer to the official documentation [here](https://expressjs.com/en/starter/installing.html)

Assuming you’ve already installed [Node.js](https://nodejs.org/), create a directory to hold your application, and make that your working directory.

```console
$ mkdir myapp
$ cd myapp
```

Use the `npm init` command to create a `package.json` file for your application. For more information on how `package.json` works, see [Specifics of npm’s package.json handling](https://docs.npmjs.com/files/package.json).

```console
$ npm init
```

This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

```
entry point: (index.js)
```

Enter `app.js`, or whatever you want the name of the main file to be. If you want it to be `index.js`, hit RETURN to accept the suggested default file name.

Now, install Express in the `myapp` directory and save it in the dependencies list. For example:

```console
$ npm install express
```


### Basic server setup

```javascript
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
```

This app starts a server and listens on port 8080 for connections. The app responds with “Hello World!” for requests to the root URL (`/`) or  *route* . For every other path, it will respond with a  **404 Not Found** .

Run the app with the following command:

```console
$ node app.js
```

Then, load `http://localhost:8080/` in a browser to see the output.
