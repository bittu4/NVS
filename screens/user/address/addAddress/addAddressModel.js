export class AddressModel {
    constructor(customerId, firstname, lastname, street, city, region_id, region, country_id, postcode, telephone,
         shippingaddress, billingaddress, company,isUpdate,addressId) {
        this.customerId=customerId;
        this.firstname=firstname;
        this.lastname=lastname;
        this.street=street;
        this.city=city;
        this.region_id=region_id;
        this.region=region;
        this.country_id=country_id;
        this.postcode=postcode;
        this.telephone=telephone;
        this.shippingaddress=shippingaddress;
        this.billingaddress=billingaddress;
        this.company=company;
        this.isUpdate=isUpdate;
        this.addressId=addressId
    }
    customerId=0;
        firstname='';
        lastname='';
        street='';
        city='';
        region_id='';
        region='';
        country_id='';
        postcode='';
        telephone='';
        shippingaddress=0;
        billingaddress=0;
        company='';
        isUpdate=false;
        addressId=0

}

export default AddressModel;