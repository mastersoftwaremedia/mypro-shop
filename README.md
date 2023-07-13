[![Heroku - View on Heroku](https://img.shields.io/badge/Heroku-View_on_Heroku-red?logo=Heroku&logoColor=white)](https://mypro-shop.herokuapp.com/)
![NPM](https://badgen.net/npm/v/express)

# mypro-shop
🚀 Full eCommerce platform from the ground up with React, Redux, Express &amp; MongoDB and more 


## **Project Setup**

**Backend**

```
npm install
```

```

  "scripts": {
    "start": "node backend/index",
    "server": "nodemon backend/index"
  },

```

```
npm run server
```

**Add Credentials**

Make sure to use Git Bash if you use windows to create a .env file at the root directory of your application to hide all your sensitive information

```
touch .env
```
Add following variables to .env file:

```
NODE_ENV=DEVELOPMENT

FRONTEND_URL=http://localhost:3000

DB_URI=

JWT_SECRET=
JWT_EXPIRES_TIME=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PAYPAL_CLIENT_ID=

SENDGRID_API=
EMAIL=
```

### frontend

```
npm start
```

If you have any questions about the project, feel free to email me @ fortestingpurpose06@gmail.com
