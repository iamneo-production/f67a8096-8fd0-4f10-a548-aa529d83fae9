import AcademyCourseCard from './AcademyCourseCard';

import 'assets/css/card/list-card-display-details.css';
import React from 'react';

/*class AcademyCourseCardErrBoundry extends React.Component {
    componentDidCatch(error, errorInfo) {
        console.log('error caught');
    }

    render() {
        return this.props.children;
    }
}*/

export default function ListAcademyCourseCard(props) {
    return (
        //<AcademyCourseCardErrBoundry>
        <AcademyCourseCard list {...props} />
        //</AcademyCourseCardErrBoundry>
    );
}