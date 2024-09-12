import React from "react";

const PageNumber = ({ maxPage, page, increase, decrease }) => {
  return (
    <div className="h-16 my-8 flex items-center gap-8">
      <button
        onClick={decrease}
        className="w-16 h-full rounded-full bg-neutral-800 transition-all duration-300 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:hover:bg-neutral-800"
        disabled={page <= 0}
      >
        Prev
      </button>
      <span className="text-xl">{page + 1}</span>
      <button
        onClick={increase}
        className="w-16 h-full rounded-full bg-neutral-800 transition-all duration-300 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:hover:bg-neutral-800"
        disabled={page + 1 >= maxPage}
      >
        Next
      </button>
    </div>
  );
};

export default PageNumber;
