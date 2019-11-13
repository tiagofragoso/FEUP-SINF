export const OrderState = Object.freeze({
    PENDING: "PENDING",
    PARTIAL: "PARTIAL",
    SENT: "SENT",
});

export const documentLinesToState = (documentLines) => {
    let nothing_sent = true;
    let has_partial = false;

    for (const item of documentLines) {
        if (item.deliveredQuantity !== 0) {
            nothing_sent = false;
        }
        if (item.deliveredQuantity < item.quantity) {
            has_partial = true;
        }
    }

    if (nothing_sent) {
        return OrderState.PENDING;
    }

    if (has_partial) {
        return OrderState.PARTIAL;
    }

    return OrderState.SENT;
};
