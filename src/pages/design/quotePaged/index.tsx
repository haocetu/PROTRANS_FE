import { useEffect, useState } from "react";
import api from "../../../config/api";
import { useForm } from "antd/es/form/Form";
import { Table } from "antd";
import "./index.css";
import Paragraph from "antd/es/skeleton/Paragraph";

function QuotePageDesign() {
  const [formVariable] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [language, setLanguage] = useState([]);

  const fetchLanguages = async () => {
    const response = await api.get(`Language`);
    const data = response.data.data;
    console.log({ data });

    const list = data.map((language) => ({
      value: language.id,
      label: <span>{language.name}</span>,
    }));
    setLanguage(list);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  async function fetchQuotePrice() {
    const response = await api.get("QuotePrice");
    console.log(response.data.data);
    setDataSource(response.data.data);
  }

  useEffect(() => {
    fetchQuotePrice();
  }, []);

  const columns = [
    {
      title: "Ngôn ngữ gốc",
      dataIndex: "firstLanguageId",
      key: "firstLanguageId",
      render: (firstLanguageId) => {
        if (!language || language.length === 0) return "Loading...";

        const foundLanguage = language.find(
          (lang) => lang.value === firstLanguageId
        );
        return foundLanguage ? foundLanguage.label : "Unknown Category";
      },
    },
    {
      title: "Ngôn ngữ dịch",
      dataIndex: "secondLanguageId",
      key: "secondLanguageId",
      render: (secondLanguageId) => {
        if (!language || language.length === 0) return "Loading...";

        const foundLanguage = language.find(
          (lang) => lang.value === secondLanguageId
        );
        return foundLanguage ? foundLanguage.label : "Unknown Category";
      },
    },
    {
      title: "Giá",
      dataIndex: "pricePerPage",
      key: "pricePerPage",
    },
  ];

  return (
    <div className="quote-page">
      <h1>BẢNG GIÁ DỊCH THUẬT CÔNG CHỨNG</h1>
      <p>
        Bạn đang băn khoăn về chi phí và quy trình dịch thuật công chứng cho
        khối lượng tài liệu lớn? <strong>ProTrans</strong> hiểu rằng để tìm kiếm
        một dịch vụ công chứng dịch thuật vừa <em>đảm bảo chất lượng</em>,{" "}
        <em>vừa tiết kiệm chi phí</em> là điều không hề dễ dàng. Một quyết định
        đúng đắn bắt đầu từ việc tìm hiểu kỹ lưỡng, hãy cùng chúng tôi khám phá
        dịch vụ công chứng dịch thuật qua bài sau.
      </p>
      <h2>
        Dịch thuật công chứng khác với dịch thuật thông thường ở điểm nào?
      </h2>
      <p>
        <strong>Dịch thuật công chứng</strong> là quá trình chuyển đổi ngôn ngữ,
        trong đó bản dịch được kiểm duyệt kỹ lưỡng về mặt ngữ pháp, từ vựng và
        nội dung để đảm bảo tính chính xác cao nhất. Sau khi hoàn thành, bản
        dịch sẽ được công chứng viên chứng thực, tạo ra một bản sao có giá trị
        pháp lý tương đương với bản gốc.
      </p>
      <img
        className="images"
        src="/bank-images/translator.jpg"
        alt="Translator"
      />
      {/* <h3>
        Dịch thuật công chứng chỉ được thực hiện bởi những dịch giả có chứng chỉ
      </h3> */}
      <h2>Mức giá dịch thuật công chứng hiện nay như thế nào</h2>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
    </div>
  );
}

export default QuotePageDesign;
