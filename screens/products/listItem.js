import React, { Component } from 'react';
import { View, Text, Card, Button, CardItem } from 'native-base';
import { StyleSheet, Image } from 'react-native'
import ProductList from './productsList'
import Constants from 'expo-constants';
import { productStyle } from './productsListStyle'
import { recentlyViewedStyle } from './recentlyViewed/recentlyViewedStyle'


export default class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={productStyle.listView} key={this.props.product.product_id} onPress={() => this.props.navigation.navigate('Product')}>
                <Card style={productStyle.card} button onPress={() => this.props.navigation.navigate('Product', {
                    productId: this.props.product.product_id
                })}>
                    <CardItem cardBody style={{ height: '70%' }} button onPress={() => this.props.navigation.navigate('Product', {
                                    productId: this.props.product.product_id
                                })} >
                        <Image source={{ uri: this.props.product.image }}
                            style={productStyle.productImage}
                            onPress={() => this.props.navigation.navigate('Product', {
                                productId: this.props.product.product_id
                            })} />
                    </CardItem>
                    <CardItem style={{ height: '30%', marginBottom: '5%' }}>
                        <View style={recentlyViewedStyle.recentlyViewedView}>
                            <Text style={{ flexWrap: 'wrap', height: 90, textAlign: 'center', justifyContent: 'center' }}
                                onPress={() => this.props.navigation.navigate('Product', {
                                    productId: this.props.product.product_id
                                })} >{this.props.product.product_name}</Text>
                            <Text style={recentlyViewedStyle.recentlyViewedText}>€ {this.props.product.regular_price}</Text>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }
}
