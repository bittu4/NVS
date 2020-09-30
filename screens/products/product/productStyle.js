import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windoWidth = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(windoWidth * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const scollViewWidth=Dimensions.get('window').width;
const scrollViewHeight=scollViewWidth;
export const productStyle = StyleSheet.create({
    brandName: {
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#b8dc82',
        color: 'white'
    },
    brandNameView: {
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '5%'
    },
    productName: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    specialPrice: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#11654e'
    },
    regularPrice: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        marginLeft: '3%'
    },
    offer: {
        marginLeft: '3%',
        backgroundColor: '#f4a419'
    },
    productNameView: {
        marginTop: '3%'
    },
    accordianHeader: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        textAlign: 'center',
        alignItems: "center",
        backgroundColor: "#8cc63e",
        borderRadius: 25,
        margin: 10
    },
    accordianHeaderButon: {
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        marginRight: '2%'
    },
    skuAndSizeView: {
        flexDirection: 'row',
        marginTop: '3%',
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-around',
        padding:10
    },
    sliderView:{
        width:scollViewWidth,
        height:scrollViewHeight
    },
    sliderScrollView:{
        width:scollViewWidth,
        height:scrollViewHeight
    },
    sliderImage:{
        width:scollViewWidth,
        height:scrollViewHeight,
        resizeMode: 'cover'
    },
    sliderDotView:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        alignSelf:'center'
    },
    sliderDot:{
        color:'#888',
        margin:3
    },
    sliderActiveDot:{
        color:'black',
        margin:3
    }

})