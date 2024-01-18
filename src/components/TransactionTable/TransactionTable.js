import React, { useState } from "react";
import { Input, Radio, Select, Table } from "antd";
import "./TransactionTable.css";

function TransactionTable({ transaction }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransaction = transaction.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransaction.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return;
    }
  });

  return (
    <>
      <div className="search-bar">
        <Input
          value={search}
          className="input"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name"
        />
        <Select
          className="custom-input-2"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          allowClear
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">All</Radio.Button>
          <Radio.Button value="amount">Amount</Radio.Button>
          <Radio.Button value="date">Date</Radio.Button>
        </Radio.Group>
      </div>
      <Table dataSource={filteredTransaction} columns={columns} />;
    </>
  );
}

export default TransactionTable;
