// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

//model for favorites
const Favorites = require('../models/favorites')

//api calls
const { fetchPopularMovies, fetchPopularMoviesByPlatform, fetchMovieById, fetchMoviesByTitle, fetchMovieProviders, fetchShowProviders } = require('../api')

//error handling methods
const customErrors = require('../../lib/custom_errors')

//function to send 404 when doc requested doesn't exist
const handle404 = customErrors.handle404
// send 401 when user tries modifying resource without proper auth
const requireOwnership = customErrors.requireOwnership

//remove blanks
const removeBlanks = require('../../lib/remove_blank_fields')

//require token to be passed 
const requireToken = passport.authenticate('bearer', { session: false })

//instantiate router
const router = express.Router()


//INDEX
// GET /movies
router.get('/movies/:region', (req, res, next) => {
    //fetch top 20 most popular movies from API
    fetchPopularMovies(req.params.region)
        .then(handle404)
        .then((movies) => {
            //console.log(movies.data.results)
            res.status(201).json({ movies: movies.data.results })

        })
        .catch(next)
})

//INDEX BY STREAMING PLATFORM
// GET /movies/:region/:id
router.get('/movies/:region/:id', (req, res, next) => {
    //fetch top 20 most popular movies from API on specified platform
    fetchPopularMoviesByPlatform(req.params.region, req.params.id)
        .then(handle404)
        .then((movies) =>
            res.status(201).json({ movies: movies.data.results }))
        .catch(next)
})


//SHOW
// GET /movie/:id
router.get('/movie/:id', async (req, res, next) => {
    //fetch specified move using API's title id
    console.log("hit the route")
    await fetchMovieById(req.params.id)
        .then(handle404)
        .then((movie) => {
            fetchMovieProviders(req.params.id, movie)
                .then(handle404)
                .then((providers) => {
                    console.log("Providers:", providers.data.results)
                    console.log("movie:", movie.data)
                    const returnObject = {
                        "movie": {},
                        "providers": providers.data.results.US.flatrate
                            ?
                            providers.data.results.US.flatrate
                            :
                            []


                    }
                    returnObject.movie["contentId"] = movie.data.id
                    returnObject.movie["title"] = movie.data.title
                    returnObject.movie["poster_path"] = movie.data.poster_path
                    returnObject.movie["release_date"] = movie.data.release_date
                    returnObject.movie["vote_average"] = movie.data.vote_average
                    returnObject.movie["overview"] = movie.data.overview
                    returnObject.movie["tagline"] = movie.data.tagline
                    returnObject.movie["genres"] = movie.data.genres
                    returnObject.movie["runtime"] = movie.data.runtime
                    returnObject.movie["type"] = "movie"

                    console.log('returnobject:', returnObject)
                    res.status(201).json(returnObject)
                })
                .catch(next)
            // console.log("this is movie:", movie)
            // res.status(201).json({ movie: movie.data.results })


        }
        )
        .catch(next)
})

//INDEX SEARCH BY  REGION, AND TITLE
//GET /search/movies/:region/:title
router.get('/search/movies/:region/:title', (req, res, next) => {
    //fetch search for title 
    fetchMoviesByTitle(req.params.region, req.params.title)
        .then(handle404)
        .then((movies) =>
            res.status(201).json({ movies: movies.data.results }))
        .catch(next)
})



module.exports = router