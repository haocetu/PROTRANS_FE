import "dayjs/locale/vi"; // Import ngôn ngữ nếu cần
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN"; // Thay 'vi_VN' bằng ngôn ngữ mong muốn
import { DatePicker } from "antd";

// Cấu hình ngôn ngữ cho DatePicker trên toàn ứng dụng
DatePicker.defaultProps = { locale: locale };
