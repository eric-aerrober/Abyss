import React from "react";
import { HeaderBar } from "./library/layout/header-bar";
import { AbyssBackground } from "./library/layout/background";
export function App() {
    return (
        <div className="app">
            <HeaderBar />
            <AbyssBackground />
        </div>
    );
}

export default App;
