import validator from "email-validator";
import { _regex } from 'components/Forms/regex.js';


let userDetailsFormFormat = {
    student: {
        add: {
            input: {
                first_name: {
                    id: 'firstName',
                    name: 'first_name',
                    label: 'First Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                last_name: {
                    id: 'lastName',
                    name: 'last_name',
                    label: 'Last Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                mother_name: {
                    id: 'motherName',
                    name: 'mother_name',
                    label: 'Mother Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                father_name: {
                    id: 'fatherName',
                    name: 'father_name',
                    label: 'Father Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                phone_number: {
                    id: 'phoneNumber1',
                    name: 'phone_number',
                    label: 'Primary Phone Number',
                    regex: _regex.contactNumber,
                    errorMsg: 'Please enter valid phone number',
                    required: true
                },
                alternate_number: {
                    id: 'phoneNumber2',
                    name: 'alternate_number',
                    label: 'Alternate Phone Number',
                    regex: _regex.contactNumber,
                    errorMsg: 'Please enter valid phone number',
                    required: false,
                },
                email_id: {
                    id: 'emailId',
                    name: 'email_id',
                    label: 'Email',
                    validator: (value) => {
                        return validator.validate(value);
                    },
                    errorMsg: 'Please enter valid email',
                    disabled: true
                },
                age: {
                    id: 'age',
                    name: 'age',
                    label: 'Age',
                    regex: _regex.age,
                    errorMsg: 'Age limit above 5 and below 60',
                    required: true
                },
                gender: {
                    id: 'male/female',
                    name: 'gender',
                    type: 'text',
                    placeholder: 'Gender',
                    required: true
                },
                house_no: {
                    id: 'houseNo',
                    name: 'house_no',
                    label: 'House No:',
                    regex: _regex.houseNo,
                    errorMsg: 'House no: look like 12, 12a, 56/58, 56/58a',
                    required: true
                },
                street_name: {
                    id: 'streetName',
                    name: 'street_name',
                    label: 'Street Name',
                    regex: _regex.name,
                    errorMsg: 'Please enter valid street number',
                    required: true
                },
                area_name: {
                    id: 'areaName',
                    name: 'area_name',
                    label: 'Area Name',
                    regex: _regex.name,
                    errorMsg: 'Please enter valid area name',
                    required: true
                },
                pincode: {
                    id: 'pincode',
                    name: 'pincode',
                    label: 'Pincode',
                    regex: _regex.pincode,
                    errorMsg: 'Please enter valid pincode',
                    required: true
                },
                state: {
                    id: 'state',
                    name: 'state',
                    label: 'State',
                    errorMsg: 'Please select a valid state',
                    required: true
                },
                nationality: {
                    id: 'nationality',
                    name: 'nationality',
                    label: 'Nationality',
                    defValue: 'India',
                    disabled: true
                },
            },
            button: {
                add_student: {
                    id: 'addStudent',
                    name: 'add_student',
                    text: 'Add Student',
                }
            },
        },
        enroll: {
            input: {},
            button: {
                enroll_student: {
                    id: 'enrollStudent',
                    name: 'enroll_student',
                    text: 'Enroll Course',
                }
            }
        },
        edit: {
            input: {
                first_name: {
                    id: 'editFirstName',
                    name: 'first_name',
                    label: 'First Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                last_name: {
                    id: 'editLastName',
                    name: 'last_name',
                    label: 'Last Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                mother_name: {
                    id: 'editMotherName',
                    name: 'mother_name',
                    label: 'Mother Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                father_name: {
                    id: 'editFatherName',
                    name: 'father_name',
                    label: 'Father Name',
                    regex: _regex.name,
                    errorMsg: 'Must be 10-30 characters long',
                    required: true
                },
                phone_number: {
                    id: 'editPhoneNumber1',
                    name: 'phone_number',
                    label: 'Primary Phone Number',
                    regex: _regex.contactNumber,
                    errorMsg: 'Please enter valid phone number',
                    required: true
                },
                alternate_number: {
                    id: 'editPhoneNumber2',
                    name: 'alternate_number',
                    label: 'Alternate Phone Number',
                    regex: _regex.contactNumber,
                    errorMsg: 'Please enter valid phone number',
                    required: false,
                },
                email_id: {
                    id: 'editEmailId',
                    name: 'email_id',
                    label: 'Email',
                    validator: (value) => {
                        return validator.validate(value);
                    },
                    errorMsg: 'Please enter valid email',
                    disabled: true
                },
                age: {
                    id: 'editAge',
                    name: 'age',
                    label: 'Age',
                    regex: _regex.age,
                    errorMsg: 'Age limit above 5 and below 60',
                    required: true
                },
                gender: {
                    id: 'male/female',
                    name: 'gender',
                    placeholder: 'Gender',
                    required: true
                },

                house_no: {
                    id: 'editHouseNo',
                    name: 'house_no',
                    label: 'House No:',
                    regex: _regex.houseNo,
                    errorMsg: 'House no: look like 12, 12a, 56/58, 56/58a',
                    required: true
                },
                street_name: {
                    id: 'editStreetName',
                    name: 'street_name',
                    label: 'Street Name',
                    regex: _regex.name,
                    errorMsg: 'Please enter valid street number',
                    required: true
                },
                area_name: {
                    id: 'editAreaName',
                    name: 'area_name',
                    label: 'Area Name',
                    regex: _regex.name,
                    errorMsg: 'Please enter valid area name',
                    required: true
                },
                pincode: {
                    id: 'editPincode',
                    name: 'pincode',
                    label: 'Pincode',
                    regex: _regex.pincode,
                    errorMsg: 'Please enter valid pincode',
                    required: true
                },
                state: {
                    id: 'editState',
                    name: 'state',
                    label: 'State',
                    errorMsg: 'Please select a valid state',
                    required: true
                },
                nationality: {
                    id: 'editNationality',
                    name: 'nationality',
                    label: 'Nationality',
                    defValue: 'India',
                    disabled: true
                },
            },
            button: {
                edit_academy: {
                    id: 'updateStudent',
                    name: 'update_student',
                    text: 'Update Student',
                }
            },
        },
    },
};

userDetailsFormFormat.student.enroll.input = userDetailsFormFormat.student.add.input;

export { userDetailsFormFormat };