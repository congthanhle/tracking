import { DatePicker, Table, ConfigProvider, Input } from "antd";
import { useEffect, useState, useCallback } from "react";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import axios from "axios";
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

const PaymentTable = () => {
  const [searchText, setSearchText] = useState("");
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [range, setRange] = useState("Sheet1!A2:H");

  const API_KEY = "AIzaSyBpfjjKIYKrYcZ1qp1s7zxW4CFaRoooqlU";
  const SHEET_ID = "19AQBgIAlDtnIDtfUARteodpxVW2tTXYR-rtZp0-Y9ls";

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`
      );
      const rows = res.data.values || [];
      const formatted = rows.map((row, index) => ({
        key: index.toString(),
        name: row[0],
        coDinh: parseInt(row[1] || 0),
        thanhTienCoDinh: parseInt(row[2] || 0),
        vangLai: parseInt(row[3] || 0),
        thanhTienVangLai: parseInt(row[4] || 0),
        tong: parseInt(row[5] || 0),
        daDong: parseInt(row[6] || 0),
        conLai: parseInt(row[7] || 0),
      }));

      setRawData(formatted);
      setFilteredData(formatted);
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      setRawData([]);
      setFilteredData([]);
    }
  }, [range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (value) => {
    setSearchText(value);
    const lowerKeyword = value.toLowerCase();
    const matches = rawData.filter((item) =>
      item.name.toLowerCase().includes(lowerKeyword)
    );
    setFilteredData([...matches]);
  };

  return (
    <ConfigProvider locale={viVN}>
      <div className="p-4 mx-auto">
        <div className="flex gap-4 mb-4 flex-wrap">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Tháng:</label>
            <DatePicker
              picker="month"
              format="MM_YYYY"
              placeholder="Chọn tháng"
              onChange={(date, dateString) => {
                if (date) {
                  setRange(`${dateString}!A2:H`);
                }
              }}
              allowClear={false}
              className="w-48"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Tìm kiếm theo tên:</label>
            <Input
              placeholder="Nhập tên..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

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
