import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxSelect, { FxSelectOption } from "components/Form/FxSelect";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";

export default function AdminAddStudent(props) {

    let inputIdOb = userDetailsFormFormat.student.add.input;

    let handleFormData = (formData) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formData);
        let sFormat = serverFormat(formData);
    }

    let serverFormat = (formData) => {
        let formFormat = userDetailsFormFormat.student.add;
        return {
        };
    }

    let getAddressInfromationForm = () => {
        return (
            <Formxvi title='Address Infromation' child>
                <FxInput
                    id={inputIdOb.house_no.id}
                    label={inputIdOb.house_no.placeholder}
                    regex='^[1-9]\d*(?: ?(?:[a-z]|[/-] ?\d+[a-z]?))?$'
                    errorMsg='House no: look like 12, 12a, 56/58, 56/58a'
                    required />
                <FxInput
                    id={inputIdOb.street_name.id}
                    label={inputIdOb.street_name.placeholder}
                    regex='^[a-z\sA-Z]{3,50}$'
                    errorMsg='Please enter valid street number'
                    required />
                <FxInput
                    id={inputIdOb.area_name.id}
                    label={inputIdOb.area_name.placeholder}
                    regex='^[a-z\sA-Z]{3,50}$'
                    errorMsg='Please enter valid area name'
                    required />
                <FxInput
                    id={inputIdOb.pincode.id}
                    label={inputIdOb.pincode.placeholder}
                    regex='^[1-9][0-9]{5}$'
                    errorMsg='Please enter valid pincode'
                    required />
                <FxInput
                    id={inputIdOb.state.id}
                    label={inputIdOb.state.placeholder}
                    regex='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
                    errorMsg='Please select a valid state'
                    required />
                <FxInput
                    id={inputIdOb.nationality.id}
                    label={inputIdOb.nationality.placeholder}
                    defValue='India'
                    disabled />
            </Formxvi>
        );
    }

    let getBasicInfo = () => {
        return (
            <>
                <FxInput
                    id={inputIdOb.first_name.id}
                    label={inputIdOb.first_name.placeholder}
                    regex='^[a-z\sA-Z]{3,30}$'
                    errorMsg='Must be 10-30 characters long'
                    required />
                <FxInput
                    id={inputIdOb.last_name.id}
                    label={inputIdOb.last_name.placeholder}
                    regex='^[a-z\sA-Z]{3,30}$'
                    errorMsg='Must be 10-30 characters long'
                    required />
                <FxInput
                    id={inputIdOb.mother_name.id}
                    label={inputIdOb.mother_name.placeholder}
                    regex='^[a-z\sA-Z]{3,30}$'
                    errorMsg='Must be 10-30 characters long'
                    required />
                <FxInput
                    id={inputIdOb.father_name.id}
                    label={inputIdOb.father_name.placeholder}
                    regex='^[a-z\sA-Z]{3,30}$'
                    errorMsg='Must be 10-30 characters long'
                    required />
                <FxInput
                    id={inputIdOb.phone_number.id}
                    label={inputIdOb.phone_number.placeholder}
                    regex='^[0-9]{10}$'
                    errorMsg='Please enter'
                    required />
                <FxInput
                    id={inputIdOb.alternate_number.id}
                    label={inputIdOb.alternate_number.placeholder}
                    regex='^[0-9]{10}$'
                    errorMsg='Please enter valid phone number' />
                <FxInput
                    id={inputIdOb.email_id.id}
                    label={inputIdOb.email_id.placeholder}
                    regex='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
                    errorMsg='Please enter valid phone number'
                    required />
                <FxInput
                    id={inputIdOb.age.id}
                    label={inputIdOb.age.placeholder}
                    regex='[1-9][0-5]'
                    errorMsg='Age limit above 10'
                    required />
                <FxSelect
                    id={inputIdOb.gender.id}
                    label={inputIdOb.gender.placeholder}
                    errorMsg='Please select gender'
                    required>
                    <FxSelectOption disabled value='Choose Gender' />
                    <FxSelectOption value='Male' />
                    <FxSelectOption value='Female' />
                    <FxSelectOption value='Others' />
                </FxSelect>
            </>
        );

    }




    return (
        <Formxvi title='Add Student'>

            {getBasicInfo().props.children}

            {/*getAddressInfromationForm()*/}

        </Formxvi>
    );
}