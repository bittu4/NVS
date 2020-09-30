import axios from 'axios'

class HomeService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getSimpleProductListUrl='http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/catalog/view'
    getBannerListUrl='http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/homepagebanners';
    getRecentlyViewedUrl='http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/recentlyviewed?customer_id=9989';
    getproductListUrl = 'http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/bestsellerproduct?store_id=3&pagesize=100&currentpage=1&customer_id=9989';
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

    async getRecentlyViewedList() {
        try {
           return await axios.get(this.getRecentlyViewedUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async getBannerList() {
        try {
           return await axios.get(this.getBannerListUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async getSimpleProductList() {
        options = {
            headers: {
                'Content-Type': 'application/json',
            },
            body:{
                "prodID": "8711"
            }
        };
        try {
           return await axios.get(this.getBannerListUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }

    async getUserData() {
        try {
           return await axios.get(this.getBannerListUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }

}
export default HomeService