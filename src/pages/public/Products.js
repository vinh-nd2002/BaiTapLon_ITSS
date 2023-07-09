import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Button, Pagination, ProductCard } from "../../components";
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
  const [currentPage, setCurrentPage] = useState(1);

  const createParams = () => {
    if (minPrice && maxPrice && minPrice > maxPrice) {
      alert("Sai thông tin giá tiền");
      return null;
    }
    const params = {};
    if (totalRatings) {
      params["minRating"] = totalRatings;
    }
    if (minPrice) {
      params["minPrice"] = minPrice;
    }
    if (maxPrice) {
      params["maxPrice"] = maxPrice;
    }
    params.page = currentPage;
    return params;
  };

  const params = useMemo(
    () => createParams(),
    [totalRatings, minPrice, maxPrice, currentPage]
  );

  const handleFilter = useCallback(async () => {
    const params = createParams();
    getProducts(params).then((response) => {
      if (response.success) {
        setProducts(response.data);
        setTotalItems(response.totalItems);
      } else {
        setProducts([]);
        setTotalItems(null);
      }
    });
    navigate({
      pathname: `/san-pham/${category}`,
      search: createSearchParams(params).toString(),
    });
  }, [params, currentPage]);

  useEffect(() => {
    handleFilter();
    window.scrollTo(0, 0);
  }, [totalRatings, minPrice, maxPrice, currentPage]);

  const handleChangePrice = useCallback(
    (e, input) => {
      const value = e.target.value;
      const isValid = !isNaN(value) && Number(value) >= 0;
      if (isValid) {
        if (input === "min") {
          setMinPrice(value);
        } else if (input === "max") {
          setMaxPrice(value);
        }
      } else {
        e.target.value = "";
      }
    },
    [minPrice, maxPrice]
  );

  const renderProducts = () => {
    if (products) {
      return products.map((ele) => (
        <div className="w-1/5 gap-2" key={ele.id}>
          <ProductCard product={ele} />
        </div>
      ));
    } else {
      return <div className="text-xl h-[20px] text-black">No data</div>;
    }
  };
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
            <div className="mr-4">
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
              <Button
                title="Áp dụng"
                className="mt-2 p-2 text-white bg-main font-semibold w-full"
                onClick={handleFilter}
              />
            </div>
          </div>
        </div>
        <div className="w-4/5">
          <div className="flex flex-wrap border-l border-gray-400  pt-2 pl-2">
            {renderProducts()}
          </div>
          {totalItems && (
            <div className="flex justify-center my-4">
              <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
