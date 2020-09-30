import React, { Component } from 'react';
import { Content, Container, View, Text, Icon, Drawer, Card, CardItem, Button, Spinner, Picker, Form } from 'native-base';
import AppHeader from '../../home/header/header'
import SideBar from '../../home/sideBar/sideBar'
import { connect } from 'react-redux'
import { checkOutStyle } from './checkOutStyle'
import Carousel from 'react-native-snap-carousel';
import { Image, Dimensions } from 'react-native';
import { addressStyle } from '../../user/address/addressStyle'
import CheckoutService from './checkoutApi'
import { AsyncStorage } from 'react-native';
import cart from '../Cart/cart';
// import WebViewBraintree from 'react-native-webview-braintree';

const windoWidth = Dimensions.get('window').width
const sliderWidth = Math.round(windoWidth);
const itemWidth = Math.round(windoWidth) - 250;

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            isAddressAvilable: this.props.addressList.length > 0 ? true : false,
            payments: [],
            shipping: [],
            selectedShipping: "key0",
            selectedPayment: "key0",
            cartItems: [],
            clientToken: '',
            paymentAPIResponse: '',
            adminToken:''
        };
        this.checkOutService = new CheckoutService();
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    }

    getAdminToken = async () => {
        let body = { "username": "bws", "password": "gRATeInT@D76" }
        let response = await this.checkOutService.getAdminToken(body);
        if (response != null && response != undefined) {
            this.setState({
                adminToken:response
            })
        }
        console.log("adminToken",response)
    }

    getBraintreeToken = async () => {
        let response = await this.checkOutService.getBriantreeToken(this.state.adminToken);
        if (response != null && response != undefined) {
            this.setState({
                clientToken:response
            })
        }
        console.log("braintree",response)
    }

    handlePaymentMethod = nonce => {
        // make api call to purchase the item using the nonce received
        // from BraintreeWebView Component
        console.log("-------handlePaymentMethod-------");
        console.log(`nonce: ${nonce}`);
        console.log(`totalPrice: ${cart.totalPrice}`);
        brainTreeUtils
            .postPurchase(nonce, cart.totalPrice, {})
            .then(response => {
                console.log({ response });
                if (response.type === 'success') {
                    this.setState({ paymentAPIResponse: 'PAYMENT_SUCCESS' });
                    console.log('Payment was successful.');
                } else {
                    this.setState({ paymentAPIResponse: 'PAYMENT_REJECTED' });
                }
            });
    };

    purchaseCompleteCallback = response => {
        console.log('purchaseCompleteCallback');
    };

    async handleShippingChange(value) {
        this.setState({
            selectedShipping: value
        });
        const toekn = await AsyncStorage.getItem('nvsToken');
        let selectedShippingMethod = this.state.shipping.filter(obj => obj.method_code == value)
        let body = {
            "addressInformation": {
                "shipping_address": {
                    "region": this.state.shippingAddress.region,
                    "region_id": this.state.shippingAddress.region_id,
                    "region_code": this.state.shippingAddress.region_code,
                    "country_id": this.state.shippingAddress.country_id,
                    "street": [
                        this.state.shippingAddress.street
                    ],
                    "postcode": this.state.shippingAddress.postcode,
                    "city": this.state.shippingAddress.city,
                    "firstname": this.state.shippingAddress.firstname,
                    "lastname": this.state.shippingAddress.lastname,
                    "email": this.state.shippingAddress.email,
                    "telephone": this.state.shippingAddress.telephone
                },
                "billing_address": {
                    "region": this.state.billingAddress.region,
                    "region_id": this.state.billingAddress.region_id,
                    "region_code": this.state.billingAddress.region_code,
                    "country_id": this.state.billingAddress.country_id,
                    "street": [
                        this.state.billingAddress.street
                    ],
                    "postcode": this.state.billingAddress.postcode,
                    "city": this.state.billingAddress.city,
                    "firstname": this.state.billingAddress.firstname,
                    "lastname": this.state.billingAddress.lastname,
                    "email": this.state.billingAddress.email,
                    "telephone": this.state.billingAddress.telephone
                },
                "shipping_carrier_code": selectedShippingMethod[0].carrier_code,
                "shipping_method_code": selectedShippingMethod[0].method_code
            }
        }
        let response = await this.checkOutService.getShippingInfo(body, toekn);
        if (response != null && response != undefined) {
            if (response.status == 200) {
                await this.setState({
                    payments: response.data.payment_methods,
                    subTotal: response.data.totals.base_subtotal,
                    grandTotal: response.data.totals.base_grand_total,
                    shippingCharge: response.data.totals.base_shipping_amount
                })
            }
        }
    }

    handlePaymentChange = (value) => {
        this.setState({
            selectedPayment: value
        });
    }

    componentDidMount = () => {
        //this.getOrderOverview();
        this.getAdminToken();
        this.getBraintreeToken();
        this.getCustomerAddress();
    }

    UNSAFE_componentWillMount = () => {
        // this.setState({
        //     isAddressAvilable: this.props.addressList.length > 0 ? true : false
        // })
        //this.getPaymentOptions();

    }

    async getCustomerAddress() {
        const customer_id = await AsyncStorage.getItem('customerId');
        const toekn = await AsyncStorage.getItem('nvsToken');
        let body = {
            "parameters": {
                "customer_id": customer_id,
            }
        };
        let response = await this.checkOutService.getCustomerAddress(body, toekn);
        if (response != null && response != undefined) {
            if (response.data[0].status == 1) {
                await this.setState({
                    billingAddress: response.data[0].response.address.filter(obj => obj.address_id == response.data[0].response.billing_address_id)[0],
                    shippingAddress: response.data[0].response.address.filter(obj => obj.address_id == response.data[0].response.shipping_address_id)[0],
                    isAddressAvilable: true
                })
                this.getShippingMethods();
            }
        }
    }

    async getPaymentOptions() {
        const customer_id = await AsyncStorage.getItem('customerId');
        let body = {
            "parameters": {
                "customer_id": customer_id,
            }
        };
        let response = await this.checkOutService.getPaymentOptions(body);
        if (response != null && response != undefined) {
            if (response.data[0].status == 1) {
                await this.setState({
                    payments: response.data[0].payments,
                    shipping: response.data[0].shipping
                })
            }
        }
    }

    async getShippingMethods() {
        const toekn = await AsyncStorage.getItem('nvsToken');
        const customer_id = await AsyncStorage.getItem('customerId');
        let sameAsBilling = this.state.shippingAddress.address_id == this.state.billingAddress.address_id ? 1 : 0;
        let body =
        {
            "address": {
                "region": this.state.shippingAddress.region,
                "region_id": this.state.shippingAddress.region_id,
                "region_code": this.state.shippingAddress.region_code,
                "country_id": this.state.shippingAddress.country_id,
                "street": [
                    this.state.shippingAddress.street
                ],
                "postcode": this.state.shippingAddress.postcode,
                "city": this.state.shippingAddress.city,
                "firstname": this.state.shippingAddress.firstname,
                "lastname": this.state.shippingAddress.lastname,
                "customer_id": customer_id,
                "email": this.state.shippingAddress.email,
                "telephone": this.state.shippingAddress.email,
                "same_as_billing": sameAsBilling
            }
        }
        let response = await this.checkOutService.getShippingMethod(toekn, body);
        if (response != null && response != undefined) {
            if (response.status == 200) {
                await this.setState({
                    shipping: response.data
                })
            }
        }
    }

    async getOrderOverview() {
        const customer_id = await AsyncStorage.getItem('customerId');
        const cartID = await AsyncStorage.getItem('cartId');
        const toekn = await AsyncStorage.getItem('nvsToken');
        let body = {
            "parameters": {
                "customer_id": customer_id,
                "cart_id": cartID
            }
        }
        let response = await this.checkOutService.getOrderOverView(body, toekn);
        if (response != null && response != undefined) {
            let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
            for (let i = 0; i <= response.data[0].response.items.length; i++) {
                try {
                    response.data[0].response.items[i].image = basicUri.concat(response.data[0].response.items[i].image);
                }
                catch (err) { }
            }
            if (response.data[0].status == 1) {
                await this.setState({
                    billingaddress: response.data[0].response.billingaddress,
                    shippingAddress: response.data[0].response.shippigaddress,
                    cartItems: response.data[0].response.items,
                    subTotal: response.data[0].response.total[2].value,
                    shippingCharge: response.data[0].response.total[0].value,
                    grandTotal: response.data[0].response.total[4].value,
                    isAddressAvilable: true
                })
            }
        }
    }

    async handlePlaceOrder() {
        const customer_id = await AsyncStorage.getItem('customerId');
        const cartID = await AsyncStorage.getItem('cartId');
        const toekn = await AsyncStorage.getItem('nvsToken');
        let body = {
            paymentMethod: {
                method: "cashondelivery"
            },
            billing_address: {
                email: this.state.billingAddress.email == undefined ? '' : this.state.billingAddress.email,
                region: this.state.billingAddress.region == undefined ? '' : this.state.billingAddress.region,
                region_id: this.state.billingAddress.region_id == undefined ? '' : this.state.billingAddress.region_id,
                region_code: this.state.billingAddress.region_code == undefined ? '' : this.state.billingAddress.region_code,
                country_id: this.state.billingAddress.country_id == undefined ? '' : this.state.billingAddress.country_id,
                street: [
                    this.state.billingAddress.street == undefined ? '' : this.state.billingAddress.street
                ],
                postcode: this.state.billingAddress.postcode == undefined ? '' : this.state.billingAddress.postcode,
                city: this.state.billingAddress.city == undefined ? '' : this.state.billingAddress.city,
                telephone: this.state.billingAddress.telephone == undefined ? '' : this.state.billingAddress.telephone,
                firstname: this.state.billingAddress.firstname == undefined ? '' : this.state.billingAddress.firstname,
                lastname: this.state.billingAddress.lastname == undefined ? '' : this.state.billingAddress.lastname
            }
        };
        let response = await this.checkOutService.placeOrder(body, toekn);
        if (response != null && response != undefined) {
            if (response.data[0].status == 1) {
                this.setState({

                })
            }
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
    }

    openDrawer = () => {
        this.drawer._root.open()
    }

    _renderItem({ item }) {
        return (
            <View style={{
                backgroundColor: 'white',
                height: 200,
                width: 150,
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
                padding: 20
            }}>
                <Image source={{ uri: item.image }} style={{ flex: 1, width: '100%' }} />
            </View>

        )
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
                    <Content style={{ backgroundColor: '#eeeeee' }}>
                        <View style={{
                            flexDirection: 'row', alignContent: 'center', height: 60,
                            borderBottomColor: '#8cc63e', borderBottomWidth: 4, backgroundColor: 'white'
                        }}>
                            <Icon style={{ fontSize: 20, fontWeight: '700', marginLeft: '5%', marginTop: '5%' }} type="FontAwesome" name="arrow-left"
                                onPress={() => this.props.navigation.goBack()} />
                            <Text style={{ fontWeight: '900', fontSize: 22, marginLeft: '20%', marginTop: '3%' }}> Checkout </Text>
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            <View>
                                <Card style={{ width: '100%', padding: 8 }}>
                                    <CardItem cardBody style={{ marginLeft: '7%', }}>
                                        <View style={checkOutStyle.paymentHeading}>
                                            <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>My Cart Items</Text>
                                            <Button rounded light style={{
                                                height: 25,
                                                marginTop: 8,
                                                justifyContent: 'flex-end',
                                                alignContent: 'flex-end',
                                                backgroundColor: '#e6e6e6',
                                            }}>
                                                <Text>View All</Text>
                                            </Button>
                                        </View>
                                    </CardItem>
                                </Card>
                                <View style={{ backgroundColor: '#eeeee' }}>
                                    {
                                        this.state.cartItems.length > 0 ?
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                                                <Carousel
                                                    layout={"default"}
                                                    ref={ref => this.carousel = ref}
                                                    data={this.state.cartItems}
                                                    sliderWidth={sliderWidth}
                                                    itemWidth={itemWidth}
                                                    renderItem={this._renderItem}
                                                    onSnapToItem={index => this.setState({ activeIndex: index })} />
                                            </View>
                                            :
                                            <Spinner />
                                    }
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={addressStyle.topView}>
                                <Card style={{ width: '100%', height: 55 }} >
                                    <CardItem cardBody style={{ alignSelf: 'center' }}>
                                        <Icon style={{ fontSize: 30, marginTop: '3%' }} type="FontAwesome" name="plus" />
                                        <Text style={addressStyle.topText}>Discount Code</Text>
                                    </CardItem>
                                </Card>
                            </View>
                        </View>
                        <View>
                            {
                                this.state.isAddressAvilable === false ?
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
                                    :
                                    <View>
                                        <View>
                                            <Card style={{ width: '100%', padding: 8 }}>
                                                <Text style={{ marginLeft: '13%', fontWeight: 'bold' }}> Delivery Address </Text>
                                                <CardItem cardBody style={{ marginLeft: '7%' }}>
                                                    <View style={checkOutStyle.paymentHeading}>
                                                        <Icon style={{ fontSize: 30, marginTop: '3%' }} type="FontAwesome" name="user-o" />
                                                        <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>{this.state.shippingAddress.firstname} {this.state.shippingAddress.lastname}</Text>
                                                        <Button rounded light
                                                            onPress={this.handleAddressChange.bind(this, this.state.shippingAddress)}
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
                                                        <Text>{this.state.shippingAddress.street}</Text>
                                                        <Text>{this.state.shippingAddress.city} </Text>
                                                        <Text>{this.state.shippingAddress.postcode}</Text>
                                                        <Text>{this.state.shippingAddress.region}</Text>
                                                        <Text>{this.state.shippingAddress.country}</Text>
                                                        <Text>{this.state.shippingAddress.phone}</Text>
                                                    </View>
                                                </CardItem>
                                            </Card>
                                        </View>
                                        <Card style={{ width: '100%', padding: 8 }}>
                                            <Text style={{ marginLeft: '13%', fontWeight: 'bold' }}> Billing Address </Text>
                                            <CardItem cardBody style={{ marginLeft: '7%' }}>
                                                <View style={checkOutStyle.paymentHeading}>
                                                    <Icon style={{ fontSize: 30, marginTop: '3%' }} type="FontAwesome" name="user-o" />
                                                    <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>{this.state.billingAddress.firstname} {this.state.billingAddress.lastname}</Text>
                                                    <Button rounded light
                                                        onPress={this.handleAddressChange.bind(this, this.state.billingAddress)}
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
                                                    <View>
                                                        <Text>{this.state.billingAddress.street}</Text>
                                                        <Text>{this.state.billingAddress.city} </Text>
                                                        <Text>{this.state.billingAddress.postcode}</Text>
                                                        <Text>{this.state.billingAddress.region}</Text>
                                                        <Text>{this.state.billingAddress.country}</Text>
                                                        <Text>{this.state.billingAddress.phone}</Text>
                                                    </View>
                                                </View>
                                            </CardItem>
                                        </Card>

                                    </View>
                            }
                        </View>
                        <View>
                            <Card style={{ width: '100%', padding: 8 }}>
                                <CardItem cardBody style={{ marginLeft: '7%', }}>
                                    <View style={checkOutStyle.paymentHeading}>
                                        <Text style={{ width: '40%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>Delivery Options</Text>
                                        {/* <Button rounded light style={{
                                            height: 25,
                                            marginTop: 8,
                                            justifyContent: 'flex-end',
                                            alignContent: 'flex-end',
                                            backgroundColor: '#e6e6e6',
                                        }}>
                                            <Text>Change</Text>
                                        </Button> */}
                                        <Form style={{ width: '60%' }}>
                                            <Picker
                                                mode="dropdown"
                                                placeholder="Select One"
                                                placeholderStyle={{ color: "#0f0f0f" }}
                                                note={true}
                                                selectedValue={this.state.selectedShipping}
                                                onValueChange={this.handleShippingChange.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                                <Picker.Item label="Select Options" value="key0" />
                                                {
                                                    this.state.shipping.map((ship, index) =>
                                                        <Picker.Item key={index} label={ship.carrier_title} value={ship.method_code} />
                                                    )
                                                }
                                            </Picker>
                                        </Form>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>
                        <View>
                            <Card style={{ width: '100%', padding: 8 }}>
                                <CardItem cardBody style={{ marginLeft: '7%', }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ width: '40%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>Payment Type</Text>
                                        {/* <Button rounded light style={{
                                            height: 25,
                                            marginTop: 8,
                                            justifyContent: 'flex-end',
                                            alignContent: 'flex-end',
                                            backgroundColor: '#e6e6e6',
                                        }}>
                                            <Text>Change</Text>
                                        </Button> */}
                                        <Form style={{ width: '60%' }}>
                                            <Picker
                                                mode="dropdown"
                                                placeholder="Select One"
                                                placeholderStyle={{ color: "#0f0f0f" }}
                                                note={true}
                                                selectedValue={this.state.selectedPayment}
                                                onValueChange={this.handlePaymentChange.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                                <Picker.Item label="Select payment Type" value="key0" />
                                                {
                                                    this.state.payments.map((payment, index) =>
                                                        <Picker.Item label={payment.title} value={payment.code} />
                                                    )
                                                }
                                            </Picker>
                                        </Form>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>

                        <View>
                            <Card style={{ width: '100%', padding: 8 }}>
                                <CardItem cardBody style={{ marginLeft: '7%', }}>
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%' }}>Subtotal</Text>
                                            <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%' }}>{this.state.subTotal}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                                            <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%' }}>Shipping and Handling(Flat Rate Fixed)</Text>
                                            <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%' }}>{this.state.shippingCharge}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                                            <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>Grand Total</Text>
                                            <Text style={{ width: '60%', alignSelf: 'center', marginLeft: '1%', fontWeight: 'bold' }}>{this.state.grandTotal}</Text>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={{ justifyContent: 'center', padding: 20 }}>
                            <Button rounded success style={{ justifyContent: 'center', backgroundColor: '#006d50' }}
                                onPress={this.handlePlaceOrder.bind(this)}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>Place Order</Text>
                            </Button>
                        </View>
                        {/* <WebViewBraintree
                            clientToken={this.state.clientToken}
                            nonceObtainedCallback={this.handlePaymentMethod}
                            navigationBackCallback={this.navigationBackCallback}
                            paymentAPIResponse={this.state.paymentAPIResponse}
                        /> */}
                    </Content>
                </Drawer>
            </Container >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addressList: state.addressReducer.addressList,
        products: state.cartReducer.cartList
    }
}

export default connect(mapStateToProps, null)(Checkout)