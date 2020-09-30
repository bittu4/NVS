import React, { Component } from 'react';
import { View } from 'native-base';
import ProductList from './productsList'
import Category from './categoty/index'


export default class ProductBody extends Component {

    render() {
        return (
            <View>
                {/* <View>
                    <Text>Filter and short</Text>
                </View> */}
                <View>
                    <Category navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}