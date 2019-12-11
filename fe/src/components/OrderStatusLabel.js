import React from "react";
import { Tag } from "antd";

import { documentLinesToState, parseDocumentType, OrderState, DocumentType } from "../utils/jasminParsing";

const OrderStatusLabel = (_, { isDeleted, documentLines, documentType }) => {

    if (isDeleted) {
        return <Tag color="red">Cancelled</Tag>;
    }

    const state = documentLinesToState(documentLines);

    const docType = parseDocumentType(documentType);

    switch (state) {
        case OrderState.PARTIAL:
            return <Tag color="gold">Partial</Tag>;
        case OrderState.PENDING:
            return <Tag color="purple">Pending</Tag>;
        case OrderState.COMPLETE:
            return <Tag color="green">{docType === DocumentType.SALE ? "Sent" : "Received"}</Tag>;
        default:
            return <Tag color="cyan">Other</Tag>;
    }
};

export default OrderStatusLabel;
