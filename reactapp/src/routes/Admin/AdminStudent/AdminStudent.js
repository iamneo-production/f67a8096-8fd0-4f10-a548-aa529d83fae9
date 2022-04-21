import StudentView from "components/StudentView/StudentView";

export default function AdminStudent() {

    let getData = () => {
        return [
            [
                "userId",
                "courseId",
                "studentId",
                "firstName",
                "lastName",
                "mobileNumber",
                "enrolledCourseName"
            ],
            [
                1,
                20,
                18,
                "First",
                "Name",
                "9475929195*",
                "Judo Pro"
            ],
            [
                1,
                30,
                18,
                "First",
                "Name",
                "9475929195*",
                "Master Defense "
            ]
        ];
    }

    return (<StudentView getData={getData} />)
}