import axios from 'axios'

class CheckoutService {
    baseUrl = process.env.REACT_APP_BASEURL;
    getpaymentUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/checkout/getshippingpayament`;
    getOverviewUrl = 'http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/orderreview'
    getplaceOrderUrl = 'http://m2.nvspharmacy.co.uk/rest/V1/carts/mine/payment-information/'
    getShippingMethodUrl = 'http://m2.nvspharmacy.co.uk/rest/V1/carts/mine/estimate-shipping-methods'
    getCustomerAddressUrl = 'http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/customer/address'
    getShippingInfoUrl = 'http://m2.nvspharmacy.co.uk/rest/V1/carts/mine/shipping-information'
    getBraintreeTokenUrl="http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/braintree/token"
    getAdminTokenUrl="http://m2.nvspharmacy.co.uk/rest/V1/integration/admin/token"
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    async getShippingInfo(body, token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            return await axios.post(this.getShippingInfoUrl, body, config);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getCustomerAddress(body, token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            return await axios.post(this.getCustomerAddressUrl, body, config);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getShippingMethod(token, body) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            return await axios.post(this.getShippingMethodUrl, body, config);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getPaymentOptions(body) {
        try {
            return await axios.post(this.getpaymentUrl, body, this.options);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getOrderOverView(body, token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            return await axios.post(this.getOverviewUrl, body, config);
        }
        catch (error) {
            console.log(error);
        }
    }

    async placeOrder(body, token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            return await axios.post(this.getplaceOrderUrl, body, config);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getBriantreeToken(token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            return await axios.get(this.getBraintreeTokenUrl);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAdminToken(body) {
        try {
            return await axios.post(this.getAdminTokenUrl, body, this.options);
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default CheckoutService