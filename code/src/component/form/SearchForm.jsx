import React from "react";

function SearchForm() {
  return (
    <div className="crancy-header__form">
      <form className="crancy-header__form-inner" action="#">
        <button className="search-btn" type="submit">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="9.78639"
              cy="9.78614"
              r="8.23951"
              stroke="#9AA2B1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5176 15.9448L18.7479 19.1668"
              stroke="#9AA2B1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          name="s"
          type="text"
          placeholder="Search..."
          onChange={() => {}}
        />
      </form>
    </div>
  );
}

export default SearchForm;
