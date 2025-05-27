import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(""); // example: "0-499", "500-999", "1000+"

  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      let minPrice = 0;
      let maxPrice = Number.MAX_SAFE_INTEGER;

      if (priceRange === "1000-1999") {
        minPrice = 1000;
        maxPrice = 1999;
      } else if (priceRange === "2000-2999") {
        minPrice = 2000;
        maxPrice = 2999;
      } else if (priceRange === "3000+") {
        minPrice = 3000;
      }

      const res = await axios.get(
        `http://localhost:3003/api/products?page=${page}&limit=${limit}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPage);
    };

    fetchData();
  }, [page, search, priceRange]);

  const onNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const onPrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="border p-2 w-full rounded-md"
        />
        <select
          onChange={(e) => {
            setPriceRange(e.target.value);
            setPage(1);
          }}
          value={priceRange}
          className="border p-2 rounded-md"
        >
          <option value="">All Prices</option>
          <option value="1000-1999">₹1000 - ₹1999</option>
          <option value="2000-2999">₹2000 - ₹2999</option>
          <option value="3000+">₹3000 and above</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid gap-4">
        {products.map((ele) => (
          <div key={ele._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">{ele.name}</h2>
            <p>Price: ₹{ele.price}</p>
            <p>{ele.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
