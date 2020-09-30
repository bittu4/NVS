import { Add_Address,Remove_Address,Country_List } from './types'

export const addAddress = (address) => (
    {
        type: Add_Address,
        data: address,
        key:address.id,  
    }
);

export const removeAddress = (key) => (
    {
        type: deleteProduct,
        key: key
    }
);

export const getCountryList = (data) => (
    {
        type: Country_List,
        data: data
    }
);