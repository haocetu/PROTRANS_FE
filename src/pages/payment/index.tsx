import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { Button, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const Payment: React.FC = () => {
  const navigate = useNavigate();
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
    <div
      style={{
        textAlign: "center",
        paddingTop: "50px",
        backgroundColor: loading
          ? "#f0f2f5"
          : paymentResult?.success
          ? "#d4edda"
          : "#f8d7da",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : paymentResult ? (
        <div>
          {paymentResult.success ? (
            <Result
              status="success"
              title="🎉 Thành công!"
              subTitle={paymentResult.message}
              extra={[
                <Button
                  onClick={() => navigate("/")}
                  type="primary"
                  key="console"
                >
                  Trang chủ
                </Button>,
              ]}
            />
          ) : (
            <Result
              status="error"
              title="❌ Có lỗi xảy ra."
              subTitle={paymentResult.message}
              extra={[
                <Button
                  onClick={() => navigate("/")}
                  type="primary"
                  key="console"
                >
                  Trang chủ
                </Button>,
              ]}
            />
          )}
          {/* <p>{paymentResult.message}</p> */}
        </div>
      ) : (
        <p>Không thể kiểm tra kết quả thanh toán.</p>
      )}
    </div>
  );
};

export default Payment;
