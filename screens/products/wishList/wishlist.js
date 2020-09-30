import React, { Component } from 'react';
import { Content, Container, View, Text, Icon, Drawer, Card, CardItem, Button, Spinner } from 'native-base';
import { Image, SafeAreaView } from 'react-native'
import AppHeader from '../../home/header/header'
import SideBar from '../../home/sideBar/sideBar'
import { connect } from 'react-redux'
import { wishListStyle } from './wishlistStyle'

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wislistProducts: []
        };
    }

    UNSAFE_componentWillMount = () => {
        this.setState({
            wislistProducts: this.props.wishList
        })
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };

    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {
        return (
            <Container>
                <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigation={this.props.navigation} />} onClose={() => this.closeDrawer()} >
                    <AppHeader onOpen={this.openDrawer} />
                    <Content style={{ backgroundColor: '#eeeeee' }}>
                        <View style={{
                            flexDirection: 'row', alignContent: 'center', height: 60,
                            borderBottomColor: '#8cc63e', borderBottomWidth: 4, backgroundColor: 'white'
                        }}>
                            <Icon style={{ fontSize: 20, fontWeight: '700', marginLeft: '5%', marginTop: '5%' }} type="FontAwesome" name="arrow-left"
                                onPress={() => this.props.navigation.goBack()} />
                            <Text style={{ fontWeight: '900', fontSize: 22, marginLeft: '20%', marginTop: '3%' }}> Added WishList </Text>
                        </View>
                        <View style={wishListStyle.listView}>
                            {
                                this.state.wislistProducts.length > 0 ?
                                    this.props.wishList.map((product, index) =>
                                        <Card key={index} style={wishListStyle.card}>
                                            <CardItem cardBody button onPress={() => this.props.navigation.navigate('Product', {
                                                productId: product.product.product_id
                                            })}>
                                                <Image source={{ uri: product.product.main_prod_img }} style={wishListStyle.productImage} />
                                            </CardItem>
                                            <CardItem>
                                                <Text style={{ flexWrap: 'wrap', height: 85, textAlign: 'center', justifyContent: 'center' }}>{product.product.product_name}</Text>
                                            </CardItem>
                                        </Card>
                                    )
                                    :
                                    <Spinner style={wishListStyle.spinner} />
                            }

                        </View>

                    </Content>
                </Drawer>
            </Container >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wishList: state.wishListReducer.wishList
    }
}

export default connect(mapStateToProps, null)(Wishlist)