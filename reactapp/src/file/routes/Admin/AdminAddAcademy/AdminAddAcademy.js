import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxTextarea from "components/Form/FxTextarea";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";


export default function AdminAddAcademy(props) {

    let navigate = useNavigate();

    let academyFormInput = academyCourseDetailsFormFormat.academy.add.input;

    useEffect(() => {
        console.log('AdminAddAcademy rendered');
    });


    let onFormSubmit = (formState) => {
        console.log('AdminAddAcademy submitted');
        addAcademy(serverFormat(formState));
    }

    let serverFormat = (formState) => {
        console.log(formState);
        return {
            "instituteName": formState[academyFormInput.academy_name.id].value,
            "imageURL": formState[academyFormInput.academy_image_url.id].value,
            "instituteAddress": formState[academyFormInput.academy_location.id].value,
            "instituteMobile": formState[academyFormInput.academy_contact_number.id].value,
            "instituteEmail": formState[academyFormInput.academy_email.id].value,
            "instituteDesc": formState[academyFormInput.academy_description.id].value,
        };
    }

    let addAcademy = async (sformat) => {
        let response = await AcademyAPI.add(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        //setTimeout(() => { navigate(-1); }, 1100);
        navigate(-1);
        toast(response.message);
    }



    return (
        <Formxvi
            id='addAcademy'
            title='Add Academy'
            onFormSubmit={onFormSubmit}>
            <FxInput {...academyFormInput.academy_name} />
            <FxInput {...academyFormInput.academy_contact_number} />
            <FxInput {...academyFormInput.academy_image_url} />
            <FxInput {...academyFormInput.academy_location} />
            <FxInput {...academyFormInput.academy_email} />
            <FxTextarea {...academyFormInput.academy_description} />
        </Formxvi>
    );

}

/*id = { academyFormInput.academy_contact_number.id }
name = { academyFormInput.academy_contact_number.name }
label = { academyFormInput.academy_contact_number.placeholder }
regex = '^[0-9]{10}$'
errorMsg = 'Please enter valid phone number'
required*/