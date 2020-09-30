import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, View, Drawer } from 'native-base';
import ProductList from '../products/index'
import HomeBody from './homeBody';
import { SafeAreaView } from 'react-native'
import ProductBody from '../products/productBody'
import BrandBody from '../brands/brandBody'
import AppHeader from './header/header'
import SideBar from './sideBar/sideBar'
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import {onLogin} from '../../store/actions/auth'

class Home extends Component {
  constructor(props) {
    super(props);
    console.log("Home",this.props)
  }

  componentDidMount(){
    this.checkUserIsLoggedIn();
  }

  async checkUserIsLoggedIn() {
    const value = await AsyncStorage.getItem('nvsToken');
    if (value !== null && value !== undefined) {
      if (value.length > 10) {
        this.props.onLogin([],true,value)
      }
    }
  }

  async getLoggedInuserData() {
    let response = await this.addAddressService.getAddressList(body, value);
    console.log("address", response)
    if (response != null && response != undefined) {
      await this.setState({
        countryList: response.data[0].country.splice(1, 3)
      })
    }
  }

  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  render() {
    return (
      <Container>
        <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigation={this.props.navigation} />} onClose={() => this.closeDrawer()} >
          <AppHeader onOpen={this.openDrawer} />
          <Tabs locked={true} textStyle={{ color: 'rgb(0, 0, 0)' }}>
            <Tab heading="Home" activeTextStyle={{ color: 'rgb(0, 0, 0)', fontWeight: 'bold' }}
              textStyle={{ color: 'rgb(0, 0, 0)', fontSize: 12 }}>
              <Content ><HomeBody navigation={this.props.navigation} /></Content>
            </Tab>
            <Tab heading="Brands" activeTextStyle={{ color: 'rgb(0, 0, 0)', fontWeight: 'bold' }}
              textStyle={{ color: 'rgb(0, 0, 0)', fontSize: 12 }}>
              <Content><BrandBody navigation={this.props.navigation} /></Content>
            </Tab>
            <Tab heading="Products" activeTextStyle={{ color: 'rgb(0, 0, 0)', fontWeight: 'bold' }}
              textStyle={{ color: 'rgb(0, 0, 0)', fontSize: 12 }}>
              <Content>
                <ProductBody navigation={this.props.navigation} />
              </Content>
            </Tab>
          </Tabs>
        </Drawer>
      </Container >
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (userDetail, isLoggedIn , token) => dispatch(onLogin(userDetail, isLoggedIn, token)),
  }
}

export default connect(null, mapDispatchToProps)(Home)