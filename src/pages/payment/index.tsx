import React, { useEffect, useState } from "react";
import api from "../../config/api";

const Payment: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const postPaymentCheck = async () => {
      try {
        const currentUrl = window.location.href;

        console.log("URL: " + currentUrl);

        const response = await api.post(
          `VNPay?url=${encodeURIComponent(currentUrl)}`,
          {}
        );

        const result = await response.data;
        if (result.success) {
          setPaymentResult({ success: true, message: result.message });
        } else {
          setPaymentResult({ success: false, message: result.message });
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setPaymentResult({
          success: false,
          message: "Đã xảy ra lỗi khi kiểm tra thanh toán. Vui lòng thử lại.",
        });
      } finally {
        setLoading(false);
      }
    };

    postPaymentCheck();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <p>Đang kiểm tra kết quả thanh toán...</p>
      ) : paymentResult ? (
        <div>
          <h1>{paymentResult.success ? "🎉 Thành công!" : "❌ Thất bại!"}</h1>
          <p>{paymentResult.message}</p>
        </div>
      ) : (
        <p>Không thể kiểm tra kết quả thanh toán.</p>
      )}
    </div>
  );
};

export default Payment;
