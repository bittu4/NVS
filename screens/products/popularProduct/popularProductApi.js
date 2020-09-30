import axios from 'axios'

class PopularProductService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getproductListUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/bestsellerproduct?store_id=3&pagesize=100&currentpage=1&customer_id=9989`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getProductList() {
        try {
           return await axios.get(this.getproductListUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default PopularProductService