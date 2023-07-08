import React, { useCallback, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Pagination, ProductCard } from "../../components";
import { getProducts } from "../../apis";
import { renderStarFromNumber } from "../../utils/helpers";

const arrStars = [5, 4, 3, 2, 1];

const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [totalItems, setTotalItems] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalRatings, setTotalRatings] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async () => {
    const response = await getProducts(
      totalRatings ? { "totalRatings[gte]": totalRatings } : null
    );
    if (response.success) {
      setProducts(response.data);
      setTotalItems(response.totals);
    }
  };

  const handleFilter = () => {
    console.log(`products with price from ${minPrice} to ${maxPrice}`);
  };

  useEffect(() => {
    fetchProducts();
    if (totalRatings) {
      navigate({
        pathname: `/san-pham/${category}`,
        search: createSearchParams({ totalRatings: totalRatings }).toString(),
      });
    } else {
      navigate({
        search: "",
      });
    }
    window.scrollTo(0, 0);
  }, [totalRatings]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newTotalRatings = params.get("totalRatings");
    setTotalRatings(newTotalRatings);
  }, [window.location.search]);

  const handleChangePrice = useCallback(
    (e, input) => {
      if (!Number(e.target.value) || Number(e.target.value) < 1) {
        return;
      }
      if (input === "min") {
        setMinPrice(e.target.value);
      } else if (input === "max") {
        setMaxPrice(e.target.value);
      }
    },
    [minPrice, maxPrice]
  );

  return (
    <div className="w-full mt-[-1px]">
      <div className="h-[80px] bg-gray-200 flex justify-center items-center">
        <div className="w-main">
          <h2 className="font-semibold uppercase">{category}</h2>
          <Breadcrumbs category={category} />
        </div>
      </div>
      <div className="w-main p-4 flex justify-between m-auto">
        <div className="w-1/5 flex auto flex-col">
          <h3>Filter by</h3>
          <div className="flex flex-col">
            {arrStars.map((ele) => (
              <div
                className="flex items-center justify-between text-xs text-main cursor-pointer my-2 pr-4"
                key={ele}
                onClick={() => setTotalRatings(ele)}
              >
                {renderStarFromNumber(ele - 1, 30)}
                {ele === 5 ? "" : "above"}
              </div>
            ))}
          </div>
          <div>
            <h5>Price</h5>
            <div className="">
              <div className="flex justify-between items-center">
                <input
                  className="w-[45%] outline-none p-2 border"
                  type="number"
                  value={minPrice}
                  onChange={(e) => handleChangePrice(e, "min")}
                  placeholder="From"
                />
                <span>-</span>
                <input
                  className="w-[45%] outline-none p-2 border"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => handleChangePrice(e, "max")}
                  placeholder="To"
                />
              </div>
              <button className="price-filter-button" onClick={handleFilter}>
                Áp dụng
              </button>
            </div>
          </div>
        </div>
        <div className="w-4/5">
          <div className="flex flex-wrap border-l border-gray-400  pt-2 pl-2">
            {products &&
              products.map((ele) => (
                <div className="w-1/5 gap-2" key={ele.id}>
                  <ProductCard product={ele} />
                </div>
              ))}
          </div>
          <div className="flex justify-center my-4">
            <Pagination totalItems={totalItems} />
          </div>
        </div>
      </div>
      <div className="mb-[500px]"></div>
    </div>
  );
};

export default Products;
