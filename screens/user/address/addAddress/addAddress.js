import React, { Component } from 'react';
import { Content, Container, View, Text, Input, Item, Icon, Button, Form, Picker, Drawer, Card, CardItem, CheckBox, Body, ListItem } from 'native-base';
import { addAddressStyle } from './addAddressStyle'
import AppHeader from '../../../home/header/header'
import SideBar from '../../../home/sideBar/sideBar'
import AddressModel from './addAddressModel'
import AddAddressService from './addAddressApi'
import { connect } from 'react-redux'
import { addAddress, getCountryList } from '../../../../store/actions/address'
import { AsyncStorage } from 'react-native';

class AddAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined,
            model: new AddressModel(0, '', '', '', '', '', '', '', '', '', false, false, '', false, 0),
            countryList: [],
            country: []
        };
        this.addAddressService = new AddAddressService();
        this.getCountryList = this.getCountryList.bind(this);
    }

    async UNSAFE_componentWillMount() {
        debugger
        this.getCountryList();
        try {
            await this.setState({
                model: new AddressModel(this.props.route.params.address.address.customerId, this.props.route.params.address.address.firstname,
                    this.props.route.params.address.address.lastname, this.props.route.params.address.address.street,
                    this.props.route.params.address.address.city, this.props.route.params.address.address.region_id,
                    this.props.route.params.address.address.region, this.props.route.params.address.address.country_id,
                    this.props.route.params.address.address.postcode, this.props.route.params.address.address.telephone,
                    this.props.route.params.address.address.shippingaddress, this.props.route.params.address.address.billingaddress,
                    this.props.route.params.address.address.company, this.props.route.params.address.address.isUpdate,
                    this.props.route.params.address.address.addressId)
            })
        }
        catch (err) {

        }
        if (!this.state.model.isUpdate) {
            this.setState(prevState => ({
                model: {
                    ...prevState.model,
                    addressId: this.getRandomInt(100, 1000),
                    isUpdate: true
                }
            }))
        }

    }

    closeDrawer = () => {
        this.drawer._root.close()
    }

    openDrawer = () => {
        this.drawer._root.open()
    }

    handleCountryChange(value) {
        this.setState({
            country: value
        });
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                country_id: value
            }
        }))
    }

    handleFirstNameChange = (event) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                firstname: event
            }
        }))
    }

    handleLatsNameChange = (event) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                lastname: event
            }
        }))
    }

    handleMobileChange = (event) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                telephone: event
            }
        }))
    }

    handleStreetChange = (event) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                street: event
            }
        }))
    }

    handleCityChange = (event) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                city: event
            }
        }))
    }

    handleRegionChange = (event) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                region: event
            }
        }))
    }

    handlePostelChange = (event) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                postcode: event
            }
        }))
    }

    handleDeliveryhange = (event) => {
        if (this.state.shippingaddress) {
            this.setState(prevState => ({
                model: {
                    ...prevState.model,
                    shippingaddress: false
                }
            }))
        }
        else {
            this.setState(prevState => ({
                model: {
                    ...prevState.model,
                    shippingaddress: true
                }
            }))
        }
    }

    handleBillingChange = (event) => {
        if (this.state.billingaddress) {
            this.setState(prevState => ({
                model: {
                    ...prevState.model,
                    billingaddress: false
                }
            }))
        }
        else {
            this.setState(prevState => ({
                model: {
                    ...prevState.model,
                    billingaddress: true
                }
            }))
        }
    }

    async getCountryList() {
        let response = await this.addAddressService.getCountryList();
        if (response != null) {
            await this.setState({
                countryList: response.data[0].country.splice(1, 3)
            })
        }
        this.props.getCountryList(response.data[0].country.splice(1, 3))
    }

    async handleAddAddress () {
        const customer_id = await AsyncStorage.getItem('customerId');
        const cartID = await AsyncStorage.getItem('cartId');
        const toekn = await AsyncStorage.getItem('nvsToken');
        let body = {
            "parameters": {
                "customer_id": customer_id,
                "firstname": this.state.model.firstname,
                "lastname": this.state.model.lastname,
                "street": this.state.model.street,
                "city": this.state.model.city,
                "region_id": 1,
                "region": this.state.model.region,
                "country_id": this.state.model.country_id,
                "postcode": this.state.model.postcode,
                "telephone": this.state.model.telephone,
                "shippingaddress": this.state.model.shippingaddress == true ? "1" : "0",
                "billingaddress": this.state.model.billingaddress== true ? "1" : "0" ,
                "company": this.state.model.company
            }
        }
        console.log("addressBody",body)
        console.log("addressToken",toekn)
        let response = await this.addAddressService.addCustomerAddress(body, toekn);
        console.log("address",response);
        this.props.add(this.state.model)
        this.props.navigation.goBack()
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        return (
            <Container>
                <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigation={this.props.navigation} />} onClose={() => this.closeDrawer()} >
                    <AppHeader onOpen={this.openDrawer} />
                    <Content style={{ backgroundColor: '#eeeeee' }}>
                        <View style={{
                            flexDirection: 'row', alignContent: 'center', height: 60,
                            borderBottomColor: '#8cc63e', borderBottomWidth: 4, backgroundColor: 'white'
                        }}>
                            <Icon style={{ fontSize: 20, fontWeight: '700', marginLeft: '5%', marginTop: '5%' }} type="FontAwesome" name="arrow-left"
                                onPress={() => this.props.navigation.goBack()} />
                            <Text style={{ fontWeight: '900', fontSize: 22, marginLeft: '20%', marginTop: '3%' }}> Add Address </Text>
                        </View>
                        <View style={{ justifyContent: 'center', marginTop: '10%' }}>
                            <Card style={{ padding: 20 }}>
                                <Text style={{ marginBottom: '2%', fontWeight: 'bold' }}>Contact Details</Text>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='First Name' value={this.state.model.firstname} onChangeText={this.handleFirstNameChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='Last Name' value={this.state.model.lastname} onChangeText={this.handleLatsNameChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='Mobile' keyboardType="number-pad" value={this.state.model.telephone} onChangeText={this.handleMobileChange.bind(this)} />
                                </Item>
                            </Card>
                        </View>

                        <View style={{ justifyContent: 'center' }}>
                            <Card style={{ padding: 20 }}>
                                <Text style={{ marginBottom: '2%', fontWeight: 'bold' }}>Address Details</Text>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined, borderColor: 'black', borderRadius: '1px' }}
                                        placeholder="Select Country"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.country}
                                        onValueChange={this.handleCountryChange.bind(this)}
                                    >
                                        <Picker.Item label="-- Select Country --" value="0" />
                                        {
                                            this.state.countryList.map((name, i) =>
                                                <Picker.Item key={i} label={name.label} value={name.value} />
                                            )
                                        }
                                    </Picker>
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='Street' value={this.state.model.street} onChangeText={this.handleStreetChange.bind(this)} />
                                </Item>
                                {/* <Item regular style={{ marginTop: '5%' }}>
                                    <Input value={this.state.model.firstname} />
                                </Item> */}
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='Town/ City' value={this.state.model.city} onChangeText={this.handleCityChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='Region' value={this.state.model.region} onChangeText={this.handleRegionChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='PostCode' value={this.state.model.postcode} onChangeText={this.handlePostelChange.bind(this)} />
                                </Item>
                                <ListItem>
                                    <CheckBox checked={this.state.model.shippingaddress} onPress={this.handleDeliveryhange.bind(this)} />
                                    <Body>
                                        <Text>Set as your default delivery address</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CheckBox checked={this.state.model.billingaddress} onPress={this.handleBillingChange.bind(this)} />
                                    <Body>
                                        <Text>Set as your default billing address</Text>
                                    </Body>
                                </ListItem>
                            </Card>
                        </View>

                        <View style={{ justifyContent: 'center', padding: 20 }}>
                            <Button rounded success style={{ justifyContent: 'center', backgroundColor: '#8cc63e' }}
                                onPress={this.handleAddAddress.bind(this)}>
                                <Text style={addAddressStyle.signUpText}>Save Address</Text>
                            </Button>
                        </View>
                    </Content>
                </Drawer>
            </Container >
        );
    }


}

const mapStateToProps = (state) => {
    return {
        addressList: state.addressReducer.addressList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (address) => dispatch(addAddress(address)),
        getCountryList: (countries) => dispatch(getCountryList(countries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress)