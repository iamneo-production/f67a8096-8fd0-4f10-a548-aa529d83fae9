import { useEffect, useRef, useState } from "react";

import 'assets/css/table-container/table-container.css';

import { SpinnerLoader } from "components/AcademyCourseCard/CardContainer";
import SearchBar from "components/SearchBar/SearchBar";
import objectHash from "object-hash";
import axios from "axios";

import { serverURL } from "config/serverConfig";

import Database from "database/Database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteStudentEvent } from "./CustomEvent/deleteStudentEvent";

const displayTypeAll = Symbol('displayTypeAll');
const displayTypeSearch = Symbol('displayTypeSearch');

function StudentTableRow(props) {
    let [state, setState] = useState({
        index: props.index,
        view: props.view
    });

    let nav = useNavigate();

    let onEdit = async (event) => {
        event.stopPropagation();

        axios.get(`${serverURL}/Student/${state.view[2]}`, {
            headers: {
                Authorization: `Bearer ${await Database.getToken()}`
            }
        }).then((response) => {
            console.log(response.data);
            nav(`${state.view[2]}/edit`, { state: { data: response.data } });
        }).catch((err) => {
            let status = err['response'].status;

            if (status === 500) {
                toast('Opps! Network error');
            } else {
                toast('Student Not found');
            }
        });
    }

    let onDelete = async (event) => {
        event.stopPropagation();

        axios.delete(`${serverURL}/Student/deleteStudent/${state.view[2]}`, {
            headers: {
                Authorization: `Bearer ${await Database.getToken()}`
            }
        }).then((response) => {
            deleteStudentEvent(event.target, state.view[2]);
            toast(`Student Deleted ${state.view[2]}`);
        }).catch((err) => {
            let status = err['response'].status;

            if (status === 500) {
                toast('Opps! Network error');
            } else {
                toast('Student Not found');
            }
        });
    }


    return (
        <tr key={`studentRow${state.index}`}>
            <td key={`studentRow${state.index}Col${1}`}>{state.view[2]}</td>
            <td key={`studentRow${state.index}Col${2}`}>{state.view[3]} {state.view[4]}</td>
            <td key={`studentRow${state.index}Col${3}`}>{(state.view[5].split('*')[0]) ? state.view[5].substring(0, state.view[5].length - 1) : state.view[5]}</td>
            <td key={`studentRow${state.index}Col${4}`}>{state.view[6]}</td>
            <td>
                <span className="material-icons edit-icon" onClick={onEdit}>edit</span>
                <span className="material-icons delete-icon" onClick={onDelete}>cancel</span>
            </td>
        </tr>
    );
}

export default function StudentView(props) {

    let [state, setState] = useState({ data: null, displayType: displayTypeAll, searchKeyword: null });

    let tableContainerRef = useRef();

    useEffect(() => {
        if (state.displayType === displayTypeAll) {
            props.getData().then((data) => {
                setState({ ...state, data: data });
            });
        } else {
            fetchSearchResults().then((data) => {
                setState({ ...state, data: data });
            });
        }

        tableContainerRef.current.addEventListener('deleteStudentEvent', onDeleteStudentEvent);
    }, []);

    let onDeleteStudentEvent = async (event) => {
        event.stopPropagation();
        console.log('delete student');
        let data = await props.getData();

        setState({ data: data, displayType: displayTypeAll, searchKeyword: null });
    }


    let getRows = () => {
        let data = state.data;

        console.log(state);

        let rows = [];

        if (data) {
            if (data[Symbol.iterator]) {
                data.forEach((view, index) => {
                    if (index) {
                        rows.push(
                            <StudentTableRow key={objectHash(view)} index={index} view={view} />
                        );
                    }
                });
            }
        } else {
            return (
                <tr>
                    <td>
                        <SpinnerLoader />
                    </td>
                </tr>
            );
        }

        if (rows.length < 1) {
            rows.push(
                <tr>
                    <td>
                        Nothing here!
                    </td>
                </tr>
            );
        }

        return rows;
    }

    let onSearch = async (text) => {
        console.log('search course --->' + text);

        if (text) {
            let results = await fetchSearchResults(text);

            setState({ data: results, displayType: displayTypeSearch, searchKeyword: text });
        } else {
            let data = await props.getData();

            setState({ data: data, displayType: displayTypeAll, searchKeyword: null });
        }

    }

    let fetchSearchResults = async (text) => {
        //let text = state.searchKeyword;

        if (text) {
            let results = await props.onSearch(text);
            return results;
        }

        return [];

    }


    return (
        <>
            <SearchBar students gridViewOff listViewOff onSearch={onSearch} />
            <div ref={tableContainerRef} className="table-container">
            <div id='tableName' className="glow">Admin Student View</div>
                <table>
                    <tbody>
                        <tr>
                            <td>Student ID</td>
                            <td>Student Name</td>
                            <td>Mobile Number</td>
                            <td>Enrolled Course</td>
                            <td>Action</td>
                        </tr>
                        {getRows()}
                    </tbody>
                </table>
            </div>
        </>
    )
}