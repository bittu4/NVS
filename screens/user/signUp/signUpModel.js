export class SignUpModel {
    constructor(email, password, firstname, lastname, is_subscribed, store_id, gender, dob,confirmPassword) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.is_subscribed = is_subscribed;
        this.store_id = store_id;
        this.gender = gender;
        this.dob = dob;
        this.confirmPassword=confirmPassword
    }
    email = '';
    password = '';
    firstname = '';
    lastname = '';
    is_subscribed = 0;
    store_id = 3;
    gender = 0;
    dob = '';
    confirmPassword='';

}

export default SignUpModel;