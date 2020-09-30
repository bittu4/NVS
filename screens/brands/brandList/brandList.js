import React, { Component } from 'react';
import { Content, Button, Text, View, Spinner, Form, Item, Picker, Icon } from 'native-base';
import { SafeAreaView, FlatList } from 'react-native';
import BrandListApi from './brandListApi'
import { BrandListStyle } from './brandListStyle'
import ListItem from './listItem'

export default class BrandList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            brands: [],
            data: [],
            brandAlphabet: this.props.route.params.alphabet,
            loading:true,
        });
        this.brandListService = new BrandListApi();
    }

    componentDidMount() {
        this.getBrandList();
    }

    async getBrandList() {
        let body = {
            "parameters": {
                "keyword": this.state.brandAlphabet,
            }
        };
        let response = await this.brandListService.getBrandList(body);
        debugger
        if (response != null) {
            let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
            let product = [];
            for (let i = 0; i <= response.data[0].response.length; i++) {
                try {
                    if (response.data[0].response[i].image.includes('.')) {
                        product.push(response.data[0].response[i])
                    }
                    response.data[0].response[i].image = basicUri.concat(response.data[0].response[i].image);
                    response.data[0].response[i].name=response.data[0].response[i].name.trim();
                }
                catch (err) { }
            }
            await this.setState({
                totalProduct: product,
                brands: response.data[0].response.slice(0, 60),
                position: 1,
                loading:false,
            })
        }
        else{
            this.setState({
                loading:false
            })
        }
    }

    render() {
        return (
            <Content>
                <View style={{ justifyContent: "center", alignContent: "center", marginTop: '5%' }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Brand Category "{this.state.brandAlphabet}"</Text>
                </View>
                <SafeAreaView style={BrandListStyle.listView}>
                    {
                        this.state.brands.length > 0 ?
                            <View style={BrandListStyle.listView}>
                                <FlatList
                                    data={this.state.brands}
                                    renderItem={({ item }) => <ListItem brand={item} navigation={this.props.navigation} />}
                                    style={BrandListStyle.listView}
                                    horizontal={false}
                                    numColumns={2}
                                    initialNumToRender={5}
                                    windowSize={10}
                                />
                            </View>
                            :
                            this.state.loading ? <Spinner style={BrandListStyle.spinner} /> : <View style={{justifyContent:'center',alignContent:'center',alignSelf:'center',alignItems:'center'}}>
                                <Text >No Products found</Text></View>
                    }
                </SafeAreaView>
            </Content>
        );
    }
}