//props: fullCardId & duration & timing & strength & location & zipcode & rating
//rating can be zero
export default function CardInfoTwo(props) {
    let duration = () => {
        return (
            <span class="item one">
                <span class="material-icons">schedule</span>
                <span class="item-value">{props.duration}</span>
            </span>
        );
    };

    let timing = () => {
        return (
            <span class="item two">
                <span class="material-icons">timelapse</span>
                <span class="item-value">{props.timing}</span>
            </span>
        );
    };

    let peopleCount = () => {
        return (
            <span class="item three">
                <span class="material-icons">people</span>
                <span class="item-value">{props.strength}</span>
            </span>
        );
    };

    let location = () => {
        return (
            <span class="item four">
                <span class="material-icons">place</span>
                <span class="item-value">{props.location}</span>
            </span>
        );
    }

    let zipcode = () => {
        return (
            <span class="item five">
                <span class="material-icons mx-1">
                    <img class="material-icons"
                        src="https://img.icons8.com/dotty/80/000000/mailbox-with-letter.png" alt="Zipcode"
                        style={{ 'width': '22px', 'height': '22px' }} />
                </span>
                <span class="item-value">{props.zipcode}</span>
            </span>
        );
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
                {zipcode()}
            </div>
            <div class="row justify-content-center level two">
                <span class="col-auto item one">
                    {ratingStars()}
                </span>
            </div>
        </section>
    );
}
