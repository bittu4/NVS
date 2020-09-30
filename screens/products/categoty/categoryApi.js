import axios from 'axios'

class CategoryService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getCategoryUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/getchildcategory?cat_id=984`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getCategories() {
        try {
           return await axios.get(this.getCategoryUrl,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default CategoryService