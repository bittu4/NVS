import axios from 'axios'

class RecentlyViewedService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getRecentlyViewedUrl='http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/recentlyviewed?customer_id=0';
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getRecentlyViewedList() {
        try {
           return await axios.get(this.getRecentlyViewedUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default RecentlyViewedService