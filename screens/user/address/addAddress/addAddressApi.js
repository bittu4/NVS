import axios from 'axios'
class AddAddressService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getcountryListUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/getcountry`;
    getAddressListUrl='http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/customer/address';
    getAddCustomerUrl='http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/customer/saveaddress';
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getCountryList() {
        try {
           return await axios.get(this.getcountryListUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async getAddressList(body,token) {
        // let options = {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
           return await axios.post(this.getAddressListUrl,body,config);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async addCustomerAddress(body,token) {
        // let options = {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
           return await axios.post(this.getAddCustomerUrl,body,config);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default AddAddressService