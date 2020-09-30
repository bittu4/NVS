import React from 'react'
import { Container, Content, Card, Button, Text, CardItem, View, Spinner, Form, Item, Picker, Icon } from 'native-base';
import { Image, SafeAreaView, ScrollView, VirtualizedList, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FilterService from './filterApi';
import { Platform } from 'react-native';
export default class ProductFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                { label: 'UK', value: 'uk' },
                { label: 'France', value: 'france' },
                { label: 'France', value: 'france' },
                { label: 'France', value: 'france' },
                { label: 'France', value: 'france' },
                { label: 'France', value: 'france' },
                { label: 'France', value: 'france' },
            ],
            brandFilters: [],
            categoryFilters: [],
            brands: this.props.route.params.brandFilters,
        }
        this.filterService = new FilterService();
    }

    componentDidMount = () => {
        this.getCategories();
        let brands = [];
        for (let i = 0; i <= this.state.brands.attr_options.length; i++) {
            try {
                brands.push({ label: this.state.brands.attr_options[i].label, value: this.state.brands.attr_options[i].values });
            }
            catch (errr) { }
        }
        this.setState({ brandFilters: brands })
    }

    async getCategories() {
        let response = await this.filterService.getCategories();
        await this.setState({
            categoriyList: response.data[0].response
        })
        let categories = [];
        for (let i = 0; i <= this.state.categoriyList.length; i++) {
            try {
                categories.push({ label: this.state.categoriyList[i].name, value: this.state.categoriyList[i].id });
            }
            catch (errr) { }
        }
        this.setState({ categoryFilters: categories })
    }

    render() {
        return (
            <View style={{ margin: 10}}>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Brands</Text>
                    <DropDownPicker
                        items={this.state.brandFilters}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            selectedBrand: item.value
                        })}
                        placeholder="Select Brand"
                        zIndex={5000}
                    />
                </View>

                <View style={{ marginTop: 10}}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Categories</Text>
                    <DropDownPicker
                        items={this.state.categoryFilters}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            selectedCategory: item.value
                        })}
                        placeholder="Select Category"
                        zIndex={4000}
                    />
                </View>
                <View style={{ justifyContent: 'center', padding: 10,marginTop:'50%' }}>
                    <Button rounded success style={{
                        marginTop: 30,
                        marginBottom: 30,
                        justifyContent: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        marginRight: '2%',
                        backgroundColor: '#006d50'
                    }} onPress={() => this.props.navigation.push('ProductList', {
                        catId: this.state.selectedCategory,
                        brandId: this.state.selectedBrand
                    })}>
                        <Text style={{ textAlign: 'center' }}>View Items</Text>
                    </Button>
                </View>
            </View>
        )
    }
}