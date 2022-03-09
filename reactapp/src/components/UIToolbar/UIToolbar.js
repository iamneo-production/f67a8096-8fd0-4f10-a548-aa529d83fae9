import ToolbarMenu from './ToolbarMenu';

import 'assets/css/ui-toolbar/main-ui-toolbar-media-query.css';

//props: admin | user
function UIToolbar(props) {

    let appName = () => {
        return (
            <span class="toolbar-item app-name"><b>Boxing Academy</b></span>
        );
    }

    let logout = () => {
        return (
            <span class="toolbar-item logout" id="logout">
                <span class="material-icons"> logout </span>
            </span>
        );
    }

    let toolbarType = () => {
        if (props.admin) return 'admin';
        return 'user';
    }


    let toolbar = () => {
        return (
            <div class="component-ui-toolbar">
                <div class="card">
                    <div class="card-body">
                        <span class={`${toolbarType()} toolbar`}>
                            <section class="sec-1">{appName()}</section>
                            <section class="sec-2">{logout()}</section>
                            <ToolbarMenu {...props} />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return toolbar();
}

export default UIToolbar;