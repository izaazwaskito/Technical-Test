let {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId,
} = require("../model/category");
const commonHelper = require("../helper/common");

let categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id_category";
      const sort = req.query.sort || "ASC";
      let result = await selectAllCategory({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "Get Category Data Success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },
  getDetailCategory: async (req, res) => {
    const id_category = Number(req.params.id);
    const { rowCount } = await findId(id_category);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectCategory(id_category)
      .then((result) => {
        commonHelper.response(
          res,
          result.rows,
          200,
          "Get Category Detail Success"
        );
      })
      .catch((err) => res.send(err));
  },
  createCategory: async (req, res) => {
    const { name_category } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id_category = Number(count.count) + 1;
    const role_user = req.payload.role_user;
      try {
        if (role_user != "seller") throw "You're Cannot Access this feature";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }
    const data = {
      id_category,
      name_category,
    };
    insertCategory(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Category Success")
      )
      .catch((err) => res.send(err));
  },
  updateCategory: async (req, res) => {
    try {
      const id_category = Number(req.params.id);
      const { name_category } = req.body;
      const { rowCount } = await findId(id_category);
      const role_user = req.payload.role_user;
      try {
        if (role_user != "seller") throw "You're Cannot Access this feature";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        id_category,
        name_category,
      };
      updateCategory(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Update Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id_category = Number(req.params.id);
      const { rowCount } = await findId(id_category);
      const role_user = req.payload.role_user;
      try {
        if (role_user != "seller") throw "You're Cannot Access this feature";
      } catch (error) {
        return commonHelper.response(res, null, 404, error);
      }
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteCategory(id_category)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Delete Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoryController;
