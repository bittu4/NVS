import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windoWidth = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(windoWidth * 0.7);
const cardWidth= (windoWidth / 2) - 15;
export const categoryStyle = StyleSheet.create({
    card: {
        width: cardWidth,
        height: 250,
        marginLeft: 10,
        marginTop: 10,
        alignItems:'center',
        flex: 1,
        justifyContent: 'space-between'
    },
    cardHeaderText:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: cardWidth/10,
        textAlign:'center'
    },
    viewMoreText:{
        marginTop:cardWidth/20,
        color:'#8bc53d',
        justifyContent: 'space-between',
        textAlign:'center'
    },
    subCategoryText:{
        marginTop:cardWidth/30,
        textAlign:'center'
    }
})