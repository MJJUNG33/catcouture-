const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

// Get router validate the query though queryParamValidationMiddleware first and then
// if it's correct, response with correct response body which is responseResult.
// And implement repository design pattern so that it's easy to maintain and reuse
// as get a data though product repository rather than connect directly from database.
// Also set the default limit(10) and page(1) as assign safeLimit and safePage variable.
router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const safeLimit = limit ? parseInt(limit) : 10;
      const safePage = parseInt(page) ? parseInt(page) : 1;

      const products = await productRepository.getProducts(safeLimit, safePage);
      const totalProducts = await productRepository.getTotalProducts();
      const totalPages = Math.ceil(totalProducts.length / safeLimit);

      const responseResults = {
        products,
        currentPage: safePage,
        itemsPerPage: safeLimit,
        totalItems: totalProducts.length,
        totalPages: totalPages,
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
