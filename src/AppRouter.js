import React from "react";
import { Router } from "@reach/router";

import Homepage from "./pages/Homepage";
import Examplepage from "./pages/Examplepage";

const AppRouter = () => (
    <Router>
        <Homepage path="/" />
        <Examplepage path="example" />
    </Router>
);

export default AppRouter;
