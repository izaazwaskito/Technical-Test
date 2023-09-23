//const createError = require('http-errors')
const commonHelper = require("../helper/common");
const { default: axios } = require("axios");

let jobController = {
  getAllJob: async (req, res) => {
    try {
      // const page = Number(req.query.page) || 1;
      // const limit = Number(req.query.limit) || 5;
      // const offset = (page - 1) * limit;
      // const sortby = req.query.sortby || "id_product";
      // const sort = req.query.sort || "ASC";
      // const search = req.query.search || "";
      // let result = await selectAllProduct({
      //   limit,
      //   offset,
      //   sort,
      //   sortby,
      //   search,
      // });
      // const {
      //   rows: [count],
      // } = await countData();
      // const totalData = parseInt(count.count);
      // const totalPage = Math.ceil(totalData / limit);
      // const pagination = {
      //   currentPage: page,
      //   limit: limit,
      //   totalData: totalData,
      //   totalPage: totalPage,
      // };
      // commonHelper.response(
      //   res,
      //   result.rows,
      //   200,
      //   "Get Product Data Success",
      //   pagination
      // );
      // axios
      //   .get("http://dev3.dansmultipro.co.id/api/recruitment/positions.json")
      //   .then(function (response) {
      //     res.json(response.data);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      const page = req.query.page;
      const limit = req.query.limit;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const filters = req.query;
      axios
        .get("http://dev3.dansmultipro.co.id/api/recruitment/positions.json")
        .then(function (response) {
          let resultUsers = response.data.slice(startIndex, endIndex);
          // res.json(resultUsers);
          let filteredUsers = response.data.filter((user) => {
            let isValid = true;
            for (key in filters) {
              isValid = isValid && user[key] == filters[key];
            }
            return isValid;
          });
          // res.json(filteredUsers);

          page ? res.json(resultUsers) : res.json(filteredUsers);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  },
  getDetailJob: async (req, res) => {
    const id = String(req.params.id);
    await axios
      .get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const { rowCount } = await findId(id_product);
    // if (!rowCount) {
    //   return res.json({ message: "ID Not Found" });
    // }
    // selectProduct(id_product)
    //   .then((result) => {
    //     commonHelper.response(
    //       res,
    //       result.rows,
    //       200,
    //       "get data success from database"
    //     );
    //     // commonHelper.response(res,result.rows,200,"Get Product Detail Success");
    //   })
    //   .catch((err) => res.send(err));
  },
};

module.exports = jobController;
