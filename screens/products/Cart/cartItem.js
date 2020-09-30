import React, { Component } from 'react';
import { View, Text, Card, Button, CardItem, Container, Content } from 'native-base';
import { Image, SafeAreaView } from 'react-native'
import { cartStyle } from './cartStyle'


export default class CartItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
        return (
            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                <Card style={cartStyle.card}>
                    <CardItem cardBody style={{ height: '80%' }}>
                        <Image source={{ uri: this.props.product.image }}
                            style={cartStyle.productImage}
                        />
                    </CardItem>
                </Card>
                <View style={{ padding: '2%',paddingRight: '2%' }}>
                    <Text style={{ marginTop: '4%', fontWeight:'bold',color:'#10765b', fontSize:18 }}>€ {this.props.product.product_price}</Text>
                    <Text style={{ marginTop: '4%', paddingRight: '2%', justifyContent: 'center', textAlign: 'left' }}>{this.props.product.product_name}</Text>
                    {/* <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                        <Text style={{fontWeight:'bold'}}>Size: </Text>
                        <Text>{this.props.product.product.attribute[1].value}</Text>
                    </View> */}
                    <View style={{ flexDirection: 'row', marginTop: '4%'}}>
                        <Text style={{fontWeight:'bold'}}>Qty: </Text>
                        <Text>{this.props.product.quantity}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
