module.exports = app => {
  const controller = require("../controllers/controller.js");

  var router = require("express").Router();

  router.post("/reader",controller.createReader );
  router.post("/book",controller.createBook );
  router.post("/purchase", controller.buyBook);
  router.get("/all",controller.getAll)
  app.use("", router);
};
