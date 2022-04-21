import 'assets/css/search/search.css';
import { useRef } from 'react';

//------------props-----------
//academy | course | students
//onSearchInput
//gridViewOff listViewOff
//----------------------------
export default function SearchBar(props) {

    let sRef = useRef(null);

    let idStore = {
        academy: {
            searchInputId: 'searchAcademyInput',
            searchButtonId: 'searchButton',
            placeholder: 'search academy...',
        },
        course: {
            searchInputId: 'searchCourseInput',
            searchButtonId: 'searchCourse',
            placeholder: 'search course...',
        },
        students: {
            searchInputId: 'searchStudentsInput',
            searchButtonId: 'searchStudents',
            placeholder: 'search students...',
        }
    }

    let searchSetup = () => {
        if (props.academy) {
            return (
                <>
                    <input
                        ref={sRef}
                        id={idStore.academy.searchInputId}
                        class="form-control search"
                        type="text"
                        onInput={(event) => {
                            event.stopPropagation();
                            props.onSearch(sRef.current.value)
                        }}
                        placeholder={idStore.academy.placeholder} />
                    <span
                        id={idStore.academy.searchButtonId}
                        class="material-icons search-icon"
                        onClick={(event) => {
                            event.stopPropagation();
                            props.onSearch(sRef.current.value)
                        }}>search</span>
                </>
            );
        } else if (props.course) {
            return (
                <>
                    <input
                        id={idStore.course.searchInputId}
                        ref={sRef}
                        class="form-control search"
                        type="text"
                        onInput={(event) => {
                            event.stopPropagation();
                            props.onSearch(sRef.current.value)
                        }}
                        placeholder={idStore.course.placeholder} />
                    <span
                        id={idStore.course.searchButtonId}
                        class="material-icons search-icon"
                        onClick={(event) => {
                            event.stopPropagation();
                            props.onSearch(sRef.current.value)
                        }}>search</span>
                </>
            );
        } else {
            if (props.students) {
                return (
                    <>
                        <input
                            id={idStore.students.searchInputId}
                            ref={sRef}
                            class="form-control search"
                            type="text"
                            onInput={(event) => {
                                event.stopPropagation();
                                props.onSearch(sRef.current.value)
                            }}
                            placeholder={idStore.students.placeholder} />
                        <span
                            id={idStore.students.searchButtonId}
                            class="material-icons search-icon"
                            onClick={(event) => {
                                event.stopPropagation();
                                props.onSearch(sRef.current.value)
                            }}>search</span>
                    </>
                );
            }
        }
    }

    let viewChangers = () => {
        let viewChangers = [];
        if (!props.gridViewOff) {
            viewChangers.push(<span id='academyCourseCardAsList' class="material-icons list-view">view_list</span>);
        }
        if (!props.listViewOff) {
            viewChangers.push(<span id='academyCourseCardAsGrid' class="material-icons grid-view">grid_view</span>);
        }
        return viewChangers;
    };

    return (
        <div class="search-bar">
            <div class="search-container">
                {searchSetup()}
            </div>
            <div class="view-change">
                {viewChangers()}
            </div>
        </div>
    );
}