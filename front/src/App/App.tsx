import React from "react";
import { SnackbarComponent } from "../shared/components/SnackbarComponent";
import { StoreProvider } from "../shared/store/context";
import "./index.css";
import Routes from "./Routes";

const App: React.FC = () => {
    return (
        <StoreProvider>
            <Routes />
            <SnackbarComponent />
        </StoreProvider>
    );
};

export default App;
