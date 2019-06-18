var mongoose = require("mongoose");
// Setup schema
var filmsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  actors: {
    type: Array,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
// filmsSchema.createIndex({ name: "text" });
// Export Contact model
var Film = (module.exports = mongoose.model(
  "Film",
  filmsSchema,
  "testCollection"
));
module.exports.get = function(callback, limit) {
  Film.find(callback).limit(limit);
};
