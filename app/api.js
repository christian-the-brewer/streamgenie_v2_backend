const axios = require('axios')

const discoverMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const discoverTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const showMovieUrl = "https://api.themoviedb.org/3/movie/"


const showTvUrl = "https://api.themoviedb.org/3/tv/"

const searchMovieUrl = "https://api.themoviedb.org/3/search/movie?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&query="

const searchTvUrl = "https://api.themoviedb.org/3/search/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&query="

const apiKey = "?api_key=58a92a2a4d225c25e73bb7fe5bfb8183"

const languageCode = "&language=en-US"

//FETCH MOST POPULAR BY REGION
const fetchPopularMovies = (region) => {
    return axios({
        url: `${discoverMovieUrl}&watch_region=${region}`,
        method: 'GET'
    })
}

const fetchPopularShows = (region) => {
    return axios({
        url: `${discoverTvUrl}&watch_region=${region}`,
        method: 'GET'
    })
}

//FETCH MOST POPULAR BY REGION AND STREAMING PLATFORM
//URL https://api.themoviedb.org/3/discover/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=
const fetchPopularMoviesByPlatform = (region, platform) => {
    return axios({
        url: `${discoverMovieUrl}&watch_region=${region}&with_watch_providers=${platform}`,
        method: 'GET'
    })
}

const fetchPopularShowsByPlatform = (region, platform) => {
    return axios({
        url: `${discoverTvUrl}&watch_region=${region}&with_watch_providers=${platform}`,
        method: 'GET'
    })
}

//FETCH SPECIFIC TITLE BY API SUPPLIED ID
//EXAMPLE URL https://api.themoviedb.org/3/movie/75780?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US
//EXAMPLE URL https://api.themoviedb.org/3/movie/75780?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US
const fetchMovieById = (id) => {
    return axios({
        url: `${showMovieUrl}${id}${apiKey}${languageCode}`,
        method: 'GET'
    })
}

const fetchShowById = (id) => {
    showId = id
    return axios({
        url: `${showTvUrl}${id}${apiKey}${languageCode}`,
        method: 'GET'
    })
}

//FETCH BY TITLE
//example URL https://api.themoviedb.org/3/search/movie?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&query=jaws&watch_region=US


const fetchMoviesByTitle = (region, title) => {
    return axios({
        url: `${searchMovieUrl}${title}&watch_region=${region}`,
        method: 'GET'
    })
}

const fetchShowsByTitle = (region, title) => {
    return axios({
        url: `${searchTvUrl}${title}&watch_region=${region}`,
        method: 'GET'
    })
}

//FETCH WATCH PROVIDERS BY ID
//EXAMPLE URL
//EXAMPLE URL https://api.themoviedb.org/3/movie/75780/watch/providers?api_key=58a92a2a4d225c25e73bb7fe5bfb8183
const fetchMovieProviders = (id, movie) => {
    return axios({
        url: `${showMovieUrl}${id}/watch/providers${apiKey}`,
        method: 'GET'
    })
}

const fetchShowProviders = (id) => {
    return axios({
        url: `${showTvUrl}${id}/watch/providers${apiKey}`,
        method: 'GET'
    })
}

module.exports = { fetchPopularMovies, fetchPopularShows, fetchPopularMoviesByPlatform, fetchPopularShowsByPlatform, fetchMovieById, fetchShowById, fetchMoviesByTitle, fetchShowsByTitle, fetchMovieProviders, fetchShowProviders }