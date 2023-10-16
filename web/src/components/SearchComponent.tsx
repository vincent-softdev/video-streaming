import React, { useState } from 'react';
import CButton from '../components/CButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [showFullSearch, setShowFullSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <form className={`gap-4 flex-grow justify-center ${showFullSearch ? "flex" : "hidden md:flex"}`}>
      {showFullSearch && (
        <CButton onClick={() => setShowFullSearch(false)} type='button' variant="ghost" size="icon" className='flex-shrink-0'>
          <ArrowBackIcon />
        </CButton>
      )}
      <div className='flex flex-grow max-w-[600px]'>
        <input 
          type='search' 
          value={searchValue} 
          onChange={handleInputChange} 
          placeholder='Search' 
          className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none'
        />
        <CButton className='py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0'>
          <SearchIcon />
        </CButton>
      </div>
    </form>
  );
}

export default SearchComponent;