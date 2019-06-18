// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});
// Import contact controller
var filmController = require("./filmController");
// Contact routes
router
  .route("/films")
  .get(filmController.index)
  .post(filmController.new);
router
  .route("/films/:film_id")
  .get(filmController.view)
  .patch(filmController.update)
  .put(filmController.update)
  .delete(filmController.delete);
// Export API routes
module.exports = router;
