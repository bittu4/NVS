import React from 'react'
import CategoryService from './categoryApi'
import { Container, Content, Card, Button, Text, CardItem, View, Spinner } from 'native-base';
import { Image, SafeAreaView, ScrollView, VirtualizedList, FlatList } from 'react-native';
import Constants from 'expo-constants';
import CategoryItem from './categoryItem'

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({categories:[]});
        this.categoryService = new CategoryService();
    }

    componentDidMount() {
        this.getCategories();
    }

    async getCategories() {
        let response = await this.categoryService.getCategories();
        let basicUri = "https://m2.nvspharmacy.co.uk/pub/media/";
        await this.setState({
            categories: response.data[0].response
        })
    }

    render() {
        return (
            <SafeAreaView >
                {
                    this.state.categories.length > 0 ?
                        <View >
                            <FlatList
                                data={this.state.categories}
                                renderItem={({ item }) => <CategoryItem category={item} navigation={this.props.navigation} />}
                                keyExtractor={item => item.id}
                                horizontal={false}
                                numColumns={2}
                                initialNumToRender={5}
                                windowSize={10}
                            />
                        </View>
                        :
                        <Spinner />
                }
            </SafeAreaView>
        );
    }
}