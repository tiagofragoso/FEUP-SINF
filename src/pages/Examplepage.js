import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button } from "antd";

import { loadQuote } from "../actions/chuckNorrisService";

const Examplepage = () => {
    const dispatch = useDispatch();
    const { loading, items, error } = useSelector((state) => state.quote);

    return (
        <>
            <Button onClick={() => dispatch(loadQuote())} type="primary">Get another quote!</Button>
            {loading && <div>Loading!</div>}
            {error && <div>{`Cause: ${error.cause} Error: ${error.error}`}</div>}
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={items}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
        </>
    );
};

export default Examplepage;
