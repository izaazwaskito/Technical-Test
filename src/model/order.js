const Pool = require("../config/db");

const selectAllOrder = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT order_list.id_order, product.name_product, order_list.quantity_order, product.price_product*order_list.quantity_order AS total_order, order_list.date_order, product.image_product
    FROM order_list
    INNER JOIN product ON order_list.id_product = product.id_product
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectOrder = (id_order) => {
  return Pool.query(`SELECT order_list.id_order, product.name_product, order_list.quantity_order, product.price_product*order_list.quantity_order AS total_order, order_list.date_order, product.image_product
  FROM order_list
  INNER JOIN product ON order_list.id_product = product.id_product WHERE id_order = ${id_order}`);
};

const insertOrder = (data) => {
  const { id_order, id_product, quantity_order, date_order } = data;
  return Pool.query(
    `INSERT INTO order_list(id_order, id_product, quantity_order, date_order) VALUES(${id_order},${id_product},${quantity_order}, '${date_order}')`
  );
};

const updateOrder = (data) => {
  const { id_order, id_product, quantity_order, date_order } = data;
  return Pool.query(
    `UPDATE order_list SET id_product = ${id_product}, quantity_order = ${quantity_order}, date_order = '${date_order}'  WHERE id_order = ${id_order}`
  );
};

const deleteOrder = (id_order) => {
  return Pool.query(`DELETE FROM order_list WHERE id_order = ${id_order}`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM order_list`);
};

const findId = (id_order) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id_order FROM order_list WHERE id_order=${id_order}`,
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

module.exports = {
  selectAllOrder,
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId,
};
