## About

    A backend for the client [StreamGenie](https://github.com/Rando-cal/streamgenie-frontend) that handles fetching data from the third-party API [TMDb](https://developers.themoviedb.org/3/getting-started/introduction) to populate user searches and favorite list.

## API

[The Movie Database](https://api.themoviedb.org/3)

## Installation

## Backend

## Technologies

- React-Shopping-Cart : Shopping cart package
- JavaScript : programming language for websites
- Axios : making API and backend requests
- Bootstrap : CSS styling
- Dotenv : setting and hiding our backend variables
- React : front-end JavaScript library
- React-Boostrap : UI styling for REACT
- React-Dom : allows for DOM-specific methods
- React-Router-Dom : implmentation of web page routing
- React-Scrips : code to create scripts and configurations
- Sass : CSS extension scripting
- Uuid : npm package to create universally unique identifiers
- Web-vitals : library for measuring all the metrics on users

## ERD

![ERD](resources/ERD-back.PNG)

## Roles

Randy D'Abbraccio - Frontend & Manager |
Christian Brewer - Backend API

## Routes

### Authentication

| Verb   | URI Pattern                     | Controller#Action            |
| ------ | ------------------------------- | ---------------------------- |
| POST   | `/sign-up`                      | `users#signup`               |
| POST   | `/sign-in`                      | `users#signin`               |
| PATCH  | `/change-password/`             | `users#changepw`             |
| DELETE | `/sign-out/`                    | `users#signout`              |
| POST   | `/favorites`                    | `favoritesList#create`       |
| PATCH  | `/favorites/:id`                | `favoritesList#update`       |
| GET    | `/favorites`                    | `get#favoritesList`          |
| GET    | `/movies/:region`               | `get#movies`                 |
| GET    | `/movies/:region/:id`           | `get#movies by platform id`  |
| GET    | `/search/movies/:region/:title` | `get#movies by title search` |
| GET    | `/tv/:region`                   | `get#tv`                     |
| GET    | `/tv/:region/:id`               | `get#tv by platform id`      |
| GET    | `/search/tv/:region/:title`     | `get#tv by title search`     |
