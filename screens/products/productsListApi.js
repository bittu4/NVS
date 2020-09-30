import axios from 'axios'

class ProductService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getproductListUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/catalog/products`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getProductList(body) {
        try {
           return await axios.post(this.getproductListUrl,body,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default ProductService