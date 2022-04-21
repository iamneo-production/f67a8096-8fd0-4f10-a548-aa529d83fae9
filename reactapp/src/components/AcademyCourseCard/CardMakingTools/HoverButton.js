//props:
//id
//text (button name)
//onClick
//color='brown' (for brown button, default is green)
export default function HoverButton(props) {
    return (
        <span class='hover-button'>
            <button
                id={props.buttonId}
                type="button"
                class={`btn ${props.color ?? ''}`}
                onClick={props.onClick}>
                <b>{props.text}</b>
            </button>
        </span>
    );
}