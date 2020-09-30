import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, View, Text } from 'native-base';
import { SafeAreaView } from 'react-native'

export default class SplashScren extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Container>
          <View>
          <View style={{ justifyContent: 'center', padding: 20 }}>
                    <Button rounded success>
                        <Text>Login</Text>
                    </Button>
                </View>
                <View style={{ justifyContent: 'center', padding: 20 }}>
                    <Button rounded success>
                        <Text>Register</Text>
                    </Button>
                </View>
                <View>
                       <Text>Skip and Continue</Text>
                    <Icon style={{color:'rgb(0, 0, 0)'}} active={this.state.tab5} type="FontAwesome" name="user-o" />
                    </View>
              </View>
      </Container>
    );
  }
}