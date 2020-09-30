import React, { Component } from 'react';
import { Container, Content, Card, Button, Text, CardItem, View, Spinner } from 'native-base';
import { Image } from 'react-native';
import { popProductStyle } from './popularProductStyle'
import PopularProductService from './popularProductApi'

export default class PopularProducts extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            popularProducts: [],
            activeIndex: 0,
        });
        this.PopularProductService = new PopularProductService();
    }

    componentDidMount() {
        this.getpopularProductList();
    }

    async getpopularProductList() {
        let response = await this.PopularProductService.getProductList();
        let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
        let product = [];
        for (let i = 0; i <= response.data[0].response.length; i++) {
            try {
                if (response.data[0].response[i].image.includes('.')) {
                    product.push(response.data[0].response[i])
                }
                response.data[0].response[i].image = basicUri.concat(response.data[0].response[i].image);
            }
            catch (err) { }
        }
        await this.setState({
            popularProducts: product.slice(0, 4),
        })
    }

    render() {
        return (
            <View style={{justifyContent:'center'}}>
                <View style={popProductStyle.headingView}>
                    <Text style={popProductStyle.heading}>Popular Products</Text>
                    {/* <Button rounded light style={popProductStyle.viewAllBtn}
                    onPress={() => this.props.navigation.navigate('Category')}>
                        <Text>View All</Text>
                    </Button> */}
                </View>
                <View style={popProductStyle.listView}>
                    {
                        this.state.popularProducts.length > 0 ?
                            this.state.popularProducts.map((product, index) =>
                                <Card key={index} style={popProductStyle.card}>
                                    <CardItem cardBody button onPress={() => this.props.navigation.navigate('Product', {
                                            productId: product.product_id
                                        })}>
                                        <Image source={{ uri: product.image }} style={popProductStyle.productImage} />
                                    </CardItem>
                                    <CardItem>
                                        <Text style={{ flexWrap: 'wrap', height: 85, textAlign: 'center', justifyContent: 'center' }}>{product.product_name}</Text>
                                    </CardItem>
                                </Card>
                            )
                            :
                            <Spinner style={popProductStyle.spinner} />
                    }

                </View>
            </View>
        );
    }
}