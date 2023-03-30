
# API Resource Documentation

## Movie-API
This API is a movie API that saves different movies based on the properties
* title
* releaseYear
* category

This API is open for GET requests towards the movies.
The API is open to register for everyone, but you can only edit your own resources on the API, in order to do this you need to authenticate.

## Base url to the API
https://movie-api-production-ad52.up.railway.app/api/v1/

## /user/register
* POST /user/register: register a user.

## /user/login
* POST /user/login: login a user.

## /movie/
* GET /movie: get all movies.
* POST /movie: Create a new movie

## /movie/:id
* GET /movie/:id : get a specific movie.
* DELETE /movie/:id : delete a specific movie.
* PUT /movie/:id : update all in a specific movie.
* PATCH /movie/:id : update some parts in a specific movie.

## /webhook/register
* POST /webhook/register : register a url that will be used when notifying if a new movie is created in the API.

## /webhook/trigger
* POST /webhook/trigger : triggers when a movie is created. sends the created movie to all of the urls that has been registered