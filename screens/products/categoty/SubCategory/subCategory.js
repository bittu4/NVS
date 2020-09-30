import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import SubCategoryItem from './subCategoryItem'
import { View, Text, Card, CardItem,Spinner } from 'native-base';
import { subCategoryStyle } from './subCategoryStyle'
import SubCategoryService from './subCategoryApi'


export default class SubCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            subCategories: this.props.route.params.subCategories,
            catId: this.props.route.params.catId,
            isLoading:true,
        })
        this.subCategoryService = new SubCategoryService();

    }

    componentDidMount() {
        this.getSubCategories();
        this.props.navigation.setParams({ title: this.state.subCategories.name })
    }

    async getSubCategories() {
        let body ={ params: {
            "cat_id": this.state.catId,
        }};
        let response = await this.subCategoryService.getSubCategory(body);
        let basicUri = "https://m2.nvspharmacy.co.uk/pub/media/";
        await this.setState({
            subCategories: response.data[0].response,
            isLoading:false
        })
    }

    render() {
        return (
            <View>
                {this.state.isLoading == true ? <Spinner />
                    :
                    <SafeAreaView>
                        <FlatList
                            data={this.state.subCategories}
                            renderItem={({ item }) => <SubCategoryItem data={item} navigation={this.props.navigation} />}
                            horizontal={false}
                            numColumns={2}
                            initialNumToRender={5}
                            windowSize={10}
                        />
                    </SafeAreaView>
                }
            </View>
        )
    }
}