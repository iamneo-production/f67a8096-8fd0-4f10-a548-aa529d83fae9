import AcademyCourseCard from './AcademyCourseCard';

import 'assets/css/card/list-card-display-details.css';

export default function ListAcademyCourseCard(props) {
    return (
        <AcademyCourseCard list {...props} />
    );
}