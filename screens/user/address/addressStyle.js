import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windoWidth = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(windoWidth * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export const addressStyle = StyleSheet.create({
    topView:{
        textAlign:'center',
        fontWeight:'bold'
        
    },
    paymentHeading: {
        flexDirection: 'row',
        width:windoWidth
    },
    topView:{
        flexDirection:'row',
        marginTop:'8%'
    },
    middleText:{
        textAlign:'center'
    },
    socialBtnTxt:{
        textAlign:"center",
        color:'#bebebe'
    },
    socialBtn:{
        backgroundColor:'#f2f2f2',
        marginTop:'5%'
    },
    textAlignCentrt:{
        textAlign:'center'
    },
    forgotText:{
        color:'#9ccd58',
        textAlign:"center"
    },
    signUpText:{
        textAlign:'center',
        fontWeight:'bold'
    }
})