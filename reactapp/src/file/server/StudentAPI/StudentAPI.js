import AddStudentAPI from "./AddStudentAPI";


export default class StudentAPI {

    static add(reqBody) {
        return AddStudentAPI.addStudent(reqBody);
    }

}

