import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width
export const recentlyViewedStyle = StyleSheet.create({
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
        marginBottom:10
    },
    card: {
        width: (width / 2) - 15,
        height: 350,
        marginLeft: 10,
        marginTop: 10,

    },
    recentlyViewedView: {
        flexDirection: 'column',
        textAlign:'center',
        justifyContent:'center'
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
        marginTop:20,
        justifyContent:'flex-end',
        alignContent:'flex-end',
        backgroundColor:'#ffff',
    },
    recentlyViewedView:{
        flexDirection: 'column',
    },
    recentlyViewedText:{
        color:'green',
        textAlign:'center'
    }
})