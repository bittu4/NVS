import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width
export const cartStyle = StyleSheet.create({
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 15
    },
    headingView: {
        flexDirection: 'row'
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    card: {
        width: (width / 2) - 15,
        height: 230,
        marginLeft: 10,
        marginTop: 10,

    },
    recentlyViewedView: {
        flexDirection: 'column',
    },
    recentlyViewedText: {
        color: 'green',
        textAlign: 'center'
    },
    spinner: {
        marginLeft: 195,
        height: 320
    },
    productImage: {
        height: 200,
        width: null,
        flex: 1
    },
    viewAllBtn:{
        height:25,
        marginLeft:110,
        marginTop:20,
        justifyContent:'flex-end',
        alignContent:'flex-end',
        backgroundColor:'#e6e6e6',
    }
})