const express = require("express");
const {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} = require("../db/wishList.js");

const { isLoggedIn } = require("./middleware");

const router = express.Router();

router.use(isLoggedIn);

router.get("/", async (req, res, next) => {
  try {
    const items = await fetchWishlist(req.user.id);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("Request body for POST /wishlist:", req.body);
    const { productId } = req.body;
    const item = await addToWishlist(req.user.id, productId);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await removeFromWishlist(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
