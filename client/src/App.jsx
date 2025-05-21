import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fethcData = async () => {
      const res = await axios.get(
        `http://localhost:3003/api/products?page=${page}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPage);
    };
    fethcData();
  }, [page]);

  const onNext = ()=> {
    if(page<totalPages) setPage((pre)=>pre+1)
  }
  const onPrevious = () => {
    if(page == totalPages) setPage((pre)=>pre-1)
  }

  console.log(totalPages);

  return (
    <div>
      <div className="bg-red-500 ">
        {products.map((ele) => (
          <div className=" " key={ele._id}>
            <ul className="bg-blue-500 flex " >
              <li>{ele.name}</li>
              <li>{ele.price}</li>
              <li>{ele.description}</li>
            </ul>
          </div>
        ))}
      </div>
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default App;
