import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import Table from './component/Table';

function App() {
  return (
    <PrimeReactProvider>
      <div className="table-wrapper">
        <Table />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
