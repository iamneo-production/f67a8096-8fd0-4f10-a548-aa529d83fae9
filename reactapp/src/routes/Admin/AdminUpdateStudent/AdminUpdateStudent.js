import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxSelect, { FxSelectOption } from "components/Form/FxSelect";

import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";

import Database from "database/Database";
import axios from "axios";
import { serverURL } from "config/serverConfig";

export const stateList = {
    "Andhra Pradesh": 1,
    "Arunachal Pradesh": 2,
    "Assam": 3,
    "Bihar": 4,
    "Chhattisgarh": 5,
    "Goa": 6,
    "Gujarat": 7,
    "Haryana": 8,
    "Himachal Pradesh": 9,
    "Jammu and Kashmir": 10,
    "Jharkhand": 11,
    "Karnataka": 12,
    "Kerala": 13,
    "Madhya Pradesh": 14,
    "Maharashtra": 15,
    "Manipur": 16,
    "Meghalaya": 17,
    "Mizoram": 18,
    "Nagaland": 19,
    "Odisha": 20,
    "Punjab": 21,
    "Rajasthan": 22,
    "Sikkim": 23,
    "Tamil Nadu": 24,
    "Telangana": 25,
    "Tripura": 26,
    "Uttarakhand": 27,
    "Uttar Pradesh": 28,
    "West Bengal": 29,
    "Andaman and Nicobar Islands": 30,
    "Chandigarh": 31,
    "Dadra and Nagar Haveli": 32,
    "Daman and Diu": 33,
    "Delhi": 34,
    "Lakshadweep": 35,
    "Puducherry": 36
};


export default function AdminUpdateStudent(props) {

    let navigate = useNavigate();

    let loc = useLocation();

    let inputIdOb = userDetailsFormFormat.student.edit.input;

    let onFormSubmit = async (formState) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formState);

        console.log(serverFormatUpdateStudent(formState));
        await updateStudent(serverFormatUpdateStudent(formState));
        setTimeout(() => { navigate('/admin/students') }, 1500);
    }


    let serverFormatUpdateStudent = (formState) => {
        //console.log(formState[inputIdOb.first_name.id].value);

        return {
            studentId: loc.state.data.studentId,
            firstName: formState[inputIdOb.first_name.id].value,
            lastName: formState[inputIdOb.last_name.id].value,
            motherName: formState[inputIdOb.mother_name.id].value,
            fatherName: formState[inputIdOb.father_name.id].value,
            mobileNumber: `${formState[inputIdOb.phone_number.id].value}*${formState[inputIdOb.alternate_number.id].value}`,
            studentEmail: formState[inputIdOb.email_id.id].value,
            age: formState[inputIdOb.age.id].value,
            gender: formState[inputIdOb.gender.id].value,
            address: `${formState[inputIdOb.house_no.id].value}*${formState[inputIdOb.street_name.id].value}*${formState[inputIdOb.area_name.id].value}*${formState[inputIdOb.pincode.id].value}`,
            state: formState[inputIdOb.state.id].value,
            city: 'null',
        }

    }

    let updateStudent = async (sformat) => {
        //console.log(sformat);
        try {
            let response = await axios.put(`${serverURL}/Student/editStudent`, sformat, {
                headers: {
                    Authorization: `Bearer ${await Database.getToken()}`
                },
            });

            console.log(response.message);
            console.log(response.payload);

            toast('Update Successfull!');
            return response.payload;
        } catch (err) {
            toast('Update Failed!');
        }
    }

    let getStateOptions = () => {
        let states = Object.keys(stateList);

        let options = [];
        for (const state of states) {
            options.push(<FxSelectOption key={`state_name_${state}`} value={state} />);
        }

        return options;
    }

    let getAddressInfromationForm = () => {
        let defData = loc.state.data;

        let address = defData.address.split('*');

        let defSelectIndexState = stateList[defData.state];

        console.log(defSelectIndexState);

        return (
            <Formxvi title='Address Infromation' child>
                <FxInput {...inputIdOb.house_no} defValue={address[0]} />
                <FxInput {...inputIdOb.street_name} defValue={address[1]} />
                <FxInput {...inputIdOb.area_name} defValue={address[2]} />
                <FxInput {...inputIdOb.pincode} defValue={address[3]} />
                <FxSelect {...inputIdOb.state} defSelectIndex={defSelectIndexState} >
                    <FxSelectOption disabled value='Choose State' />
                    {getStateOptions()}
                </FxSelect>
                <FxInput {...inputIdOb.nationality} />
            </Formxvi>
        );
    }

    let getBasicInfo = () => {
        console.log(loc.state.data);

        let defData = loc.state.data;

        let mobileNumber = defData.mobileNumber.split('*');

        let defSelectIndexGender = (defData.gender === 'Male') ? 1 : (defData.gender === 'Female') ? 2 : 3;

        return (
            <>
                <FxInput {...inputIdOb.first_name} defValue={defData.firstName} />
                <FxInput {...inputIdOb.last_name} defValue={defData.lastName} />
                <FxInput {...inputIdOb.mother_name} defValue={defData.motherName} />
                <FxInput {...inputIdOb.father_name} defValue={defData.fatherName} />
                <FxInput {...inputIdOb.phone_number} defValue={mobileNumber[0]} />
                <FxInput {...inputIdOb.alternate_number} defValue={mobileNumber[1]} />
                <FxInput {...inputIdOb.email_id} defValue={defData.studentEmail} />
                <FxInput {...inputIdOb.age} defValue={defData.age} />
                <FxSelect
                    id={inputIdOb.gender.id}
                    label={inputIdOb.gender.placeholder}
                    errorMsg='Please select gender' defSelectIndex={defSelectIndexGender} required>
                    <FxSelectOption disabled value='Choose Gender' />
                    <FxSelectOption value='Male' />
                    <FxSelectOption value='Female' />
                    <FxSelectOption value='Others' />
                </FxSelect>
            </>
        );

    }




    return (
        <Formxvi
            id='addAcademy'
            title='Edit Student'
            onFormSubmit={onFormSubmit}>

            {getBasicInfo().props.children}

            {getAddressInfromationForm()}

        </Formxvi>
    );
}