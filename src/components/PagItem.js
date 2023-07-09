import React from "react";
import clsx from "clsx";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
const PagItem = ({ children, setCurrentPage }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { category } = useParams();
  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);

    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(children)) queries.page = children;
    setCurrentPage(queries.page);
    navigate({
      pathname: `/san-pham/${category}`,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      className={clsx(
        `w-10 h-10 flex justify-center text-main rounded-full p-4  font-semibold mx-1`,
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center hover:bg-main hover:text-white",
        +params.get("page") === children && "rounded-full bg-main text-white",
        !+params.get("page") &&
          children === 1 &&
          "rounded-full bg-main text-white"
      )}
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default PagItem;
