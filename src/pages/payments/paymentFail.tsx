import React from "react";
import "./paymentFail.css";

const PaymentFailure = () => {
  return (
    <div className="fail">
      <div className="iconfail">
        <div className="fail_icon">!</div>
      </div>
      <div className="message">Thanh Toán Thất Bại</div>
      <div className="subMessage">Vui lòng thanh toán lại.</div>
      <button
        onClick={() => (window.location.href = "/")}
        className="payment-fail__button"
      >
        Về Trang Chủ
      </button>
    </div>
  );
};

export default PaymentFailure;
