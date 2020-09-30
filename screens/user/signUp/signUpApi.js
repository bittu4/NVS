import axios from 'axios'

class SignUpService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getGenderListUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/customer/genderlist`;
    getGenderListUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/customer/register`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getGenderList() {
        try {
           return await axios.post(this.getGenderListUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async registerUser(body) {
        try {
           return await axios.post(this.getGenderListUrl,body,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default SignUpService