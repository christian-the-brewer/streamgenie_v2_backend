// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

//model for favorites
const Favorites = require('../models/favorites')

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

//DO NOT NEED INDEX ROUTE

//SHOW ROUTE
//GET /favorites
router.get('/favorites', requireToken, (req, res, next) => {

    Favorites.findOne({ owner: req.user.id })
        .then(handle404)
        // // if `findById` is succesful, respond with 200 and "cart" JSON
        .then((favorites) => res.status(200).json({ favorites: favorites.content.toObject() }))
        // // if an error occurs, pass it to the handler
        .catch(next)
})

//CREATE MAY NOT USE. INSTEAD WILL CREATE NEW LIST WHEN ADDING TO LIST FOR FIRST TIME
//CREATE
//POST /favorites
router.post('/favorites', requireToken, (req, res, next) => {
    // set owner of new item to be current user
    req.body.favorites.owner = req.user.id

    Favorites.create(req.body.favorites)
        // respond to succesful `create` with status 201 and JSON of new "item"
        .then((favorites) => {
            res.status(201).json({ favorites: favorites.toObject() })
        })
        // if an error occurs, pass it off to our error handler
        // the error handler needs the error message and the `res` object so that it
        // can send an error message back to the client
        .catch(next)
})

// UPDATE IS BOTH ADD AND DELETE CONTENT FROM LIST

//UPDATE TO ADD TO FAVORITES
// PATCH /favorites/:id
// router.patch('/favorites/add', requireToken, (req, res, next) => {
//     Favorites.findOne({ owner: req.user.id })
//         .then(handle404)
//         .then((favorites) => {
//             favorites.content.push(req.body.content)
//             favorites.save

//         })
//         .then(() => res.sendStatus(204))
//         .catch(next)
// })
router.post('/favorites/add', requireToken, async (req, res, nexcart) => {
    Favorites.findOne({ owner: req.user.id }, async function (error, favorites) {
        if (favorites) {
            // favorites.content.push(req.body.content)
            favorites.content.push(req.body.content)
            // favorites.content.title = req.body.content.title
            // favorites.content.poster_path = req.body.content.poster_path
            // favorites.content.release_date = req.body.content.release_date
            // favorites.content.vote_average = req.body.content.vote_average
            // favorites.content.overview = req.body.content.overview
            // favorites.content.tagline = req.body.content.tagline
            // favorites.content.genres = req.body.content.genres
            // favorites.content.runtime = req.body.content.runtime
            // favorites.content.type = req.body.content.type
            await favorites.save()
            console.log("movie:", req.body.content)
            console.log("added to existing favorites list", favorites)
            console.log('favorites.content:', favorites.content)
        } else {
            const newFavorites = new Favorites()
            newFavorites.owner = req.user.id
            newFavorites.content.push(req.body.content)
            await newFavorites.save()
            console.log("movie:", req.body.content)
            console.log("create new favorites list :", newFavorites)
            console.log('newfavorites.content:', newFavorites.content)
        }
    })

})


//UPDATE TO REMOVE FROM FAVORITES LIST
router.patch('/favorites/remove/:id', requireToken, removeBlanks, (req, res, next) => {
    // delete req.body.cart.owner

    Favorites.findOneAndUpdate({ owner: req.user.id }, { "$pull": { "content": { "contentId": req.params.id } } })
        .then(handle404)
        // if that succeeded, return 204 and no JSON
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})

module.exports = router