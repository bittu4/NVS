import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windoWidth = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(windoWidth * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export const loginStyle = StyleSheet.create({
    topText:{
        textAlign:'center',
        fontWeight:'bold'
        
    },
    topView:{
        marginTop:'5%'
    },
    middleText:{
        textAlign:'center'
    },
    signInBtnTxt:{
        textAlign:"center"
    },
    signInBtn:{
        backgroundColor:'#006d50',
        textAlign:"center",
        justifyContent:'center'
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