import React, { Component } from 'react';
import { Content, Container, Text, View, Icon, Accordion, Button, Spinner, Badge, Picker, Form } from 'native-base';
import { productStyle } from './productStyle'
import { ScrollView, Image, SafeAreaView } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import ProductApi from './productApi'
import { Rating } from 'react-native-ratings';
import { addProduct } from '../../../store/actions/cart'
import { addWishList } from '../../../store/actions/wishlist'
import { connect } from 'react-redux'
import { shareOnFacebook, shareOnTwitter } from 'react-native-social-share';
import { AsyncStorage } from 'react-native';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.route.params.productId,
            productData: [],
            isLoading: true,
            quantity: "1",
            loading: true,
            active: 0,
        };
        this.productApi = new ProductApi();
    }

    componentDidMount() {
        this.getProductDetail();
        this.getQuoteId();
    }

    async getQuoteId() {
        const value = await AsyncStorage.getItem('nvsToken');
        console.log('token', value)
        let response = await this.productApi.GetQuoteId(value);
        console.log("quoteId", response)
        if (response != null && response != undefined) {
            if (response.status == 200) {
                this.setState({
                    quoteId: response.data.id
                })
            }
        }
    }

    async getProductDetail() {
        let body = {
            "parameters": {
                "prodID": this.state.productId,
            }
        };
        let response = await this.productApi.getProductById(body);
        let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
        let images = [];
        const regex = /(<([^>]+)>)/ig;
        for (let i = 0; i <= response.data[0].response.product_image.length; i++) {
            try {
                response.data[0].response.product_image[i].image = basicUri.concat(response.data[0].response.product_image[i].image);
                response.data[0].response.main_prod_img = basicUri.concat(response.data[0].response.main_prod_img);
                // images.push({ url: response.data[0].response.product_image[i].image })
                images.push({ url: response.data[0].response.product_image[i].image })
            }
            catch (err) { }
        }
        let dataArray = [];
        response.data[0].response.description = response.data[0].response.description.replace(/<\/?[^>]+(>|$)/g, "");
        dataArray.push({ title: 'Details', content: response.data[0].response.description.replace(/<\/?[^>]+(>|$)/g, "") })
        dataArray.push({ title: 'Ingredients', content: response.data[0].response.ingredients.replace(/<\/?[^>]+(>|$)/g, "") })
        dataArray.push({ title: 'How To Use', content: response.data[0].response.how_to_use.replace(/<\/?[^>]+(>|$)/g, "") })
        if (response.data[0].response.has_review == "true") {
            dataArray.push({ title: 'Reviews', content: response.data[0].response.product_review })
        }
        let ratCount = Number(response.data[0].response.review_count) * 1;
        await this.setState({
            productData: response.data[0].response,
            brandName: response.data[0].response.attribute[0].value,
            productSize: response.data[0].response.attribute[1].value,
            productDesc: response.data[0].response.description,
            productName: response.data[0].response.product_name,
            productSku: response.data[0].response.product_sku,
            productIngredient: response.data[0].response.ingredients,
            howToUse: response.data[0].response.how_to_use,
            extraInfo: response.data[0].response.extrainfo,
            stock: response.data[0].response.stock,
            specialPrice: response.data[0].response.price.special_price,
            regularPrice: response.data[0].response.price.regular_price,
            offer: response.data[0].response.offer,
            images: images,
            isLoading: false,
            dataArray: dataArray,
            review: response.data[0].response.review,
            reviewCount: ratCount,
        })
        console.log('productData',this.state.productData)
    }

    _renderHeader(item, expanded) {
        return (
            <View style={productStyle.accordianHeader}>
                <Text style={{ fontWeight: "600", color: 'white' }}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />}
            </View>
        );
    }

    _renderContent(item) {
        return (
            <Text
                style={{
                    padding: 10,
                    margin: 15
                }}
            >
                {item.content}
            </Text>
        );
    }

    onValueChange(value) {
        this.setState({
            quantity: value
        });
    }

    changeDot = (event) => {
        const slide = Math.ceil(event.contentOffset.x / event.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }

    }

    async handleAddToCart(event) {
        if (this.props.isLoggedIn) {
            const value = await AsyncStorage.getItem('nvsToken');
            const customer_id = await AsyncStorage.getItem('customerId');
            // let body = {
            //     "parameters": {
            //         "qty": parseInt(this.state.quantity),
            //         "product_id": parseInt(this.state.productData.product_id)
            //     }
            // }
            let body = {
                "cartItem": {
                    "sku": this.state.productData.product_sku,
                    "qty": parseInt(this.state.quantity),
                    "quote_id": this.state.quoteId
                }
            }
            console.log(value)
            let response = await this.productApi.addProductToCart(body, value);
            console.log("cart",response)
            if (response != null && response != undefined) {
                if (response.status == 200) {
                    // AsyncStorage.setItem('cartId', response.data[0].response.cart_id);
                    this.props.navigation.navigate('Shopping Cart', {})
                }
            }
        }
        else {
            this.props.navigation.navigate('login')
        }
        // console.log("addtocart", response)
        // this.props.addProduct(this.state.productData, parseInt(this.state.quantity))
    }

    handleAddToWishList = () => {
        this.props.addWishList(this.state.productData)
        this.props.navigation.navigate('Wishlist', {})
    }

    handleFbShare = () => {
        shareOnFacebook({
            'text': 'Global democratized marketplace for art',
            'link': 'https://artboost.com/',
            'imagelink': 'https://artboost.com/apple-touch-icon-144x144.png',
            //or use image
            'image': 'artboost-icon',
        },
            (results) => {
                console.log(results);
            }
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white', justifyContent: 'center' }}>
                {
                    this.state.isLoading == true ? <Spinner />
                        : <Content>
                            <View>
                                <View style={productStyle.brandNameView}>
                                    <Text style={productStyle.brandName}>{this.state.brandName}</Text>
                                </View>
                                <View style={productStyle.productNameView}>
                                    <Text style={productStyle.productName}>{this.state.productName}</Text>
                                </View>
                                <SafeAreaView style={{ flex: 1 }}>
                                    <View style={productStyle.sliderView}>
                                        <ScrollView
                                            horizontal
                                            pagingEnabled
                                            showsHorizontalScrollIndicator={false}
                                            style={productStyle.sliderScrollView}>
                                            {
                                                this.state.images.map((image, index) => (
                                                    <Image
                                                        key={index}
                                                        source={{
                                                            uri: image.url,
                                                            headers: {
                                                                Host: "m2.nvspharmacy.co.uk",
                                                                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
                                                            }
                                                        }}
                                                        style={productStyle.sliderImage}
                                                        onLoadEnd={() => {
                                                            this.setState({ loading: false })
                                                        }}
                                                        onScroll={this.changeDot}
                                                    />
                                                ))
                                            }
                                        </ScrollView>
                                        {this.state.loading && <Spinner style={productStyle.sliderImage} />}
                                        <View style={productStyle.sliderDotView}>
                                            {this.state.images.map((i, k) => (
                                                <Text style={k == this.state.active ? productStyle.sliderActiveDot : productStyle.sliderDot}>⬤</Text>
                                            ))}
                                        </View>
                                    </View>
                                </SafeAreaView>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                    <Text style={productStyle.specialPrice}>€ {this.state.specialPrice}</Text>
                                    <Text style={productStyle.regularPrice}>€ {this.state.regularPrice}</Text>
                                    <Badge style={productStyle.offer}>
                                        <Text>{this.state.offer}% Off</Text>
                                    </Badge>

                                </View>
                                <View style={{ flexDirection: 'column', marginTop: '3%' }}>
                                    <Text style={productStyle.productName}>Overall Rating {this.state.review}</Text>
                                    <Rating
                                        ratingCount={5}
                                        count={10}
                                        imageSize={30}
                                        readonly={true}
                                        startingValue={this.state.review}
                                        style={{ paddingVertical: 10, imageSize: 20 }}
                                    />
                                </View>
                                <View style={{ marginTop: '3%' }}>
                                    <Text style={productStyle.productName}>Availability: {this.state.stock}</Text>
                                </View>
                                <View style={productStyle.skuAndSizeView}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={productStyle.productName}>SKU</Text>
                                        <Text style={productStyle.productName}>{this.state.productSku}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={productStyle.productName}>Size</Text>
                                        <Text style={productStyle.productName}>{this.state.productSize}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '3%' }}>
                                    <Button bordered onPress={this.handleAddToWishList.bind(this)}>
                                        <Text >Wishlist</Text>
                                    </Button>
                                    {/* <Button bordered style={{ marginLeft: '3%' }}>
                                        <Text>Compare</Text>
                                    </Button> */}
                                    <Button bordered style={{ marginLeft: '3%' }}>
                                        <Text>Email To Friend</Text>
                                    </Button>
                                </View>
                                <View style={{ marginTop: '3%' }}>
                                    <Text style={productStyle.productName}>Social Share</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '2%', paddingLeft: '5%', paddingRight: '5%', marginLeft: '5%', marginRight: '5%' }}>
                                        <Icon style={{ color: 'blue', fontSize: 50 }} type="FontAwesome" name="facebook-square" onPress={this.handleFbShare.bind(this)} />
                                        <Icon style={{ color: '#00acee', marginLeft: '20%', fontSize: 50 }} type="FontAwesome" name="twitter-square" />
                                        <Icon style={{ color: '#25d366', marginLeft: '20%', fontSize: 50 }} type="FontAwesome" name={'whatsapp'} />
                                        <Icon style={{ color: '#E60023', marginLeft: '20%', fontSize: 50 }} type="FontAwesome" name={'pinterest-square'} />
                                    </View>
                                </View>
                                <View style={{ marginTop: '3%', paddingLeft: '10%', paddingRight: '10%' }}>
                                    <Form>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            placeholder="Choose Quantity"
                                            placeholderStyle={{ color: "black" }}
                                            placeholderIconColor="#007aff"
                                            style={{ width: undefined }}
                                            selectedValue={this.state.quantity}
                                            onValueChange={this.onValueChange.bind(this)}
                                        >
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                        </Picker>
                                    </Form>
                                </View>
                                <View style={{ marginTop: '3%', paddingLeft: '8%', paddingRight: '8%' }}>
                                    <Button rounded success onPress={this.handleAddToCart.bind(this)}
                                        style={{ justifyContent: "center", backgroundColor: '#006d50' }} >
                                        <Text>Add To Cart</Text>
                                    </Button>
                                </View>
                                <View style={{ marginTop: '3%' }}>
                                    <Content>
                                        <Accordion
                                            dataArray={this.state.dataArray}
                                            animation={true}
                                            expanded={true}
                                            renderHeader={this._renderHeader}
                                            renderContent={this._renderContent}
                                        />
                                    </Content>
                                </View>
                                <View style={{ marginTop: '3%' }}>
                                    <Text style={productStyle.productName}>You Might Also Like</Text>
                                </View>
                            </View>
                        </Content>
                }
            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.cartReducer.cartList,
        isLoggedIn: state.authReducer.isLoggedin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product, quantity) => dispatch(addProduct(product, quantity)),
        addWishList: (product) => dispatch(addWishList(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)