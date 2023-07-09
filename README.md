# friend.ly - An Anonymous Web App for Friends and Family

## Description
**friend.ly** is a Node.js and Express.js project that allows users to send messages to their friends using a fake name. It provides a simple and anonymous way to communicate with friends without revealing personal information.

## Visit the App
Find this app [here](https://friendly-2gdr.onrender.com)

## Features
- Send messages to friends using a fake name.
- Anonymous communication to protect user privacy.
- Easy-to-use interface for a seamless messaging experience.

## Requirements
- Nodejs on your system or on your deployment environment.
- A Firestore Database( Just provide the credentials to the app it configures it automatically)

## Installation
To install and run friend.ly on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/subinoybiswas/friend.ly.git
   ```
2. Navigate to the project directory:
   ```
   cd friend.ly
   ```
3. Navigate to `Backend` (Root of the Node project):
   ```
   cd Backend
   ```
4. Install the dependencies:
   ```
   npm install
   ```

## Configuration
Before running the application, you need to set up the following configurations:

1. Create a `.env` file in the root directory.
2. Specify the following environment variables in the `.env` file:
   ```
   PORT=3000
   CLIENT_ID=
   AUTH_PROVIDER=
   AUTH_URI=
   CLIENT_CERT=
   CLIENT_EMAIL=
   PRIVATE_KEY=
   PRIVATE_KEY_ID=
   PROJECT_ID=
   TOKEN_URI=
   TYPE=
   UNI_DOMAIN=
   ```
   Get these details from Firebase and put them in their corresponding places.

   Focus especially on the "PRIVATE_KEY" as you have to put it in the object format for this to work:
   ```
   {"private_key":"-----BEGIN PRIVATE KEY-----\n..blah...blah..blah----END PRIVATE KEY-----\n"}
   ```
   Alternatively, you can put the secrets in a `.json` file, as I did in the `etc/secrets/secret.json` file. This process is much easier for the local environment.

## Backend
The backend of the friend.ly project is built using Node.js and Express.js. It provides the API endpoints for sending and retrieving messages. The backend code can be found in the `Backend` directory.

To start the backend server, run the following command:
```
npm run start
```

## Frontend
The front end of the friend.ly project is built using HTML, CSS, and JavaScript. It provides the user interface for composing and viewing messages. The frontend code can be found in the `Frontend` directory.

The routing for the front end is primarily handled via the `index.js` file at `Backend/index.js`. Then it gets rerouted via the client-side javascript.

## Deployment
To deploy friend.ly to a production environment, follow these steps:

1. Set up a Firestore Database.
2. Configure the necessary environment variables in your production environment.
3. Set up the project and install the necessary dependencies.
4. Go to the correct directory (`Backend`)
5. Start the backend server:
   ```
   npm run start
   ```
6. Enjoy your app.

## Contributing
Contributions to friend.ly are welcome! If you find any bugs, have feature requests, or want to contribute code, please open an issue or submit a pull request to the project repository.

## License
The friend.ly project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
