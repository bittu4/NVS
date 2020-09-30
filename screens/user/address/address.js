import React, { Component } from 'react';
import { Content, Container, View, Text, Input, Item, Icon, Button, Form, Picker, Drawer, Card, CardItem } from 'native-base';
import { addressStyle } from './addressStyle'
import AppHeader from '../../home/header/header'
import SideBar from '../../home/sideBar/sideBar'
import { connect } from 'react-redux'
import { addAddress } from '../../../store/actions/address'
import AddAddressService from './addAddress/addAddressApi'
import { AsyncStorage } from 'react-native';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined,
            addressList: []
        };
        this.getCountryList = this.getCountryList.bind(this);
        this.getAddressList = this.getAddressList.bind(this);
        this.addAddressService = new AddAddressService();
    }

    UNSAFE_componentWillMount = () => {
        for (let i = 0; i <= this.props.addressList.length; i++) {
            let countryName = this.props.countryList.find(obj => obj.value == this.props.addressList[0].country_id)
            console.log("countryanme", countryName)
        }
    }

    componentDidMount() {
        this.getCountryList();
        this.getAddressList();
        // if (this.props.isLoggedIn) {
        //     this.getAddressList();
        // }
    }

    async getCountryList() {
        let response = await this.addAddressService.getCountryList();
        if (response != null) {
            await this.setState({
                countryList: response.data[0].country.splice(1, 3)
            })
        }
        // this.props.getCountryList(response.data[0].country.splice(1, 3))
    }

    async getAddressList() {
        const value = await AsyncStorage.getItem('nvsToken');
        const customer_id = await AsyncStorage.getItem('customerId');
        console.log(value)
        let body = {
            "parameters": {
                "customer_id": customer_id
            }
        }
        let response = await this.addAddressService.getAddressList(body, value);
        console.log("address", response)
        if (response != null && response != undefined) {
            if (response.data[0].status == "1") {
                this.setState({
                    addressList: response.data[0].response.address
                })
                for (let i = 0; i < response.data[0].response.length; i++) {
                    this.props.add(response.data[0].response[i])
                }
            }
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
    }

    openDrawer = () => {
        this.drawer._root.open()
    };

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    handleAddressChange = (address) => {
        address.isUpdate = true
        this.props.navigation.navigate("AddAddress", { address: address })
    }

    render() {
        return (
            <Container>
                <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigation={this.props.navigation} />} onClose={() => this.closeDrawer()} >
                    <AppHeader onOpen={this.openDrawer} />
                    <Content>
                        <View style={{
                            flexDirection: 'row', alignContent: 'center', height: 60,
                            borderBottomColor: '#8cc63e', borderBottomWidth: 4, backgroundColor: 'white'
                        }}>
                            <Icon style={{ fontSize: 20, fontWeight: '700', marginLeft: '5%', marginTop: '5%' }} type="FontAwesome" name="arrow-left"
                                onPress={() => this.props.navigation.goBack()} />
                            <Text style={{ fontWeight: '900', fontSize: 22, marginLeft: '20%', marginTop: '3%' }}> My Addresses </Text>
                        </View>
                        <View style={addressStyle.topView}>
                            <Card style={{ width: '100%', height: 55 }} button
                                onPress={() => this.props.navigation.navigate('AddAddress')}>
                                <CardItem cardBody style={{ alignSelf: 'center' }} button
                                    onPress={() => this.props.navigation.navigate('AddAddress')} >
                                    <Icon style={{ fontSize: 30, marginTop: '3%' }} type="FontAwesome" name="plus" />
                                    <Text style={addressStyle.topText}>Add a new Address</Text>
                                </CardItem>
                            </Card>
                        </View>
                        {
                            this.state.addressList.map((address, index) =>
                                <View>
                                    <Card style={{ width: '100%', padding: 8 }}>
                                        <CardItem cardBody style={{ marginLeft: '7%', marginTop: '3%' }}>
                                            <View style={addressStyle.paymentHeading}>
                                                <Icon style={{ fontSize: 30, marginTop: '3%' }} type="FontAwesome" name="user-o" />
                                                <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>{address.firstname} {address.lastname}</Text>
                                                <Button rounded light
                                                    onPress={this.handleAddressChange.bind(this, address)}
                                                    style={{
                                                        height: 25,
                                                        marginTop: 8,
                                                        justifyContent: 'flex-end',
                                                        alignContent: 'flex-end',
                                                        backgroundColor: '#e6e6e6',
                                                    }}>
                                                    <Text>Change</Text>
                                                </Button>
                                            </View>
                                        </CardItem>
                                        <CardItem cardBody style={{ marginLeft: '15%' }}>
                                            <View>
                                                <Text>{address.street}</Text>
                                                <Text>{address.city} </Text>
                                                <Text>{address.postcode}</Text>
                                                <Text>{address.region}</Text>
                                                <Text>{address.country}</Text>
                                                <Text>{address.phone}</Text>
                                            </View>
                                        </CardItem>
                                    </Card>
                                </View>
                            )
                        }
                    </Content>
                </Drawer>
            </Container >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addressList: state.addressReducer.addressList,
        countryList: state.addressReducer.countryList,
        isLoggedIn: state.authReducer.isLoggedin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (address) => dispatch(addAddress(address)),
        getCountryList: (countries) => dispatch(getCountryList(countries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)