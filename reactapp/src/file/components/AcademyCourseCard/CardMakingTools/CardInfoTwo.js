//props: fullCardId & duration & timing & strength & location & cost & rating
//rating can be zero
export default function CardInfoTwo(props) {
    let duration = () => {
        if (props.duration) {
            return (
                <span class="item one">
                    <span class="material-icons">schedule</span>
                    <span class="item-value">{props.duration}</span>
                </span>
            );
        }
        return (<></>);
    };

    let timing = () => {
        if (props.timing) {
            return (
                <span class="item two">
                    <span class="material-icons">timelapse</span>
                    <span class="item-value">{props.timing}</span>
                </span>
            );
        }
        return (<></>);
    };

    let peopleCount = () => {
        if (props.strength) {
            return (
                <span class="item three">
                    <span class="material-icons">people</span>
                    <span class="item-value">{props.strength}</span>
                </span>
            );
        }
        return (<></>);
    };

    let location = () => {
        if (props.location) {
            return (
                <span class="item four">
                    <span class="material-icons">place</span>
                    <span class="item-value">{props.location}</span>
                </span>
            );
        }
        return (<></>);
    }

    let cost = () => {
        if (props.cost) {
            return (
                <span class="item five">
                    <span class="material-icons">currency_rupee</span>
                    <span class="item-value">{props.cost}</span>
                </span>
            );
        }
        return (<></>);
    }

    let ratingStars = () => {
        let stars = [];

        let filledStar = (id) => {
            return (
                <span
                    key={`${props.fullCardId}_star_${id}`}
                    id={`${props.fullCardId}_star_${id}`}
                    class="material-icons">star</span>
            );
        };

        let unfilledStar = (id) => {
            return (
                <span
                    key={`${props.fullCardId}_star_border_${id}`}
                    id={`${props.fullCardId}_star_border_${id}`}
                    class="material-icons">star_border</span>
            );
        }

        for (let i = 1; i <= 5; i++) {
            if (Boolean(props.rating) && i <= props.rating) {
                stars.push(filledStar(i));
            } else {
                stars.push(unfilledStar(i));
            }
        }

        return stars;
    }

    return (
        <section class="sec two">
            <div class="level one">
                {duration()}
                {timing()}
                {peopleCount()}
                {location()}
                {cost()}
            </div>
            <div class="row justify-content-center level two">
                <span class="col-auto item one">
                    {ratingStars()}
                </span>
            </div>
        </section>
    );
}
