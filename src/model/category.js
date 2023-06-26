const Pool = require("../config/db");

const selectAllCategory = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectCategory = (id_category) => {
  return Pool.query(
    `SELECT * FROM category WHERE id_category = ${id_category}`
  );
};

const insertCategory = (data) => {
  const { id_category, name_category } = data;
  return Pool.query(`INSERT INTO category(id_category, name_category) 
    VALUES (${id_category},'${name_category}')`);
};

const updateCategory = (data) => {
  const { id_category, name_category } = data;
  return Pool.query(
    `UPDATE category SET name_category = '${name_category}' WHERE id_category = ${id_category}`
  );
};

const deleteCategory = (id_category) => {
  return Pool.query(`DELETE FROM category WHERE id_category = ${id_category}`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM category`);
};

const findId = (id_category) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id_category FROM category WHERE id_category=${id_category}`,
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
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId,
};
