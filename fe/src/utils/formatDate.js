export const formatDate = (value) => (new Date(value)).toLocaleString("pt-PT", { timezone: "UTC" });

export default formatDate;
