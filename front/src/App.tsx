import React from "react";
import Routes from "./Routes";
import { StoreProvider } from "./store/context";

const App: React.FC = () => {
    return (
        <StoreProvider>
            <Routes />
        </StoreProvider>
    );
};

export default App;
