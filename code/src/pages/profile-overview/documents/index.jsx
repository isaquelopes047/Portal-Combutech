import React, { useState } from "react";
import SelectInput from "../../../component/form/SelectInput";

function Documents() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(10);
  return (
    <div
      className="tab-pane fade show active"
      id="tab_4"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div className="crancy-table crancy-table__tabs mg-top-30">
        <div className="crancy-table__heading">
          <h3 className="crancy-table__title mb-0">Recent Activity</h3>
          <SelectInput
            options={[
              "View All",
              "Last 7 Days",
              "Last 15 Days",
              "Last 30 Days",
            ]}
          />
        </div>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="table_documents1"
            role="tabpanel"
            aria-labelledby="table_documents1"
          >
            {/* <!-- crancy Table --> */}
            <table
              id="crancy-table__document"
              className="crancy-table__main crancy-table__main-v1"
            >
              {/* <!-- crancy Table Head --> */}
              <thead className="crancy-table__head">
                <tr>
                  <th className="crancy-table__column-2 crancy-table__h2">
                    File Name
                  </th>
                  <th className="crancy-table__column-3 crancy-table__h3">
                    Type
                  </th>
                  <th className="crancy-table__column-4 crancy-table__h4">
                    Size
                  </th>
                  <th className="crancy-table__column-5 crancy-table__h5">
                    Upload Date
                  </th>
                  <th className="crancy-table__column-6 crancy-table__h6">
                    Action
                  </th>
                </tr>
              </thead>
              {/* <!-- crancy Table Body --> */}
              <tbody className="crancy-table__body">
                
              </tbody>
              {/* <!-- End crancy Table Body --> */}
            </table>
            {/* <!-- End crancy Table --> */}
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
                      page === documents.length % show < 1 ? "disabled" : ""
                    }`}
                    id="crancy-table__main_next"
                    onClick={() =>
                      page < Math.ceil(orders.length / show) &&
                      setPage(page + 1)
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
