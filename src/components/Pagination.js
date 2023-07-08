import React from "react";
import usePagination from "../hooks/usePagination";
import PagItem from "./PagItem";

const Pagination = ({ totalItems }) => {
  const pagination = usePagination(totalItems, 2);

  return (
    <div className="flex items-center">
      {pagination?.map((ele) => (
        <PagItem key={ele}>{ele}</PagItem>
      ))}
    </div>
  );
};

export default Pagination;
