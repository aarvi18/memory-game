import "./App.css";
import MemoryGame from "./components/MemoryGame";

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <MemoryGame />
    </div>
  );
}

export default App;