import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windoWidth = Dimensions.get('window').width
const cardWidth=(windoWidth / 2) - 15
const ITEM_WIDTH = Math.round(windoWidth * 0.7);
export const subCategoryStyle = StyleSheet.create({
    card: {
        width: cardWidth,
        height: cardWidth,
        marginLeft: 10,
        marginTop: 10,
        alignItems:'center',
        flex: 1,
        justifyContent:'center',
    },
   cardText:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'black',
        backgroundColor:'white',
        textAlign:'center'
    }
})