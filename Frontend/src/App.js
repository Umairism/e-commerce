import React from 'react';
import router from './router';
import './App.css';
import Navbar from './components/Navbar';
import ThemeToggler from './components/ThemeToggler';
import { BasenameProvider } from './contexts/BasenameContext'; // Import the BasenameProvider

function App() {
  return (
    <BasenameProvider basename="/your-basename"> {/* Wrap with BasenameProvider */}
      <div className="App">
        <Navbar />
        <ThemeToggler />
        {router}
      </div>
    </BasenameProvider>
  );
}

export default App;
