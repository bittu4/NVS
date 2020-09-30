import axios from 'axios'

class ProductApi{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getProductByIdUrl='http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/catalog/view/'
    getAddToCartURL='http://m2.nvspharmacy.co.uk/rest/V1/carts/mine/items'
    getQuoteURL='http://m2.nvspharmacy.co.uk/rest/V1/carts/mine'
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getProductById(body) {
        try {
           return await axios.post(this.getProductByIdUrl,body,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async addProductToCart(body,token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
           return await axios.post(this.getAddToCartURL,body,config);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async GetQuoteId(token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
           return await axios.get(this.getQuoteURL,config);
        }
        catch (error) {
            console.log(error); 
        }
    }

    
}
export default ProductApi