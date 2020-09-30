import React, { Component } from 'react';
import { Button, Text, View, Item, Input, Form, Icon } from 'native-base';
import { Image } from 'react-native';
import HomeService from './homeapi'
import { homeStyle } from './homeStyle'
import PopularProducts from '../products/popularProduct/index'
import RecentlyViewed from '../products/recentlyViewed/index'
import TopBanner from './topBanner/topBanner'
import MiddleBanner from './middleBanner/middleBanner'


export default class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            popularProducts: [],
            recentlyViewed: [],
            productList: [],
            activeIndex: 0,
            bannerList: [],
            topBannerList: [],
            middleBannerList: [],
            isEmailError: false,
            iconColor: 'white',
            iconName: 'bath'
        });
        this.homeService = new HomeService();
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    componentDidMount() {
        this.getTopBannerList();
    }

    _renderItem({ item }) {
        return (
            <View style={{
                backgroundColor: 'white',
                borderRadius: 5,
                height: 350,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
            }}>
                <Image source={{ uri: item.banner_image }} style={{ flex: 1 }} />
            </View>

        )
    }

    async getTopBannerList() {
        let response = await this.homeService.getBannerList();
        let basicUri = "http://m2.nvspharmacy.co.uk/pub/media/";
        for (let i = 0; i <= response.data[0].response.banner_list.topbanner.length; i++) {
            try {
                response.data[0].response.banner_list.topbanner[i].banner_image = basicUri.concat(response.data[0].response.banner_list.topbanner[i].banner_image);
            }
            catch (err) { }
        }
        for (let i = 0; i <= response.data[0].response.banner_list.middlebanner.length; i++) {
            try {
                response.data[0].response.banner_list.middlebanner[i].banner_image = basicUri.concat(response.data[0].response.banner_list.middlebanner[i].banner_image);
            }
            catch (err) { }
        }
        await this.setState({
            bannerList: response.data[0].response,
            topBannerList: response.data[0].response.banner_list.topbanner,
            middleBannerList: response.data[0].response.banner_list.middlebanner
        })
    }

    async handleEmailChange(e) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = re.test(e);
        if (isValid) {
            await this.setState({
                isEmailError: false,
                iconColor: '#00cc00',
                iconName: "check-circle"
            })
        }
        else {
            await this.setState({
                isEmailError: true,
                iconColor: '#ff0000',
                iconName: "times"
            })
        }
    }

    render() {
        return (
            <View>
                <TopBanner topBannerList={this.state.topBannerList} />
                <View style={{ justifyContent: 'center' }}>
                    <PopularProducts navigation={this.props.navigation} />
                </View>
                {/* <View style={{ justifyContent: 'center', padding: 20 }}>
                    <Button rounded success style={homeStyle.moreBrandBtn}
                    onPress={() => this.props.navigation.navigate('BrandBody')}>
                        <Text>More Brands</Text>
                    </Button>
                </View> */}
                <View style={{ justifyContent: 'center' }}>
                    <MiddleBanner middleBannerList={this.state.middleBannerList} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <RecentlyViewed navigation={this.props.navigation} />
                </View>
                <View>
                    <View>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 35 }}>Free Sample With Every Order</Text>
                    </View>
                    <View>
                        <Form>
                            <Item error={this.state.isEmailError}>
                                <Input autoCompleteType="email" onChangeText={this.handleEmailChange} placeholder="Your Email Address" style={{ textAlign: 'center' }} />
                                <Icon style={{ color: this.state.iconColor }} type="FontAwesome" name={this.state.iconName} />
                            </Item>
                        </Form>
                    </View>
                    <View style={{ justifyContent: 'center', padding: 10 }}>
                        <Button rounded success style={homeStyle.moreBrandBtn}>
                            <Text style={{ textAlign: 'center' }}>Subscribe Now</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}