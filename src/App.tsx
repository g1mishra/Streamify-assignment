import Dashboard from "./components/Dashboard";
import { DashboardProvider } from "./context/DashboardContext";

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-100">
        <Dashboard />
      </div>
    </DashboardProvider>
  );
}

export default App;
