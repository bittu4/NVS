import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windoWidth = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(windoWidth * 0.7);

export const homeStyle = StyleSheet.create({
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
        width: (windoWidth / 2) - 15,
        height: 300,
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
    viewAllBtn: {
        height: 25,
        marginLeft: 110,
        marginTop: 25,
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    footerView: {
        backgroundColor: '#e6e6e6',
        flexDirection: 'row'
    },
    footerIcon: {
        padding: 10,
        marginLeft: 40
    },
    spinner: {
        height: 320
    },
    moreBrandBtn: {
        marginTop: 30,
        marginBottom: 30,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        marginRight:'2%'
    },
    bannerView: {
        backgroundColor: 'white',
        height: 350,
        width:'100%',
        justifyContent: "center",
        marginTop:20,
        marginBottom:20,
        padding:20
    }
})