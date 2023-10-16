import React from 'react';
import CButton from '../components/CButton';
import LogoAndText from '../components/LogoAndText';
import MenuIcon from '@mui/icons-material/Menu';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SearchComponent from '../components/SearchComponent';

interface PageHeaderProps {
  onSearch: (query: string) => void
  showSearch?: boolean
  className?: string
  state?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ onSearch, showSearch = true, className = "", state="home" }) => {
  return (
    <div className={`flex gap-10 lg:gap-20 justify-between mb-6 mx-4 ${className}`}>
      <div className="flex gap-4 items-center flex-shrink-0">
        <CButton>
          <MenuIcon />
        </CButton>
        <a href="/">
          <LogoAndText className='gap-2' text='Davin Videos'/>
        </a>
      </div>
      {showSearch && <SearchComponent onSearch={onSearch} />}
      {
        state !== "upload" && (
            <div className="flex-shrink-0 md:gap-2">
                <a href="/upload">
                    <CButton size="icon" variant="ghost">
                        <DriveFolderUploadIcon />
                    </CButton>
                </a>
            </div>
        )
      }
    </div>
  );
}

export default PageHeader;