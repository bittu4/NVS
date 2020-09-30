import React, { Component } from 'react';
import { View, Text, Card, CardItem } from 'native-base';
import { Image } from 'react-native'
import { BrandListStyle } from './brandListStyle'
import { recentlyViewedStyle } from '../../products/recentlyViewed/recentlyViewedStyle'


export default class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={BrandListStyle.listView} key={this.props.brand.id} >
                <Card style={BrandListStyle.card} button onPress={() => this.props.navigation.navigate('ProductList', {
                            catId: 3,
                            catName:'',
                            brandId: this.props.brand.id
                        })}>
                    <CardItem cardBody 
                        button onPress={() => this.props.navigation.navigate('ProductList', {
                            catId:  this.props.brand.id,
                            catName:'',
                            brandId: 3
                        })}
                    >
                        <Image source={{ uri: this.props.brand.image }} style={BrandListStyle.productImage} />
                    </CardItem>
                    <CardItem footer style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', textAlign: 'center', }}>{this.props.brand.name}</Text>
                    </CardItem>
                </Card>
            </View>
        )
    }
}
