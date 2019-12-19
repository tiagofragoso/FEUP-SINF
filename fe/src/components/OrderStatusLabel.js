import React from "react";
import { Tag } from "antd";

import { documentLinesToState, parseDocumentType, OrderState, DocumentType } from "../utils/jasminParsing";

const OrderStatusLabel = (_, row) => {
    const labelType = rowToStatusLabel(row);

    switch (labelType) {
        case OrderStatusLabelTypes.CANCELLED:
            return <Tag color="red">Cancelled</Tag>;
        case OrderStatusLabelTypes.PARTIAL:
            return <Tag color="gold">Partial</Tag>;
        case OrderStatusLabelTypes.PENDING:
            return <Tag color="purple">Pending</Tag>;
        case OrderStatusLabelTypes.COMPLETE_PURCHASE:
            return <Tag color="green">Received</Tag>;
        case OrderStatusLabelTypes.COMPLETE_SALE:
            return <Tag color="green">Sent</Tag>;
        case OrderStatusLabelTypes.OTHER:
        default:
            return <Tag color="cyan">Other</Tag>;
    }
};

export const OrderStatusLabelTypes = Object.freeze({
    PARTIAL: "PARTIAL",
    PENDING: "PENDING",
    COMPLETE_SALE: "COMPLETE_SALE",
    COMPLETE_PURCHASE: "COMPLETE_PURCHASE",
    CANCELLED: "CANCELLED",
    OTHER: "OTHER",
});

export const rowToStatusLabel = ({ isDeleted, documentLines, documentType }) => {
    if (isDeleted) {
        return OrderStatusLabelTypes.CANCELLED;
    }

    const state = documentLinesToState(documentLines);

    const docType = parseDocumentType(documentType);

    switch (state) {
        case OrderState.PARTIAL:
            return OrderStatusLabelTypes.PARTIAL;
        case OrderState.PENDING:
            return OrderStatusLabelTypes.PENDING;
        case OrderState.COMPLETE:
            return docType === DocumentType.SALE ? OrderStatusLabelTypes.COMPLETE_SALE : OrderStatusLabelTypes.COMPLETE_PURCHASE;
        default:
            return OrderStatusLabelTypes.OTHER;
    }
};

export default OrderStatusLabel;
