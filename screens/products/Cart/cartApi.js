import axios from 'axios'

class CartService {
    baseUrl = process.env.REACT_APP_BASEURL;
    getCartListUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/checkout/viewcart`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getCartList(body, token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            return await axios.post(this.getCartListUrl, body, config);
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default CartService