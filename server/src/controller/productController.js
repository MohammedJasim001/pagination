import Product from "../model/productModel.js";

export const getProducts = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const skip = (page - 1) * limit;
  const products = await Product.find().skip(skip).limit(limit);
  const totalProducts = await Product.countDocuments();
  res.status(200).json({
    products,
    totalProducts,
    crrentPage: page,
    totalPage: Math.ceil(totalProducts / limit),
  });
};
