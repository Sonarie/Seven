fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?s=korean&r=json&type=movie&page=10", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
		"x-rapidapi-key": "252f4cdf93mshd92d57684acca16p10facbjsnf00f4351c63f"
	}
})
.then(function(response) {
	response.json().then(function(data) {
        console.log(data);
    })
})
.catch(err => {
	console.error(err);
});