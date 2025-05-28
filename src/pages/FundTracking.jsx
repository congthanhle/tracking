import { DatePicker, Table, ConfigProvider, Input } from "antd";
import { useState } from "react";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Cố định",
    dataIndex: "coDinh",
    key: "coDinh",
  },
  {
    title: "Thành tiền (CĐ)",
    dataIndex: "thanhTienCoDinh",
    key: "thanhTienCoDinh",
  },
  {
    title: "Vãng lai",
    dataIndex: "vangLai",
    key: "vangLai",
  },
  {
    title: "Thành tiền (VL)",
    dataIndex: "thanhTienVangLai",
    key: "thanhTienVangLai",
  },
  {
    title: "Tổng",
    dataIndex: "tong",
    key: "tong",
  },
  {
    title: "Đã đóng",
    dataIndex: "daDong",
    key: "daDong",
  },
  {
    title: "Còn lại",
    dataIndex: "conLai",
    key: "conLai",
  },
];

const data = [
  {
    key: "1",
    name: "Nguyễn Văn A",
    coDinh: 3,
    thanhTienCoDinh: 300000,
    vangLai: 2,
    thanhTienVangLai: 200000,
    tong: 500000,
    daDong: 300000,
    conLai: 200000,
  },
  {
    key: "2",
    name: "Trần Thị B",
    coDinh: 1,
    thanhTienCoDinh: 100000,
    vangLai: 4,
    thanhTienVangLai: 400000,
    tong: 500000,
    daDong: 500000,
    conLai: 0,
  },
];

const PaymentTable = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (value) => {
    setSearchText(value);
    const lowerKeyword = value.toLowerCase();
    const matches = data.filter((item) =>
      item.name.toLowerCase().includes(lowerKeyword)
    );
    const nonMatches = data.filter(
      (item) => !item.name.toLowerCase().includes(lowerKeyword)
    );
    setFilteredData([...matches, ...nonMatches]);
  };

   return (
        <ConfigProvider locale={viVN}>
      <div className="p-4 mx-auto">
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-xs">
            <label className="text-sm font-medium text-gray-600 mb-1">Tháng:</label>
            <DatePicker
              picker="month"
              format="MM/YYYY"
              placeholder="Chọn tháng"
              onChange={(date, dateString) => {
                console.log(`Tháng được chọn: ${dateString}`);
              }}
              allowClear
              className="w-full"
            />
          </div>
          <div className="flex flex-col md:col-span-2 w-xs">
            <label className="text-sm font-medium text-gray-600 mb-1">Tìm kiếm theo tên:</label>
            <Input
              placeholder="Nhập tên..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Bảng */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            bordered
            scroll={{ x: 1000 }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PaymentTable;
