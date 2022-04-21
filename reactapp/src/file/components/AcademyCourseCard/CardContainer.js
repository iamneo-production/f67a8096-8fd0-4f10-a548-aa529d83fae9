import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import objectHash from 'object-hash';

import GridAcademyCourseCard from './GridAcademyCourseCard';
import ListAcademyCourseCard from './ListAcademyCourseCard';

import CardContainerNotifier from 'store/CardContainerNotifier/CardContainerNotifier';

import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/card-container/card-container.css';



//-----------props----------
//admin | user & academy | course
//fetch  -- no param callback func to fetch all cardprops at once
//cardProps (card properties mentioned in AcademyCourseCard)
//checkSourceTrue
//--------------------------

//card container fetches data
const cardPropsData = [
    {
        id: '1',
        //url: 'https://img-b.udemycdn.com/course/480x270/3274392_be32_2.jpg',
        title: 'Boxing Training Course, Complete Workout Set',
        description: `Learn boxing from beginner to pro. Learn throw punch like pro boxer, get best body shape ever with raw boxing.`,
        //duration: '6 months',
        //timing: '7am - 9am',
        //strength: '303',
        location: 'Bangalore',
        //zipcode: '621305',
        rating: '4',
    },
    {
        id: '2',
        //url: 'https://img-b.udemycdn.com/course/480x270/3902270_9850_5.jpg',
        title: 'Solo Boxing Programme - For Fitness/Self-Defence',
        description: `Learn fundamental footwork patterns, striking and combination work.`,
        duration: '3 months',
        timing: '6pm - 8pm',
        //strength: '103',
        //location: 'Kolkata',
        cost: '1500',
        rating: '3',
    },
    {
        id: '3',
        url: 'https://img-c.udemycdn.com/course/480x270/901086_8c5e.jpg',
        title: 'Boxing Masterclass - Boxing Foundation',
        description: `Learn to box with Former World Champion Boxer Cornelius Carr. Boxing basics & techniques. Learn It. Train It. Use It.`,
        duration: '1 year',
        timing: '6pm - 8pm',
        strength: '103',
        location: 'Chennai',
        zipcode: '721305',
        rating: '3',
    },
    {
        id: '4',
        url: 'https://img-c.udemycdn.com/course/480x270/1678698_cb56_4.jpg',
        title: 'Ultimate Boxing Training: Professional Boxing Techniques',
        description: `Legendary Fighter Reveals The Boxing Secrets That Pummel, Destroy And Knockout Any Attacker Or Opponent Who Tries You!`,
        duration: '1 year',
        timing: '10am - 12am',
        strength: '103',
        location: 'Delhi',
        zipcode: '721305',
        rating: '3',
    },
    {
        id: '5',
        url: 'https://img-c.udemycdn.com/course/480x270/2323508_0852.jpg',
        title: 'Boxing For Self Defense Fitness and Martial Arts',
        description: `Learn how to punch for self defense fitness and competition`,
        duration: '1 year',
        timing: '6pm - 8pm',
        strength: '45',
        location: 'Lucknow',
        zipcode: '721305',
        rating: '3',
    },
];


export function SpinnerLoader() {
    return (
        <div className="loading-spinner" style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirextion: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="spinner-border text-primary" role="status" style={{ width: '50px', height: '50px' }}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

let testSetCount = 0;
export default function CardContainer(props) {


    let [state, setState] = useState({ viewType: 'list', });

    let param = useParams();

    let cardContainerRef = useRef({ observer: null });

    let mainStoreDispatch = useDispatch();

    let cardProps = useSelector((state) => {
        if (state) {
            if (props.academy) {
                return state.academyDetails;
            } else {
                if (state.courseDetails) {
                    return state.courseDetails[param.academyId];
                }
            }
        } else {
            return null;
        }
    });

    useEffect(() => {
        //console.log('CardContainer: rendering ' + testSetCount++);
        fetchCardProps();

        let gridViewChangeButton = document.getElementById('academyCourseCardAsGrid');
        let listViewChangeButton = document.getElementById('academyCourseCardAsList');
        gridViewChangeButton.addEventListener('click', onGridViewChangeClick);
        listViewChangeButton.addEventListener('click', onListViewChangeClick);

        return () => {
            gridViewChangeButton.removeEventListener('click', onGridViewChangeClick);
            listViewChangeButton.removeEventListener('click', onListViewChangeClick);
        };
    });


    let onGridViewChangeClick = () => {
        setState({ viewType: 'grid' });
    }


    let onListViewChangeClick = () => {
        setState({ viewType: 'list' });
    }


    let fetchCardProps = async () => {
        if (CardContainerNotifier.canUpdate) {
            CardContainerNotifier.reset();
            let cardPropsData = await props.fetch();
            let actionType = (props.academy) ? 'academyDetails' : 'courseDetails';
            if (props.academy) {
                mainStoreDispatch({ type: actionType, payload: cardPropsData });
            }
            if (props.course) {
                mainStoreDispatch({ type: actionType, payload: { [param.academyId]: cardPropsData } });
            }

        }
    };

    let getCards = () => {
        //console.log('getCards called ' + testSetCount);
        if (cardProps) {
            //console.log(`testSetCount: ${testSetCount} \n${Object.values(cardProps ?? {})}`);
            let cards = [];
            let srsIDCount = 1;
            if (cardProps.length === 0) {
                return (
                    <div class="nothing-here">
                        NOTHING HERE!
                    </div>
                );
            }

            if (state.viewType === 'grid') {
                for (const cardProp of cardProps) {
                    let prophash = objectHash({
                        cardProp: cardProp,
                        timestamp: Math.floor(Date.now() / 1000)
                    });
                    cards.push(
                        <GridAcademyCourseCard
                            {...props}
                            key={`${prophash}`}//displayCard_grid_${srsIDCount}
                            srsIDCount={srsIDCount++}
                            cardProp={cardProp}
                            checkSourceTrue={props.checkSourceTrue}
                        />);
                }
            } else {
                //if no view type is given list type is assumed
                for (const cardProp of cardProps) {
                    let prophash = objectHash({
                        cardProp: cardProp,
                        timestamp: Math.floor(Date.now() / 1000)
                    });
                    cards.push(
                        <ListAcademyCourseCard
                            {...props}
                            key={`${prophash}`}//displayCard_list_${srsIDCount}
                            srsIDCount={srsIDCount++}
                            cardProp={cardProp}
                            checkSourceTrue={props.checkSourceTrue}
                        />);
                }
            }
            return cards;
        } else {
            CardContainerNotifier.update();
            fetchCardProps();
            return (<SpinnerLoader />);
        }
    };


    return (
        <div ref={cardContainerRef} id='cardContainer' className="row row-col-5 justify-content-center card-container">
            {getCards()}
            <div className="extra-scroll"></div>
        </div>
    );
}