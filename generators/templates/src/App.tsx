import React, { FC } from 'react';

interface AppProps {

};

const App: FC<AppProps> = () => {
    return (
        <div className="bg-slate-600 text-white flex h-screen w-full justify-center items-center text-3xl">
            <span>Vite + React TS + Tailwind + Eslint Template</span>
        </div>
    );
};

export default App;
