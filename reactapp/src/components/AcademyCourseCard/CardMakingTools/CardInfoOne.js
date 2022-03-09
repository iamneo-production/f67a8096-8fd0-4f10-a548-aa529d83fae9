//props: title & description
export default function CardInfoOne(props) {

    let title = () => {
        return (
            <div class="item one">
                <b>{props.title}</b>
            </div>
        );
    };

    let description = () => {
        return (<div class="item two">{props.description}</div>);
    };

    return (
        <section class="sec one">
            <div class="level one">
                {title()}
                {description()}
            </div>
        </section>
    );
}