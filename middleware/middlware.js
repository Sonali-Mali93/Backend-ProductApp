const jwt = require("jsonwebtoken");
const product = require("../model/product");
const mongoose = require("mongoose");

const authentication = (req, res, next) => {
  try {
    let token = req.headers["x-api-token"];
    if (!token)
      return res.status(400).send({ status: false, msg: "please enter token" });

    let decodeToken = jwt.verify(token, "jwt-secrete-key");

    if (!decodeToken)
      return res.status(401).send({
        status: false,
        msg: "token is invalid please enter valid token",
      });

    req["userId"] = decodeToken.userId;

    next();
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const authorization = async (req, res, next) => {
  try {
    const id = req.userId;
    const productId = req.params.productId;
    if (!productId) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide productId" });
    }
    const productIdObj = new mongoose.Types.ObjectId(req.params.productId);

    const productData = await product.findOne({ _id: productIdObj });
    if (!productData) {
      return res
        .status(400)
        .send({ status: false, msg: "No such product Exists" });
    }

    const user = productData.user.toString();

    if (user !== id) {
      return res
        .status(403)
        .send({ status: false, msg: "User Is Not Authorized" });
    }

    next();
  } catch (err) {
    return res.status(500).status({ status: false, msg: err.message });
  }
};

module.exports.authentication = authentication;
module.exports.authorization = authorization;
