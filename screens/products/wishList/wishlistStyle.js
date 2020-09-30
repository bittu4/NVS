import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width
const midScreen = width/2;
export const wishListStyle = StyleSheet.create({
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 15,
        width:'70%'
    },
    headingView: {
        flexDirection: 'row',
        width:width
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center'
    },
    card: {
        width: (width / 2) - 15,
        height: 325,
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
        // marginLeft: midScreen,
        height: 320,
        justifyContent:'center',
        alignContent:'center'

    },
    productImage: {
        height: 200,
        width: null,
        flex: 1
    },
    viewAllBtn:{
        height:25,
        marginTop:20,
        justifyContent:'flex-end',
        alignContent:'flex-end',
        backgroundColor:'#e6e6e6',
    }
})