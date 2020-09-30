import React, { Component } from 'react';
import {View, Spinner} from 'native-base';
import { Image,Dimensions } from 'react-native';
import { homeStyle } from '../homeStyle'
import Carousel from 'react-native-snap-carousel';

const windoWidth = Dimensions.get('window').width
const sliderWidth = Math.round(windoWidth);
const itemWidth = Math.round(windoWidth) - 30;

export default class MiddleBanner extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            activeIndex: 0,
        });
    }

    _renderItem({ item }) {
        return (
            <View style={homeStyle.bannerView}>
                <Image source={{ uri: item.banner_image }} style={{ flex: 1, justifyContent: 'center',width:'100%' }} />
            </View>

        )
    }

    render() {
        return (
            <View>
                {this.props.middleBannerList.length > 0 ?
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.props.middleBannerList}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            renderItem={this._renderItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })} />
                    </View>
                    :
                    <Spinner style={homeStyle.spinner} />
                }
            </View>

        );
    }
}