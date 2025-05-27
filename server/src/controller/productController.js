import Product from "../model/productModel.js";

export const getProducts = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const searchQuery = req.query.search;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;

  let query = {
    $and: [
      {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { name: { $regex: searchQuery, $options: "i" } },
        ],
      },
      {
        price: { $gte: minPrice, $lte: maxPrice },
      },
    ],
  };

  const skip = (page - 1) * limit;
  const products = await Product.find(query).skip(skip).limit(limit);
  const totalProducts = await Product.countDocuments(query);
  res.status(200).json({
    products,
    totalProducts,
    crrentPage: page,
    totalPage: Math.ceil(totalProducts / limit),
  });
};
