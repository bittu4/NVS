import React from 'react';
import { View } from 'native-base';
import { FlatList, SafeAreaView } from 'react-native'
import Alphabets from '../../components/alphabet/index'

export default class BrandBody extends React.Component {
    constructor(props) {
        super(props);
        this.state=({
            data:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W'
            ,'X','Y','Z']
        });
    }

    render() {
        return (
            <SafeAreaView>
                {
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => <Alphabets data={item} navigation={this.props.navigation} />}
                                horizontal={false}
                                numColumns={4}
                                initialNumToRender={5}
                                windowSize={10}
                            />
                }
            </SafeAreaView>
        )
    }
}
