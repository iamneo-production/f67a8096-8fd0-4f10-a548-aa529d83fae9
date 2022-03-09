import { useEffect, useState } from 'react';

import GridAcademyCourseCard from './GridAcademyCourseCard';
import ListAcademyCourseCard from './ListAcademyCourseCard';

import 'assets/css/card-container/card-container.css';


//-----------props----------
//admin | user & academy | course
//cardProps (card properties mentioned in AcademyCourseCard)
//--------------------------

//card container fetches data
function fetch() {
    return [
        {
            id: '1',
            url: 'https://images.indianexpress.com/2020/06/the-matrix-759.jpg',
            title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
            description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                        Thymeleaf, JPA & Hibernate`,
            duration: '3 months',
            timing: '6pm - 8pm',
            strength: '103',
            location: 'Hyderabad',
            zipcode: '721305',
            rating: '3',
        },
        {
            id: '2',
            url: 'https://images.indianexpress.com/2020/06/the-matrix-759.jpg',
            title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
            description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                        Thymeleaf, JPA & Hibernate`,
            duration: '3 months',
            timing: '6pm - 8pm',
            strength: '103',
            location: 'Hyderabad',
            zipcode: '721305',
            rating: '3',
        },
        {
            id: '3',
            url: 'https://images.indianexpress.com/2020/06/the-matrix-759.jpg',
            title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
            description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                        Thymeleaf, JPA & Hibernate`,
            duration: '3 months',
            timing: '6pm - 8pm',
            strength: '103',
            location: 'Hyderabad',
            zipcode: '721305',
            rating: '3',
        },
        {
            id: '4',
            url: 'https://images.indianexpress.com/2020/06/the-matrix-759.jpg',
            title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
            description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                        Thymeleaf, JPA & Hibernate`,
            duration: '3 months',
            timing: '6pm - 8pm',
            strength: '103',
            location: 'Hyderabad',
            zipcode: '721305',
            rating: '3',
        },
        {
            id: '5',
            url: 'https://images.indianexpress.com/2020/06/the-matrix-759.jpg',
            title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
            description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                        Thymeleaf, JPA & Hibernate`,
            duration: '3 months',
            timing: '6pm - 8pm',
            strength: '103',
            location: 'Hyderabad',
            zipcode: '721305',
            rating: '3',
        },
    ];
}
export default function CardContainer(props) {
    let cardProps = fetch();

    let [state, setState] = useState({ viewType: 'list' });

    let onGridViewChangeClick = () => {
        console.log('grid view clicked');
        setState({ viewType: 'grid' });
    }

    let onListViewChangeClick = () => {
        console.log('list view clicked');
        setState({ viewType: 'list' });
    }

    useEffect(() => {
        let gridViewChangeButton = document.getElementById('academyCourseCardAsGrid');
        let listViewChangeButton = document.getElementById('academyCourseCardAsList');
        gridViewChangeButton.addEventListener('click', onGridViewChangeClick);
        listViewChangeButton.addEventListener('click', onListViewChangeClick);
        return () => {
            gridViewChangeButton.removeEventListener('click', onGridViewChangeClick);
            listViewChangeButton.removeEventListener('click', onListViewChangeClick);
        };
    });

    let getCards = () => {
        let cards = [];

        if (state.viewType === 'grid') {
            for (const cardProp of cardProps) {
                cards.push(
                    <GridAcademyCourseCard
                        {...props}
                        key={`displayCard_grid_${cardProp.id}`}
                        cardProp={cardProp} />);
            }
        } else {
            for (const cardProp of cardProps) {
                cards.push(
                    <ListAcademyCourseCard
                        {...props}
                        key={`displayCard_list_${cardProp.id}`}
                        cardProp={cardProp} />);
            }
        }
        return cards;
    };


    return (
        <div class="row row-col-5 justify-content-center card-container">
            {getCards()}
            <div class="extra-scroll"></div>
        </div>
    );
}