import React from 'react'
import { View, Text, Card, CardItem } from 'native-base';
import {subCategoryStyle} from './subCategoryStyle'

export default class SubCategoryItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{  justifyContent: 'center' }}>
                <View >
                    <Card style={subCategoryStyle.card}>
                        <CardItem cardBody button onPress={() => this.props.navigation.navigate('ProductList', {
                            catId: this.props.data.id,
                            catName:this.props.data.name,
                            brandId: 3
                        })}>
                            <Text style={subCategoryStyle.cardText}>{this.props.data.name}</Text>
                        </CardItem>
                    </Card>
                </View>
            </View>
        )
    }
}