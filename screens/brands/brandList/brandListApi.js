import axios from 'axios'

class BrandListService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getBrandListUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/getbranddata`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getBrandList(body) {
        try {
           return await axios.post(this.getBrandListUrl,body,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default BrandListService