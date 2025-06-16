import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <div className='h-[70px]'>
                <Navbar />
            </div>
            <div className='min-h-[calc(100vh-310px)]'>
                <Outlet />
            </div>
        </div>
    );
};

export default Main;