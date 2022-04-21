import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import { useLocation, useNavigate } from "react-router-dom";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import { useDispatch } from "react-redux";
import MainStore from "store/Main/MainStore";
import { useEffect, useState } from "react";
import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";

function cardPropFormat(academy) {
    return {
        id: academy.instituteId,
        url: academy.imageURL,
        title: academy.instituteName,
        description: academy.instituteDesc,
        location: academy.instituteAddress,
        strength: academy.instituteEmail,
        rating: academy.rating,
    };
}

function RealTimeAcademyFetchWrapper(props) {

    let mainStoreDispatch = useDispatch();

    let lastInstituteId = () => {
        let aList = MainStore.store.getState().academyDetails;
        //console.log(aList);
        if (aList) {
            if (aList[aList.length - 1]) {
                return aList[aList.length - 1].id;
            }
        }
        return null;
    }

    let getNext = async (lId) => {
        if (lId) {
            try {
                let nextAcademy = await AcademyAPI.fetchById(lId + 1).then((res) => { return res.payload.data; });
                let cardProp = cardPropFormat(nextAcademy);
                //console.log(cardProp.id);
                mainStoreDispatch({ type: 'addIntoAcademyDetails', payload: cardProp });
            } catch (err) { }
        }
        setTimeout(() => {
            let lId = lastInstituteId();
            if (lId) {
                getNext(lId);
            }
        }, 10000);
    };
    //getNext(lastInstituteId());

    return props.children;
}

export default function AcademyView(props) {
    let [state, setState] = useState({
        view: {
            search: {
                display: false,
                payload: ''
            }
        }
    });

    let nav = useNavigate();

    let loc = useLocation();

    let mainStoreDispatch = useDispatch();

    let onAddAcademyClicked = () => {
        nav('add');
    }

    useEffect(() => {
        let locState = loc.state;
        if (locState) {
            if (!locState.view.search.display) {
                console.log(locState);
                setState({
                    view: {
                        search: {
                            display: false,
                            payload: ''
                        }
                    }
                });
            }
        }
    }, [loc.state]);

    let fetchAllAcademy = async () => {
        let cardPropsData = [];
        let payload = await AcademyAPI.fetchAll().then((response) => { return response.payload; });

        if (payload.academy[Symbol.iterator]) {

            payload.academy.forEach((academy) => {
                cardPropsData.push(cardPropFormat(academy));
            });

            return cardPropsData;
        } else {
            cardPropsData.push(cardPropFormat(payload.academy));
        }

        return cardPropsData;
    }

    let checkSourceTrue = async (id) => {
        try {
            await AcademyAPI.fetchById(id)
        } catch (err) {
            if (err['response'].status === 404) {
                console.log(id);
                mainStoreDispatch({ type: 'deleteAcademyDetail', payload: id });
            }
        }
    }

    let getAllAcademyAdminView = () => {
        CardContainerNotifier.update();
        return (
            <>
                <CardContainer admin academy fetch={fetchAllAcademy} checkSourceTrue={checkSourceTrue} />
                <HoverButton
                    id='addAcademyHoverButton'
                    text='Add Academy'
                    onClick={onAddAcademyClicked} />
            </>
        );
    }

    let getSearchAcademyAdminView = () => {
        CardContainerNotifier.update();
        return (
            <>
                <CardContainer admin academy fetch={fetchSearchResults} checkSourceTrue={checkSourceTrue} />
                <HoverButton
                    id='addAcademyHoverButton'
                    text='Add Academy'
                    onClick={onAddAcademyClicked} />
            </>
        );
    }

    let getAllAcademyUserView = () => {
        CardContainerNotifier.update();
        return (
            <CardContainer user academy fetch={fetchAllAcademy} checkSourceTrue={checkSourceTrue} />
        );
    }

    let getSearchAcademyUserView = () => {
        CardContainerNotifier.update();
        return (
            <CardContainer
                user
                academy
                fetch={fetchSearchResults}
                checkSourceTrue={checkSourceTrue} />
        );
    }

    let getView = () => {
        if (props.admin) {
            if (state.view.search.display) {
                console.log('search');
                return getSearchAcademyAdminView();
            } else {
                return getAllAcademyAdminView();
            }
        } else {
            if (state.view.search.display) {
                console.log('search');
                return getSearchAcademyUserView();
            } else {
                return getAllAcademyUserView();
            }
        }
    }

    let onSearch = (text) => {
        setState({
            view: {
                search: {
                    display: true,
                    payload: text
                }
            }
        });
    }

    let fetchSearchResults = async () => {
        console.log('hello world')
        let text = state.view.search.payload;
        let results = await props.onSearch(text);
        console.log(results);
        let academyProp = [];
        if (results) {
            results.forEach((sResult) => { academyProp.push(cardPropFormat(sResult)); });
        } else {
            setState({
                view: {
                    search: {
                        display: false,
                        payload: ''
                    }
                }
            });
        }
        return academyProp;
    }


    return (
        <>
            <SearchBar academy onSearch={onSearch} />
            <RealTimeAcademyFetchWrapper>
                {getView()}
            </RealTimeAcademyFetchWrapper>
        </>
    );
}