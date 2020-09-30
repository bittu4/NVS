import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windoWidth = Dimensions.get('window').width
const cardWidth=(windoWidth / 4) - 15
const ITEM_WIDTH = Math.round(windoWidth * 0.7);
export const alphabetStyle = StyleSheet.create({
    card: {
        width: cardWidth,
        height: cardWidth,
        marginLeft: 10,
        marginTop: 10,
        alignItems:'center',
        flex: 1,
        justifyContent:'center',
    },
    activeCard: {
        width: cardWidth,
        height: cardWidth,
        marginLeft: 10,
        marginTop: 10,
        alignItems:'center',
        flex: 1,
        justifyContent:'center',
        backgroundColor:'#006d50'
    },
    activeCardText:{
        fontSize: 25,
        fontWeight: 'bold',
        color:'#5aa644',
        backgroundColor:'#006d50'
    },
   cardText:{
        fontSize: 25,
        fontWeight: 'bold',
        color:'black',
        backgroundColor:'white'
    },
    activeCardColor:{
        backgroundColor:'#006d50'
    }
})