import React from "react";
import { Tag } from "antd";

import { documentLinesToState, OrderState } from "../utils/jasminParsing";

const OrderStatusLabel = (_, { documentLines }) => {
    const state = documentLinesToState(documentLines);

    switch (state) {
        case OrderState.PARTIAL:
            return <Tag color="gold">Partial</Tag>;
        case OrderState.PENDING:
            return <Tag color="purple">Pending</Tag>;
        case OrderState.SENT:
            return <Tag color="green">Sent</Tag>;
        default:
            return <Tag color="red">Other</Tag>;
    }
};

export default OrderStatusLabel;
