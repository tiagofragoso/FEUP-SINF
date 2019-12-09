export const OrderState = Object.freeze({
    PENDING: "PENDING",
    PARTIAL: "PARTIAL",
    COMPLETE: "COMPLETE",
});

export const DocumentType = Object.freeze({
    SALE: "SALE",
    PURCHASE: "PURCHASE",
});

export const documentLinesToState = (documentLines) => {
    let nothing_complete = true;
    let has_partial = false;

    for (const item of documentLines) {
        const processedQuantity = item.deliveredQuantity || item.receivedQuantity || 0;

        if (processedQuantity !== 0) {
            nothing_complete = false;
        }
        if (processedQuantity < item.quantity) {
            has_partial = true;
        }
    }

    if (nothing_complete) {
        return OrderState.PENDING;
    }

    if (has_partial) {
        return OrderState.PARTIAL;
    }

    return OrderState.COMPLETE;
};

export const parseDocumentType = (documentType) => {
    switch (documentType) {
        case "ECL":
            return DocumentType.SALE;
        case "ECF":
            return DocumentType.PURCHASE;
        default:
            return DocumentType.SALE;
    }
};
