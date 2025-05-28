import React from "react";
import { Table } from "antd";

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
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      scroll={{ x: 1000 }}
    />
  );
};

export default PaymentTable;
