import React from "react";
import { SnackbarComponent } from "./components/SnackbarComponent";
import Routes from "./Routes";
import { StoreProvider } from "./store/context";

const App: React.FC = () => {
    return (
        <StoreProvider>
            <Routes />
            <SnackbarComponent />
        </StoreProvider>
    );
};

export default App;
