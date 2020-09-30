import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon, View } from 'native-base';

export default class AppHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Header>
                    <Left>
                        <Button transparent onPress={this.props.onOpen}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black' }}>NVS App</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="heart" />
                        </Button>
                        <Button transparent>
                            <Icon name="search" />
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}