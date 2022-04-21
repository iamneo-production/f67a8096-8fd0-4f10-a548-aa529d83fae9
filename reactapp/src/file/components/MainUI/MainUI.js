import 'assets/css/main-ui/main-ui.css';
//-----------childrens-----------
//UIToolbar & SetupContainer components{props.children}
//---------------------------
export default function MainUI(props) {

    return (
        <div className="main-ui">
            <div className="window">
                {props.children}
            </div>
        </div>
    )
}