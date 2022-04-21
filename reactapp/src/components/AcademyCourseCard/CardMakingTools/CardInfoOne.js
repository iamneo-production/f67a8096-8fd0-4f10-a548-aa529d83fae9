//props: title & description,breadCrumb
export default function CardInfoOne(props) {

    let title = () => {
        let breadCrumb;
        if (props.breadCrumb) {
            breadCrumb = <div className='bread-crumb max-2-lines' onClick={props.breadCrumb.onClick}>{props.breadCrumb.crumb}/</div>
        }
        return (
            <div className="item one">
                {(breadCrumb) ? breadCrumb : <></>}<b>{props.title}</b>
            </div>
        );
    };

    let description = () => {
        return (<div className="item two">{props.description}</div>);
    };

    return (
        <section className="sec one">
            <div className="level one">
                {title()}
                {description()}
            </div>
        </section>
    );
}