import validator from "email-validator";
import { _regex } from 'components/Forms/regex.js';


export let academyCourseDetailsFormFormat = {
    academy: {
        add: {
            input: {
                academy_name: {
                    id: 'academyName',
                    name: 'academy_name',
                    label: 'Academy Name',
                    regex: _regex.name,
                    placeholder: '',
                    errorMsg: 'Please enter valid name',
                    required: true,
                },
                academy_contact_number: {
                    id: 'contactNumber',
                    name: 'academy_contact_number',
                    label: 'Phone Number',
                    regex: _regex.contactNumber,
                    placeholder: '',
                    errorMsg: 'Please enter valid phone number',
                    required: true,
                },
                academy_image_url: {
                    id: 'imageUrl',
                    name: 'academy_image_url',
                    label: 'Image Url',
                    regex: _regex.imageURL,
                    placeholder: '',
                    errorMsg: 'Must be png or jpg format',
                    required: true,
                },
                academy_location: {
                    id: 'academyLocation',
                    name: 'academy_location',
                    label: 'Address',
                    regex: _regex.address,
                    placeholder: '',
                    errorMsg: 'Please enter valid address',
                    required: true,
                },
                academy_email: {
                    id: 'emailId',
                    name: 'academy_email',
                    label: 'Email',
                    validator: (value) => {
                        return validator.validate(value);
                    },
                    placeholder: '',
                    errorMsg: 'Please enter valid email',
                    required: true,
                },
                academy_description: {
                    id: 'academyDescription',
                    name: 'academy_description',
                    label: 'Description',
                    placeholder: '',
                    errorMsg: 'Please enter a descrtion. Limit 255 char',
                    required: true,
                },
            },
            button: {
                add_academy: {
                    name: 'add_academy',
                    id: 'addAcademy',
                    text: 'Add Academy'
                },
            },
        },
        edit: {
            input: {
                academy_name: {
                    id: 'editAcademyName',
                    name: 'academy_name',
                    label: 'Academy Name',
                    regex: _regex.name,
                    placeholder: '',
                    errorMsg: 'Please enter valid name',
                    disabled: true,
                },
                academy_contact_number: {
                    id: 'editContactNumber',
                    name: 'academy_contact_number',
                    label: 'Phone Number',
                    regex: _regex.contactNumber,
                    placeholder: '',
                    errorMsg: 'Please enter valid phone number',
                    required: true,
                },
                academy_image_url: {
                    id: 'editImageUrl',
                    name: 'academy_image_url',
                    label: 'Image Url',
                    regex: _regex.imageURL,
                    placeholder: '',
                    errorMsg: 'Must be png or jpg format',
                    required: true,
                },
                academy_location: {
                    id: 'editAcademyLocation',
                    name: 'academy_location',
                    label: 'Address',
                    regex: _regex.address,
                    placeholder: '',
                    errorMsg: 'Please enter valid address',
                    required: true,
                },

                academy_email: {
                    id: 'editEmailId',
                    name: 'academy_email',
                    label: 'Email',
                    validator: (value) => {
                        return validator.validate(value);
                    },
                    placeholder: '',
                    errorMsg: 'Please enter valid email',
                    disabled: true,
                },
                academy_description: {
                    id: 'editAcademyDescription',
                    name: 'academy_description',
                    label: 'Description',
                    placeholder: '',
                    errorMsg: 'Please enter a descrtion. Limit 255 char',
                    required: true,
                },
            },
            button: {
                update_academy: {
                    name: 'update_academy',
                    id: 'updateAcademy',
                    text: 'Update Academy'
                },
            }
        }
    },
    course: {
        add: {
            input: {
                course_name: {
                    id: 'courseName',
                    name: 'course_name',
                    label: 'Course Name',
                    regex: _regex.name,
                    placeholder: '',
                    errorMsg: 'Please enter valid name',
                    required: true,
                },
                course_duration: {
                    id: 'courseDuration',
                    name: 'course_duration',
                    label: 'Course Duration(Days)',
                    regex: _regex.number,
                    placeholder: '',
                    errorMsg: 'Please enter valid duration',
                    required: true,
                },
                course_timing: {
                    id: 'courseTiming',
                    name: 'course_timing',
                    label: 'Course Timing',
                    regex: _regex.timimg,
                    placeholder: '',
                    errorMsg: 'eg: 1pm - 2pm',
                    required: true,
                },
                course_total_students: {
                    id: 'courseEnrolled',
                    name: 'course_total_students',
                    label: 'Max Students',
                    regex: _regex.number,
                    placeholder: '',
                    errorMsg: 'Please enter valid number',
                    required: true,
                },
                course_cost: {
                    id: 'courseCost',
                    name: 'course_cost',
                    label: 'Course Fees',
                    regex: _regex.number,
                    placeholder: '',
                    errorMsg: 'Please enter valid number',
                    required: true,
                },
                course_description: {
                    id: 'courseDescription',
                    name: 'course_description',
                    label: 'Course Description',
                    placeholder: '',
                    errorMsg: 'Please enter a descrtion. Limit 255 char',
                    required: true,
                },
            },
            button: {
                add_course: {
                    id: 'addCourse',
                    name: 'add_course',
                    text: 'Add Course',
                }
            },

        },
        edit: {
            input: {
                course_name: {
                    id: 'editCourseName',
                    name: 'course_name',
                    label: 'Course Name',
                    regex: _regex.name,
                    placeholder: '',
                    errorMsg: 'Please enter valid name',
                    disabled: true,
                },
                course_duration: {
                    id: 'editCourseDuration',
                    name: 'course_duration',
                    label: 'Course Duration(Days)',
                    regex: _regex.duration,
                    placeholder: '',
                    errorMsg: 'Please enter valid duration',
                    required: true,
                },
                course_timing: {
                    id: 'editCourseTiming',
                    name: 'course_timing',
                    label: 'Course Timing',
                    regex: _regex.timimg,
                    placeholder: '',
                    errorMsg: 'eg: 1pm - 2pm',
                    required: true,
                },
                course_total_students: {
                    id: 'editCourseEnrolled',
                    name: 'course_total_students',
                    label: 'Max Students',
                    regex: _regex.number,
                    placeholder: '',
                    errorMsg: 'Please enter valid number',
                    required: true,
                },
                course_cost: {
                    id: 'editCourseCost',
                    name: 'course_cost',
                    label: 'Course Fees',
                    regex: _regex.number,
                    placeholder: '',
                    errorMsg: 'Please enter valid number',
                    required: true,
                },
                course_description: {
                    id: 'editCourseDescription',
                    name: 'course_description',
                    label: 'Course Description',
                    placeholder: '',
                    errorMsg: 'Please enter a description. Limit 255 char',
                    required: true,
                },
            },
            button: {
                update_course: {
                    id: 'updateCourse',
                    name: 'update_course',
                    text: 'Update Course',
                },
            }
        },
    },
};