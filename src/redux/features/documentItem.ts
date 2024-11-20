import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Đảm bảo kiểu của state là một mảng các Document hoặc null
type Document = {
  id: number;
  name: string;
  // thêm các thuộc tính khác nếu cần
};

const initialState: Array<Document> | null = null;

export const documentItem = createSlice({
  name: "document",
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      // Kiểm tra nếu state là null, khởi tạo nó thành mảng rỗng trước khi thêm
      if (state === null) {
        state = [];
      }
      // Thêm tài liệu mới vào mảng, sử dụng toán tử spread để tạo mảng mới
      return [...state, { ...action.payload, quantity: 1 }];
    },
    removeDocument: (state, action: PayloadAction<number>) => {
      // Nếu state không phải null, lọc tài liệu ra khỏi mảng
      return state ? state.filter((item) => item.id !== action.payload) : state;
    },
  },
});

export const { addDocument, removeDocument } = documentItem.actions;
export default documentItem.reducer;

