require("dotenv-flow").config();

export default {
    sinfClientSecret: process.env.REACT_APP_SINF_CLIENT_SECRET,
    apiUrl: process.env.REACT_APP_API_URL,
    tenant: process.env.REACT_APP_TENANT,
    organization: process.env.REACT_APP_ORGANIZATION,
    company: process.env.REACT_APP_COMPANY,
};
