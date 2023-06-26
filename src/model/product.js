const Pool = require("../config/db");

const selectAllProduct = ({ limit, offset, sort, sortby, search }) => {
  return Pool.query(`SELECT product.id_product, product.name_product, category.name_category, product.price_product, product.description_product, product.stock_product, product.image_product
    FROM category
    INNER JOIN product ON category.id_category = product.id_category
    WHERE name_product ILIKE '%${search}%'
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectProduct = (id_product) => {
  return Pool.query(`SELECT product.id_product, product.name_product, category.name_category, product.price_product, product.description_product, product.stock_product, product.image_product
  FROM category
  INNER JOIN product ON category.id_category = product.id_category WHERE id_product = ${id_product}`);
};

const insertProduct = (data) => {
  const {
    id_product,
    id_category,
    name_product,
    price_product,
    description_product,
    stock_product,
    image_product,
  } = data;
  return Pool.query(`INSERT INTO product(id_product, id_category, name_product, price_product, description_product, stock_product, image_product) 
    VALUES (${id_product}, ${id_category}, '${name_product}', ${price_product}, '${description_product}', ${stock_product}, '${image_product}')`);
};

const updateProduct = (data) => {
  const {
    id_product,
    id_category,
    name_product,
    price_product,
    description_product,
    stock_product,
    image_product,
  } = data;
  return Pool.query(
    `UPDATE product SET id_category = ${id_category}, name_product = '${name_product}', price_product = ${price_product}, description_product = '${description_product}', stock_product = ${stock_product}, image_product = '${image_product}' WHERE id_product = ${id_product}`
  );
};

const deleteProduct = (id_product) => {
  return Pool.query(`DELETE FROM product WHERE id_product = ${id_product}`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM product`);
};

const findId = (id_product) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id_product FROM product WHERE id_product=${id_product}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const searchNameProduct = ({ keywords }) => {
  return Pool.query(`SELECT product.id_product, product.name_product, category.name_category, product.price_product, product.description_product, product.stock_product, product.image_product
    FROM category
    INNER JOIN product ON category.id_category = product.id_category
    WHERE name_product ILIKE '%${keywords}%'`);
};

module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
  searchNameProduct,
};
