# Cherish Recipes Platform

> Recipes for everybody. Let's cook!

This is a recipe web application built with MERN stack for cooks to share their recipes and expertise with everybody on the world.

![Project Preview](https://drive.google.com/file/d/16teie0BvWJjo0t6kqAXRr2STlJQ6Oe3Q/view)

# Quick Start 🚀

### Create .env file in the root directory and fill it with your own data:

```
NODE_ENV = development
PORT = 5000
MONGO_URI =

JWT_SECRET = you get to choose
JWT_EXPIRE = 30d
JWT_COOKIE_EXPIRE = 30

SMTP_HOST=
SMTP_EMAIL =
SMTP_PASSWORD =
FROM_EMAIL =
FROM_NAME =
```

### Install Backend dependencies

```bash
npm install
```

### Install Frontend dependencies

```bash
cd frontend
npm install
```

## Run in development

```
npm run dev
```

## Build & Deploy

change NODE_ENV in your .env file to production and run:

```bash
# Create frontend production build
cd frontend
npm run build
```

After your running this command you can see the app running on http://localhost:5000

## Live application

The application is live at [cherishrecipes](https://www.cherishrecipes.herokuapp.com)

## App Info

### Author

Mehdi Ait Ouchrif

### Version

1.0.0

### Licence

This project is licenced under the MIT License
