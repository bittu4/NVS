import React from 'react'
import { Container, View, Text, Spinner, Drawer, Icon, Button, Content } from 'native-base'
import { SafeAreaView, FlatList, StyleSheet, Image } from 'react-native'
import AppHeader from '../../home/header/header'
import SideBar from '../../home/sideBar/sideBar'
import { connect } from 'react-redux'
import { deleteProduct } from '../../../store/actions/cart'
import CartItem from './cartItem'
import CartService from './cartApi'
import { AsyncStorage } from 'react-native';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.cartService = new CartService();
    }

    componentDidMount() {
        this.getCartList();
    }

    async getCartList() {
        const customer_id = await AsyncStorage.getItem('customerId');
        const cartID = await AsyncStorage.getItem('cartId');
        const toekn = await AsyncStorage.getItem('nvsToken');
        let body = {
            "parameters": {
                "customer_id": customer_id,
                "cart_id": cartID
            }
        }
        let response = await this.cartService.getCartList(body, toekn);
        console.log("cart ", response)
        if (response != null && response != undefined) {
            if (response.data[0].status == 1) {
                let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
                for (let i = 0; i <= response.data[0].response.products.length; i++) {
                    try {
                        response.data[0].response.products[i].image = basicUri.concat(response.data[0].response.products[i].image);
                    }
                    catch (err) { }
                }
                this.setState({
                    products: response.data[0].response.products
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

    render() {
        return (
            <Container>
                <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigation={this.props.navigation} />} onClose={() => this.closeDrawer()} >
                    <AppHeader onOpen={this.openDrawer} style={{ marginbottom: '5%' }} />
                    <Content>
                        <View style={{ paddingTop: '3%', paddingBottom: '3%' }}>
                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                <Icon style={{ fontSize: 30, marginLeft: '5%' }} type="FontAwesome" name="times"
                                    onPress={() => this.props.navigation.goBack()} />
                                <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: '20%' }}> Shopping Cart </Text>
                            </View>
                            <View style={{ marginTop: '5%' }}>
                                <SafeAreaView>
                                    {
                                        this.state.products.length > 0 ?
                                            <View >
                                                <FlatList
                                                    data={this.state.products}
                                                    renderItem={({ item }) => <CartItem product={item} navigation={this.props.navigation} />}
                                                    horizontal={false}
                                                    initialNumToRender={10}
                                                    windowSize={10}
                                                />
                                            </View>
                                            :
                                            this.state.loading ? <Spinner /> : <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                                <Text >No Products found</Text></View>
                                    }
                                </SafeAreaView>
                            </View>
                            <View style={{ marginTop: '3%', paddingLeft: '8%', paddingRight: '8%' }}>
                                <Button rounded success onPress={() => this.props.navigation.navigate('CheckOut')}
                                    style={{ justifyContent: "center", backgroundColor: '#006d50', marginTop: '4%' }} >
                                    <Text>CHECKOUT</Text>
                                </Button>
                                <Button rounded success
                                    style={{ justifyContent: "center", backgroundColor: '#272727', marginTop: '4%' }} >
                                    <Text>APPLE PAY</Text>
                                </Button>
                                <Button rounded success
                                    style={{ justifyContent: "center", backgroundColor: '#056ebA', marginTop: '4%' }} >
                                    <Text>PAYPAL</Text>
                                </Button>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Text onPress={() => this.props.navigation.navigate('Category')}
                                    style={{ textDecorationLine: 'underline', textAlign: 'center', marginTop: '5%' }}>Continue Shopping </Text>
                                <Icon style={{ fontSize: 25, marginLeft: '1%', alignSelf: 'center', marginTop: '5%' }} type="FontAwesome" name="chevron-right"
                                    onPress={() => this.props.navigation.navigate('Category')} />
                            </View>
                        </View>
                    </Content>
                </Drawer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.cartReducer.cartList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (product) => dispatch(deleteProduct(product.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)