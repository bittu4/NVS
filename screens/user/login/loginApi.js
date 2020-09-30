import axios from 'axios'

class LoginService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getLoginUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/customer/login`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async loginUser(body) {
        try {
           return await axios.post(this.getLoginUrl,body,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default LoginService