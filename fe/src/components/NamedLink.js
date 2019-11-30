import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

const NamedLink = ({ name }) => (
    <Link to={name}>{name}</Link>
);

NamedLink.propTypes = {
    name: PropTypes.string.isRequired,
};

export default NamedLink;
