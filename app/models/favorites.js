const mongoose = require('mongoose')

const favoritesSchema = new mongoose.Schema(
    {
        content: [
            {
                contentId: Number,
                title: String,
                poster_path: String,
                release_date: String,
                vote_average: Number,
                overview: String,
                tagline: String,
                genre: [{}],
                runtime: Number,
                number_of_seasons: Number,
                type: String

            }
        ],
        owner: {
            $type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

    {
        typeKey: '$type',
        timestamps: true
    }
)

module.exports = mongoose.model('Favorites', favoritesSchema)