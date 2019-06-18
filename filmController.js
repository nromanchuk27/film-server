// Import contact model
const Film = require("./filmModel");
// Handle index actions
exports.index = function(req, res) {
  console.log("!!!!!!", req.query);
  if (req.query.searchValue) {
    let searchQuery = {
      name: { $regex: req.query.searchValue }
    };
    if (req.query.searchFilter === "actors") {
      searchQuery = {
        actors: { $regex: req.query.searchValue }
      };
    }
    Film.find(searchQuery, (err, films) => {
      console.log(films);
      if (err) {
        return res.json({
          status: "error",
          message: err
        });
      }
      return res.json({
        status: "success",
        message: "Films retrieved successfully",
        data: films
      });
    });
  } else {
    Film.get(function(err, films) {
      if (err) {
        return res.json({
          status: "error",
          message: err
        });
      }
      console.log(films);
      res.json({
        status: "success",
        message: "Films retrieved successfully",
        data: films
      });
    });
  }
};
// Handle create contact actions
exports.new = function(req, res) {
  console.log(">>", req.body);
  var film = new Film();
  film.name = req.body.name;
  film.format = req.body.format;
  film.actors = req.body.actors;
  film.year = req.body.year;
  // save the contact and check for errors
  film.save(function(err) {
    if (err) return res.json(err);
    res.json({
      message: "New film created!",
      data: film
    });
  });
};
// Handle view contact info
exports.view = function(req, res) {
  Film.findById(req.params.film_id, function(err, film) {
    if (err) return res.send(err);
    res.json({
      message: "Film details loading..",
      data: film
    });
  });
};
// Handle update contact info
exports.update = function(req, res) {
  Film.findById(req.params.film_id, function(err, film) {
    if (err) res.send(err);
    film.name = req.body.name ? req.body.name : film.name;
    film.format = req.body.format;
    film.actors = req.body.actors;
    film.year = req.body.year;
    // save the contact and check for errors
    film.save(function(err) {
      if (err) return res.json(err);
      res.json({
        message: "Film Info updated",
        data: film
      });
    });
  });
};
// Handle delete contact
exports.delete = function(req, res) {
  Film.remove(
    {
      _id: req.params.film_id
    },
    function(err, film) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "film deleted"
      });
    }
  );
};
