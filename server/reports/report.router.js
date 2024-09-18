const express = require("express");
const router = express.Router();
const reportRepository = require("./report.repository");
const {
  checkJwt,
  checkScopes,
} = require("../middleware/authorizationMiddleware");

// Add checkJwt and checkScope first to validate the user's authentication and
// authorization before fetch the data.
router.get("/", checkJwt, checkScopes, async (req, res, next) => {
  try {
    const categoryReport = await reportRepository.getCategoryReport();
    const discountReport = await reportRepository.getDiscountReport();

    const response = {
      categoryReport,
      discountReport,
    };

    return res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
