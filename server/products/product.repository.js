const db = require("../db");

const getAllProductsSQL = `
SELECT
p.id,
p.name,
p.description,
p.price,
pc.name AS "categoryName",
pi.name AS "imageName",
pi.description AS "imageDescription"
FROM product p
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
ORDER BY
p.id
`;

const getPagedProductSQL = `
SELECT
  p.id,
  p.name,
  p.description,
  p.price,
  pc.name AS "categoryName",
  pi.name AS "imageName",
  pi.description AS "imageDescription",
  pd.value AS "discountValue", 
  dt.type AS "discountType"
FROM product p
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
LEFT JOIN product_discount pd ON pd.product_id = p.id 
LEFT JOIN discount_type dt ON pd.discount_type_id = dt.id
LIMIT $1 OFFSET $2
`;

const productRepository = {
  getProducts: async (limit, page) => {
    try {
      if (page <= 0 || !page) {
        throw new Error("page number must greater than 0");
      }

      const offset = limit * (page - 1);
      const { rows } = await db.query(getPagedProductSQL, [limit, offset]);
      return rows;
    } catch (error) {
      throw Error(error);
    }
  },
  getTotalProducts: async () => {
    try {
      const { rows } = await db.query(getAllProductsSQL);
      return rows;
    } catch (error) {
      throw Error(error);
    }
  },
};

module.exports = productRepository;
