import AddAcademyAPI from "./AddAcademyAPI";
import DeleteAcademyAPI from "./DeleteAcademyAPI";
import FetchAcademyAPI from "./FetchAcademyAPI";
import UpdateAcademyAPI from "./UpdateAcademyAPI";


export default class AcademyAPI {

    static fetchAll() {
        return FetchAcademyAPI.fetchAllAcademy();
    }

    static fetchById(id) {
        return FetchAcademyAPI.fetchAcademyById(id);
    }

    static async add(reqBody) {
        return AddAcademyAPI.addAcademy(reqBody);
    }

    static async update(reqBody) {
        return UpdateAcademyAPI.updateAcademy(reqBody);
    }

    static async delete(id) {
        return DeleteAcademyAPI.delAcademy(id);
    }

}

