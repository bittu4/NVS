import axios from 'axios'

class SubCategoryService{
    baseUrl = process.env.REACT_APP_BASEURL ;
    getSubCategoryUrl = `http://m2.nvspharmacy.co.uk/rest/V1/mobileapp/getchildcategory`;
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    async getSubCategory(body) {
        try {
           return await axios.get(this.getSubCategoryUrl,body,this.options);
        }
        catch (error) {
            console.log(error); 
        }
    }
}
export default SubCategoryService