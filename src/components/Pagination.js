import React from "react";
import usePagination from "../hooks/usePagination";
import PagItem from "./PagItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalItems, setCurrentPage }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalItems, params.get("page") || 1);

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
