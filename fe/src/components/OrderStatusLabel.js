import React from "react";
import { Tag } from "antd";

import { documentLinesToState, OrderState } from "../utils/jasminParsing";

const OrderStatusLabel = (_, { isDeleted, documentLines }) => {
    if (isDeleted) {
        return <Tag color="red">Cancelled</Tag>;
    }

    const state = documentLinesToState(documentLines);

    switch (state) {
        case OrderState.PARTIAL:
            return <Tag color="gold">Partial</Tag>;
        case OrderState.PENDING:
            return <Tag color="purple">Pending</Tag>;
        case OrderState.SENT:
            return <Tag color="green">Sent</Tag>;
        default:
            return <Tag color="cyan">Other</Tag>;
    }
};

export default OrderStatusLabel;
