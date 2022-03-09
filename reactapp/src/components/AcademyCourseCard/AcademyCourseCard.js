import CardToolbar from 'components/AcademyCourseCard/CardMakingTools/CardToolbar.js';
import CardInfoOne from 'components/AcademyCourseCard/CardMakingTools/CardInfoOne.js';
import CardInfoTwo from 'components/AcademyCourseCard/CardMakingTools/CardInfoTwo.js';

//--------props--------------------------------------->
//grid | list
//admin | user & academy | course
//  ---------cardProp-------
//id (id received from server must be passed here)
//url (if academy pass image url)
//title, description, duration, timing, strength, location, zipcode, rating
//  --------------------------
//------------------------------------------------------>
export default function AcademyCourseCard(props) {
    let cardProp = props.cardProp;

    let cardImage = () => {
        if (props.academy) {
            return (
                <div class="display-card-image">
                    <img src={cardProp.url} alt="ss" />
                </div>
            );
        }
        return (<></>);
    }

    let toolbar = () => {
        if (props.admin) {
            if (props.academy) {
                return (<CardToolbar admin academy />);
            } else {
                if (props.course) {
                    return (<CardToolbar admin course />);
                }
            }
        } else {
            if (props.user) {
                if (props.course) {
                    return (<CardToolbar user course />);
                }
            }
        }
    }

    let cardBody = () => {
        return (
            <div class="card-body">
                <div class="details">
                    <CardInfoOne
                        title={cardProp.title}
                        description={cardProp.description} />
                    <CardInfoTwo
                        fullCardId={getFullCardId()}
                        duration={cardProp.duration}
                        timing={cardProp.timing}
                        location={cardProp.location}
                        strength={cardProp.strength}
                        zipcode={cardProp.zipcode}
                        rating={cardProp.rating} />
                    {toolbar()}
                </div>
            </div>
        );
    }

    let getFullCardId = () => {
        if (props.admin) {
            if (props.academy) {
                return `adminAcademyGrid${cardProp.id}`;
            } else {
                if (props.course) {
                    return `courseGrid${cardProp.id}`;
                }
            }
        } else {
            if (props.user) {
                if (props.academy) {
                    return `userAcademyGrid${cardProp.id}`;
                } else {
                    if (props.course) {
                        return `userCourseGrid${cardProp.id}`;
                    }
                }
            }
        }
    }

    let getViewClassName = () => {
        if (props.list) {
            return 'view-display-card-list';
        } else {
            return 'view-display-card-grid';
        }
    }

    return (
        <div class="col-auto">
            <div id={getFullCardId()} class={`${getViewClassName()} display-card p-2`}>
                <div class="card">
                    {cardImage()}
                    {cardBody()}
                </div>
            </div>
        </div>
    );
}