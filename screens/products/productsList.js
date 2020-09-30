import React, { Component } from 'react';
import { Content, Button, Text, View, Spinner, Form, Item, Picker, Icon, Container, Drawer } from 'native-base';
import { SafeAreaView, FlatList } from 'react-native';
import ProductService from './productsListApi'
import { productStyle } from './productsListStyle'
import ListItem from './listItem'
import AppHeader from '../home/header/header'
import SideBar from '../home/sideBar/sideBar'

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            products: [],
            data: [],
            subCatId: this.props.route.params.catId,
            subCatName: this.props.route.params.catName,
            brandFilters: [],
            brandId: this.props.route.params.brandId,
            loading: true,
        });
        this.productService = new ProductService();
    }

    componentDidMount() {
        this.getProductList();
    }

    async getProductList() {
        let body = {
            "parameters": {
                "id": this.state.subCatId,
                "store_id": this.state.brandId
            }
        };
        console.log("brand body",body)
        let response = await this.productService.getProductList(body);
        if (response != null) {
            let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
            let product = [];
            for (let i = 0; i <= response.data[0].response.products.length; i++) {
                try {
                    if (response.data[0].response.products[i].image.includes('.')) {
                        product.push(response.data[0].response.products[i])
                    }
                    response.data[0].response.products[i].image = basicUri.concat(response.data[0].response.products[i].image);
                    response.data[0].response.products[i].regular_price = Number(response.data[0].response.products[i].regular_price).toFixed(2);
                }
                catch (err) { }
            }
            await this.setState({
                totalProduct: product,
                products: response.data[0].response.products.slice(0, 60),
                position: 1,
                loading: false,
                brandFilters: response.data[0].response.filter_attributes.find(obj => obj.att_label == "brand"),
            })
        }
        else {
            this.setState({
                loading: false
            })
        }
    }

    handleScroll = event => {
        try {
            var currentOffset = event.nativeEvent.contentOffset.y;
            var direction = currentOffset > this.offset ? 'down' : 'up';
            if (direction === 'up') {
                let no = 5 * this.state.position;
                let position = this.state.position + 1
                this.setState({
                    products: this.state.totalProduct.slice(0, no),
                    position: position
                })
            }
        }
        catch (err) { }
    }

    getItem = (data, index) => {
        return {
            product_id: Math.random().toString(12).substring(0),
            title: `Item ${index + 1}`
        }
    }

    getItemCount = () => {
        return 50;
    }

    Item = ({ title }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }

    sortByChange = (event) => {
        this.setState({
            sortSelected: event
        });
        if (event == "2") {
            this.state.products.sort(function (a, b) {
                var price1 = Number(a.regular_price); // ignore upper and lowercase
                var price2 = Number(b.regular_price); // ignore upper and lowercase
                if (price1 < price2) {
                    return -1;
                }
                if (price1 > price2) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        }
        else if (event == "3") {
            this.state.products.sort(function (a, b) {
                var price1 = Number(a.regular_price); // ignore upper and lowercase
                var price2 = Number(b.regular_price); // ignore upper and lowercase
                if (price1 > price2) {
                    return -1;
                }
                if (price1 < price2) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        }
        else if (event == "5") {
            this.state.products.sort(function (a, b) {
                var first = a.product_name.toUpperCase();; // ignore upper and lowercase
                var second = b.product_name.toUpperCase();; // ignore upper and lowercase
                if (first > second) {
                    return -1;
                }
                if (first < second) {
                    return 1;
                }
                return 0;
            });
        }
        else if (event == "4") {
            this.state.products.sort(function (a, b) {
                var first = a.product_name.toUpperCase();; // ignore upper and lowercase
                var second = b.product_name.toUpperCase();; // ignore upper and lowercase
                if (first < second) {
                    return -1;
                }
                if (first > second) {
                    return 1;
                }
                return 0;
            });
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
                    <AppHeader onOpen={this.openDrawer} />
                    <Content style={{ backgroundColor: '#eeeeee' }}>
                        <View style={{
                            flexDirection: 'row', alignContent: 'center', height: 60,
                            borderBottomColor: '#8cc63e', borderBottomWidth: 4, backgroundColor: 'white',marginTop:'1%'
                        }}>
                            <Icon style={{ fontSize: 20, fontWeight: '700', marginLeft: '5%', marginTop: '5%' }} type="FontAwesome" name="arrow-left"
                                onPress={() => this.props.navigation.goBack()} />
                            <Text style={{ fontWeight: '900', fontSize: 22, marginLeft: '30%', marginTop: '3%' }}> {this.state.subCatName} </Text>
                        </View>
                        <Form style={{ flexDirection: 'row' }}>
                            <Item picker style={{ width: '45%', marginLeft: '2%' }}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Sort By"
                                    placeholderStyle={{ color: "black" }}
                                    placeholderIconColor="#black"
                                    selectedValue={this.state.sortSelected}
                                    onValueChange={this.sortByChange.bind(this)}
                                >
                                    <Picker.Item label="Sort By" value="" />
                                    <Picker.Item label="Featured" value="1" />
                                    <Picker.Item label="Price: Low to High" value="2" />
                                    <Picker.Item label="Price: High to Low" value="3" />
                                    <Picker.Item label="Name: A to Z" value="4" />
                                    <Picker.Item label="Name: Z to A" value="5" />
                                    <Picker.Item label="Newest" value="6" />
                                    <Picker.Item label="Rating" value="7" />
                                </Picker>
                            </Item>
                            <Button transparent onPress={() => this.props.navigation.navigate('ProductFilter', {
                                brandFilters: this.state.brandFilters
                            })}>
                                <Icon type="FontAwesome" style={{ color: 'black' }} name='filter' />
                                <Text style={{ color: 'black' }} >Filter</Text>
                            </Button>
                        </Form>
                        {/* <View style={{ justifyContent: "center", alignContent: "center", marginTop: '5%' }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{this.state.subCatName}</Text>
                        </View> */}
                        <SafeAreaView style={productStyle.listView}>
                            {
                                this.state.products.length > 0 ?
                                    <View style={productStyle.listView}>
                                        <FlatList
                                            data={this.state.products}
                                            renderItem={({ item }) => <ListItem product={item} navigation={this.props.navigation} />}
                                            style={productStyle.listView}
                                            horizontal={false}
                                            numColumns={2}
                                            initialNumToRender={5}
                                            windowSize={10}
                                        />
                                    </View>
                                    :
                                    this.state.loading ? <Spinner style={productStyle.spinner} /> : <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                        <Text >No Products found</Text></View>
                            }
                        </SafeAreaView>
                    </Content>
                </Drawer>
            </Container>
        );
    }
}