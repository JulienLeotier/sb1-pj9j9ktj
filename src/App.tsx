import React from 'react';
import { Camera } from './components/Camera';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Camera />
      </div>
    </GlobalProvider>
  );
}

export default App;