import React, { Component } from 'react';
import { Container, Content, Card, Button, Text, CardItem, View, Spinner } from 'native-base';
import { Image } from 'react-native';
import { recentlyViewedStyle } from './recentlyViewedStyle'
import RecentlyViewedService from './recentlyViewedApi'

export default class RecentlyViewed extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            products: [],
        });
        this.recentlyViewedService = new RecentlyViewedService();
    }

    componentDidMount() {
        this.getRecentlyViewedList();
    }

    async getRecentlyViewedList() {
        let response = await this.recentlyViewedService.getRecentlyViewedList();
        let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
        let product = [];
        for (let i = 0; i <= response.data[0].response.length; i++) {
            try {
                if (response.data[0].response[i].image.includes('.')) {
                    product.push(response.data[0].response[i])
                }
                response.data[0].response[i].image = basicUri.concat(response.data[0].response[i].image);
                response.data[0].response[i].price=Number(response.data[0].response[i].price).toFixed(2);
            }
            catch (err) { }
        }
        await this.setState({
            products: response.data[0].response
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: '#e6e6e6' }}>
                <View style={recentlyViewedStyle.headingView}>
                    <Text style={recentlyViewedStyle.heading}>Recently Viewed</Text>
                    {/* <Button rounded light style={recentlyViewedStyle.viewAllBtn}
                    onPress={() => this.props.navigation.navigate('Category')}>
                        <Text>View All</Text>
                    </Button> */}
                </View>
                <View style={recentlyViewedStyle.listView}>
                    {
                        this.state.products.length > 0 ?
                            this.state.products.map((product, index) =>
                                <Card key={index} style={recentlyViewedStyle.card}>
                                    <CardItem cardBody button onPress={() => this.props.navigation.navigate('Product', {
                                            productId: product.product_id
                                        })}>
                                        <Image source={{ uri: product.image }} style={recentlyViewedStyle.productImage} />
                                    </CardItem>
                                    <CardItem>
                                        <View style={recentlyViewedStyle.recentlyViewedView}>
                                            <Text style={{ flexWrap: 'wrap', height: 90, textAlign: 'center', justifyContent: 'center' }}>{product.product_name}</Text>
                                            <Text style={recentlyViewedStyle.recentlyViewedText}> € {product.price}</Text>
                                        </View>
                                    </CardItem>
                                </Card>
                            )
                            :
                            <Spinner style={recentlyViewedStyle.spinner} />
                    }

                </View>
            </View>
        );
    }
}