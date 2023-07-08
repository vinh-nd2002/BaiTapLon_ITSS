import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";

import icons from "./../utils/icons";

const Breadcrumbs = ({ title, category }) => {
  const { GrFormNext } = icons;
  const routes = [
    { path: "/san-pham/:category", breadcrumb: category },
    { path: "/san-pham/:category/:pid/:title", breadcrumb: title },
    { path: "/", breadcrumb: "Home" },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="text-xs flex items-center">
      {breadcrumbs
        .filter((ele) => !ele.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="flex items-center hover:text-main gap-1 capitalize"
          >
            <span> {breadcrumb} </span>
            {index !== self.length - 1 && <GrFormNext />}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumbs;
