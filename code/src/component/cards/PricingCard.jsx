import React from "react";
function PricingCard({ price, options, color }) {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
      <div className="crancy-psingle">
        <div
          className={`crancy-psingle__head ${
            color === "pink"
              ? "crancy-color2__bg"
              : color === "orange"
              ? "crancy-color2__bg"
              : color === "blue"
              ? "crancy-color1__bg"
              : "crancy-gbcolor"
          }`}
        >
          <h4 className="crancy-psingle__title">
            <span className="crancy-psingle__currency">$</span>
            {price}
            <span>/Per Month</span>
          </h4>
        </div>
        <div className="crancy-psingle__body">
          <ul className="crancy-psingle__list">
            
          </ul>
          <div className="crancy-psingle__button">
            <a
              href="#"
              className={`crancy-btn  ${
                color === "pink"
                  ? "offset-pink"
                  : color === "orange"
                  ? "offset-orange"
                  : color === "blue"
                  ? "offset-blue"
                  : "offset-green"
              }`}
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
