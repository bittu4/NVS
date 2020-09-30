import React, { Component } from 'react';
import { View, Text, Card, Button, CardItem, List, ListItem } from 'native-base';
import { StyleSheet, Image } from 'react-native'
import Constants from 'expo-constants';
import { categoryStyle } from './categoryStyle'

export default class CategoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <Card key={this.props.category.id} style={categoryStyle.card}>
                    <CardItem cardBody >
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={categoryStyle.cardHeaderText}>{this.props.category.name}</Text>
                            </View>
                            {
                                this.props.category.children.map((data) =>
                                    <View>
                                        <Text style={categoryStyle.subCategoryText}>{data.name}</Text>
                                    </View>
                                )
                            }

                        </View>
                    </CardItem>
                    <CardItem footer bordered button onPress={() => this.props.navigation.navigate('SubCategory', {
                            subCategories: this.props.category,
                            title:this.props.category.name,
                            catId:this.props.category.id
                        })}>
                            <Text style={categoryStyle.viewMoreText}>View More</Text>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

