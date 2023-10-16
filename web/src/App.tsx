import { useState } from 'react';
import './App.css';
import CategoryPills from './components/CategoryPills';
import PageHeader from './layouts/PageHeader';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "JS", "TS", "TSX", "Javascript", "CSS", "SCSS", "TailwindCSS", "Components", "Commedi", "Power bank", "Detail", "Cinema"]

  return (
    <div className='max-h-screen flex flex-col'>
      <PageHeader />
      <div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
        <div>Side bar</div>
        <div className='overflow-x-hidden px-8 pb-4'>
          <div className='sticky top-0 bg-white z-10 pd-4'>
            <CategoryPills categories={categories} selectedCategory = {selectedCategory} onSelect={setSelectedCategory}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
