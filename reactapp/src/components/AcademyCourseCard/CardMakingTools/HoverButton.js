//props:
//buttonId
//name (button name)
//color='brown' (for brown button, default is green)
export default function HoverButton(props) {
    return (
        <span class='hover-button'>
            <button id={props.buttonId} type="button" class={`btn ${props.color ?? ''}`}> <b>{props.name}</b></button>
        </span>
    );
}