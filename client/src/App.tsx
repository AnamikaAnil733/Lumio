import './App.css';
import { Navbar } from './components/navbar';
import { Search } from './components/serachBar';
import { Cards } from './components/cards';
import { Pagination } from './components/pagination';
import { useMovieContext } from './context/useMovieContext';

function App() {
  const { activeTab } = useMovieContext();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        {activeTab === 'search' && <Search />}
        <Cards />
        <Pagination />
      </main>
    </div>
  );
}

export default App;
