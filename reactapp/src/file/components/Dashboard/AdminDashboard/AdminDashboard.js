import { Outlet } from 'react-router-dom';

import UIToolbar from 'components/UIToolbar/UIToolbar';
import SetupContainer from 'components/SetupContainer/SetupContainer.js';

//<SearchBar academy />
export default function AdminDashboard(props) {
    return (
        <>
            <UIToolbar admin />
            <SetupContainer>
                <Outlet />
            </SetupContainer>
        </>
    );
}