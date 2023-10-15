import LogoAndText from '../components/LogoAndText';
import MenuIcon from '@mui/icons-material/Menu';

const PageHeader = () => {
    return (
        <div className="flex gap-10 lg:gap-20 justify-between">
            <div className="flex gap-4 items-center flex-shrink-0">
                <button>
                    <MenuIcon />
                </button>
                <a href="/">
                    <LogoAndText className='gap-2' text='Davin Videos'/>
                </a>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}

export default PageHeader