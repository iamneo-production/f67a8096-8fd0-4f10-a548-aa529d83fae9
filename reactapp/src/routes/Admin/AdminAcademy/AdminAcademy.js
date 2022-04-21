import axios from "axios";
import AcademyView from "components/AcademyView/AcademyView";

import Database from "database/Database";


export default function AdminAcademy(props) {
    let onSearch = async (searchTerm) => {
        console.log(searchTerm);
        searchTerm = searchTerm || '';
        let sResults = [];
        try {
            sResults = await axios.get(`http://localhost:8080/institute/search/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${await Database.getToken()}`
                }
            }).then((resposne) => { return resposne.data });
            console.log(sResults);
            return sResults;
        } catch (err) { }
    }

    return (
        <AcademyView admin onSearch={onSearch} />
    );
}