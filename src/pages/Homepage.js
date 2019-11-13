import React from "react";
import { Table } from "antd";
import { Link } from "@reach/router";

const Homepage = () => {
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];

    return (
        <div className="App">
            <div className="table-wrapper">
                <Table dataSource={dataSource} columns={columns}/>
            </div>
            <Link to="example">Example Page!</Link>
            <Link to="sales">Get me to Sales!</Link>
        </div>
    );
};

export default Homepage;
