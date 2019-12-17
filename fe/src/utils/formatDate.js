export const formatDateTime = (value) => (new Date(value)).toLocaleString("pt-PT", { timezone: "UTC" });

export const formatDate = (value) => (new Date(value)).toLocaleDateString("pt-PT", { timezone: "UTC" });
