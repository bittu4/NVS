import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon, View, Text, List, ListItem, Content, Container } from 'native-base';
import { connect } from 'react-redux'
import {onLogout} from '../../../store/actions/auth'

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    handleLogintoggle = () =>{
        debugger
        if(this.props.isLoggedIn)
        {
            this.props.onLogout(false);
        }
        else{
            this.props.navigation.navigate('login')
        }
    }
    
    render() {
        return (
            <Container>
                <Content>
                    <View style={{ backgroundColor: 'white' }}>
                        <List>
                            <ListItem itemHeader first>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black', width: '75%' }}>NVS</Text>
                                <Text button style={{ color: 'black' }}
                                    onPress={this.handleLogintoggle.bind(this)}>{this.props.authText}</Text>
                                <Icon style={{ color: 'black', fontSize: 20, marginTop: '1%', marginLeft: '2%' }} type="FontAwesome" name="chevron-right" />
                            </ListItem>
                            <ListItem button
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <Icon style={{ color: 'rgb(0, 0, 0)', width: '10%' }} name="apps" />
                                <Text style={{ marginLeft: '5%' }}>Home</Text>
                            </ListItem>
                            <ListItem button
                                onPress={() => this.props.navigation.navigate('Shopping Cart')}>
                                <Icon style={{ color: 'rgb(0, 0, 0)', width: '10%' }} type="FontAwesome" name="shopping-bag" />
                                <Text style={{ marginLeft: '5%' }}>Bag</Text>
                            </ListItem>
                            <ListItem button
                                onPress={() => this.props.navigation.navigate('Wishlist')}>
                                <Icon style={{ color: 'rgb(0, 0, 0)', width: '10%' }} type="FontAwesome" name="heart-o" />
                                <Text style={{ marginLeft: '5%' }}>Added Wishlist</Text>
                            </ListItem>
                            <ListItem button
                                onPress={() => this.props.navigation.navigate('login')}>
                                <Icon style={{ color: 'rgb(0, 0, 0)', width: '10%' }} type="FontAwesome" name="user-o" />
                                <Text style={{ marginLeft: '5%' }}>My Account</Text>
                            </ListItem>
                            <ListItem button
                                onPress={() => this.props.navigation.navigate('address')}>
                                <Icon style={{ color: 'rgb(0, 0, 0)', width: '10%' }} type="FontAwesome" name="map-marker" />
                                <Text style={{ marginLeft: '5%' }}>My Addresses</Text>
                            </ListItem>
                            {/* <ListItem >
                                <Icon style={{ color: 'rgb(0, 0, 0)' }} type="FontAwesome" name="user-o" />
                                <Text style={{ marginLeft: '5%' }}>App Settings</Text>
                            </ListItem>
                            <ListItem >
                                <Icon style={{ color: 'rgb(0, 0, 0)' }} type="FontAwesome" name="question-circle" />
                                <Text style={{ marginLeft: '5%' }}>Help & Faqs</Text>
                            </ListItem>
                            <ListItem >
                                <Icon style={{ color: 'rgb(0, 0, 0)' }} type="FontAwesome" name="link" />
                                <Text style={{ marginLeft: '5%' }}>Quick Links</Text>
                            </ListItem>
                            <ListItem last>
                                <Icon style={{ color: 'rgb(0, 0, 0)' }} type="FontAwesome" name="info-circle" />
                                <Text style={{ marginLeft: '5%' }}>Information</Text>
                            </ListItem>
                            <ListItem itemHeader>
                                <Text>Tell Us What you think</Text>
                            </ListItem>
                            <ListItem>
                                <Text>Help Improve the App</Text>
                            </ListItem>
                            <ListItem>
                                <Text>rate the App</Text>
                            </ListItem> */}
                        </List>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authText: state.authReducer.authText,
        isLoggedIn:state.authReducer.isLoggedin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (isLoggedIn) => dispatch(onLogout(isLoggedIn)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)