import React from "react";

type AuthenlayoutProps = {
  children: React.ReactNode;
};
function Authenlayout({ children }: AuthenlayoutProps) {
  return (
    <div
      style={{
        height: "100vh", // Chiều cao toàn màn hình
        display: "flex",
        justifyContent: "center", // Căn giữa theo chiều ngang
        alignItems: "center", // Căn giữa theo chiều dọc
        backgroundImage:
          'url("https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?cs=srgb&dl=pexels-stywo-1054218.jpg&fm=jpg")',
        backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ màn hình
        backgroundPosition: "center", // Căn giữa hình nền
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng mờ cho form
          padding: "20px",
          borderRadius: "10px", // Bo góc
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Đổ bóng cho form
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Authenlayout;
