import React from "react";
import usePagination from "../hooks/usePagination";
import PagItem from "./PagItem";

const Pagination = ({ totalItems, currentPage, setCurrentPage }) => {
  const pagination = usePagination(totalItems, currentPage);

  return (
    <div className="flex items-center">
      {pagination?.map((ele) => (
        <PagItem key={ele} setCurrentPage={setCurrentPage}>
          {ele}
        </PagItem>
      ))}
    </div>
  );
};

export default Pagination;
