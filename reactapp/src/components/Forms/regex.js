export const _regex = {
    name: '^[a-zA-Z ]{3,}$',
    contactNumber: '^[0-9]{10}$',
    number: '^[0-9]{1,}$',
    imageURL: '(https?:\/\/.*\.(?:png|jpg))',
    address: '^[a-zA-Z0-9^,// ]{3,}$',
    duration: '^[0-9]{1,}$',
    timimg: '^[1-9]{1}[1-9]{0,1}[AaPp][Mm] - [1-9]{1}[1-9]{0,1}[AaPp][Mm]$',
    houseNo: '^[1-9]\\d*(?: ?(?:[a-z]|[/-] ?\\d+[a-z]?))?$',
    pincode: '^[1-9][0-9]{5}$',
    age: '^([4-5]|[1-5][0-9])$'
}

