import React, { useState } from "react";
import SelectInput from "../form/SelectInput";
import SingleOrder from "../cards/SingleOrder";
import orders from "../../data/orders";
import calendarIcon from "../../assets/img/calendar-icon.svg";
import SelectBox from "../form/SelectBox";
import Pikaday from "../pikaday";

function ActivitySection({ className }) {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(4);
  return (
    <div className={`${className ? className : "crancy-table"} mg-top-30`}>
      <div className="crancy-table__heading">
        <h3 className="crancy-table__title mb-0">Recent Activity</h3>
        <SelectInput
          options={[" Last 7 Days", " Last 15 Days", "Last Month"]}
        />
      </div>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="table_1"
          role="tabpanel"
          aria-labelledby="table_1"
        >
          {/* <!-- Table Filter --> */}
          <div className="crancy-table-filter mg-btm-20">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Filter --> */}
                <div className="crancy-table-filter__single crancy-table-filter__location">
                  <label htmlFor="crancy-table-filter__label">Location</label>
                  <SelectBox
                    datas={[
                      "State or Province",
                      "New York",
                      "Sydney",
                      "Dhaka",
                      "Victoria",
                    ]}
                    img={<i className="fa-solid fa-chevron-down"></i>}
                  />
                </div>
                {/* <!-- End Single Filter --> */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Filter --> */}

                <div className="crancy-table-filter__single crancy-table-filter__amount">
                  <label htmlFor="crancy-table-filter__label">
                    Amount Spent
                  </label>
                  <SelectBox
                    datas={["$2,000", "$4,000", "$3,000", "$4,000", "$5,000"]}
                    img={<i className="fa-solid fa-chevron-down"></i>}
                  />
                </div>
                {/* <!-- End Single Filter --> */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Filter --> */}
                <div className="crancy-table-filter__single crancy-table-filter__trans-date">
                  <label htmlFor="crancy-table-filter__label">
                    Transaction list Date
                  </label>
                  <div className="crancy-table-filter__group">
                    <Pikaday />
                    <span className="crancy-table-filter__icon">
                      <img src={calendarIcon} />
                    </span>
                  </div>
                </div>
                {/* <!-- End Single Filter --> */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* <!-- Single Filter --> */}
                <div className="crancy-table-filter__single crancy-table-filter__trans">
                  <label htmlFor="crancy-table-filter__label">
                    Type of transaction
                  </label>
                  <SelectBox
                    datas={["All transaction", "Paypal", "Stripe", "Payoneer"]}
                    img={<i className="fa-solid fa-chevron-down"></i>}
                  />
                </div>
                {/* <!-- End Single Filter --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Table Filter --> */}

         
          <div className="crancy-table-bottom">
            <div id="crancy-table__main_filter" className="dataTables_filter">
              <label>
                Search:
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder=""
                  aria-controls="crancy-table__main"
                />
              </label>
            </div>
            <div className="dataTables_length" id="crancy-table__main_length">
              <label>
                Show result:
                <select
                  name="crancy-table__main_length"
                  aria-controls="crancy-table__main"
                  className="form-select form-select-sm"
                  onChange={(e) => setShow(e.target.value)}
                >
                  <option value="4">4</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </label>
            </div>
            <div
              className="dataTables_paginate paging_simple_numbers"
              id="crancy-table__main_paginate"
            >
              <ul className="pagination">
                <li
                  className={`paginate_button page-item previous ${
                    page === 1 ? "disabled" : ""
                  }`}
                  id="crancy-table__main_previous"
                  onClick={() => page > 1 && setPage(page - 1)}
                >
                  <a
                    aria-controls="crancy-table__main"
                    data-dt-idx="previous"
                    tabIndex="0"
                    className="page-link"
                  >
                    <i className="fas fa-angle-left"></i>
                  </a>
                </li>
                
                <li
                  className={`paginate_button page-item next ${
                    page === orders.length % show < 1 ? "disabled" : ""
                  }`}
                  id="crancy-table__main_next"
                  onClick={() =>
                    page < Math.ceil(orders.length / show) && setPage(page + 1)
                  }
                >
                  <a
                    aria-controls="crancy-table__main"
                    data-dt-idx="next"
                    tabIndex="0"
                    className="page-link"
                  >
                    <i className="fas fa-angle-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- End crancy Table --> */}
        </div>
      </div>
    </div>
  );
}

export default ActivitySection;
