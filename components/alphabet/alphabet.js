import React from 'react';
import { View, Text, Card, CardItem } from 'native-base';
import { alphabetStyle } from './alphabetStyle'

export default class Alphabets extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ isActive: false })

    }

    handleCardClick = (event) => {
        console.log(event)
    }

    render() {
        return (
            <View >
                <Card style={this.state.isActive ? alphabetStyle.activeCard : alphabetStyle.card}>
                    <CardItem cardBody button onPress={() => this.props.navigation.navigate('Brands', {
                        alphabet: this.props.data
                    })}>
                        <Text style={this.state.isActive ? alphabetStyle.activeCardText : alphabetStyle.cardText}>{this.props.data}</Text>
                    </CardItem>
                </Card>
            </View>
        )
    }
}
