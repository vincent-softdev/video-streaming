import CButton from '../components/CButton';
import LogoAndText from '../components/LogoAndText';
import MenuIcon from '@mui/icons-material/Menu';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PageHeaderProps {
    onSearch: (query: string) => void;
}

const PageHeader = (props: PageHeaderProps) => {
    const [showFullSearch, setShowFullSearch] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        props.onSearch(value);
      };

    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <div className={`gap-4 items-center flex-shrink-0 ${showFullSearch ? "hidden": "flex"}`}>
                <CButton>
                    <MenuIcon />
                </CButton>
                <a href="/">
                    <LogoAndText className='gap-2' text='Davin Videos'/>
                </a>
            </div>
            <form className={`gap-4 flex-grow justify-center ${showFullSearch ? "flex": "hidden md:flex"}`}>
                {showFullSearch && (
                    <CButton onClick={() => setShowFullSearch(false)} type='button' variant="ghost" size="icon" className='flex-shrink-0'>
                        <ArrowBackIcon />
                    </CButton>
                )}
                <div className='flex flex-grow max-w-[600px]'>
                    <input type='search' value={searchValue} onChange={handleInputChange} placeholder='Search' className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none'/>
                    <CButton className='py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0'>
                        <SearchIcon />
                    </CButton>
                </div>
            </form>
            <div className={`flex-shrink-0 md:gap-2 ${showFullSearch ? "hidden": "flex"}`}>
                <CButton onClick={() => setShowFullSearch(true)} size="icon" variant="ghost" className='md:hidden'>
                    <SearchIcon />
                </CButton>
                <CButton size="icon" variant="ghost">
                    <DriveFolderUploadIcon />
                </CButton>
            </div>
        </div>
    )
}

export default PageHeader