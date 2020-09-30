import React, { Component } from 'react';
import {Footer, FooterTab, Button,Icon} from 'native-base';

export default class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
    });
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false,
      tab5: false,
    });
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      tab5: false,
    });
  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
      tab5: false,
    });

  }

  toggleTab5() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: true,
    });

  }

  render() {
    return (
        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()} onPress={() => this.props.navigation.navigate("Home")}>
              <Icon style={{color:'rgb(0, 0, 0)'}} active={this.state.tab1} name="apps" />
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
              <Icon style={{color:'rgb(0, 0, 0)'}} active={this.state.tab2} type="FontAwesome" name="search" />
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
              <Icon style={{color:'rgb(0, 0, 0)'}} active={this.state.tab3} type="FontAwesome" name="shopping-bag" />
            </Button>
            <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
              <Icon style={{color:'rgb(0, 0, 0)'}} active={this.state.tab4} type="FontAwesome" name="heart-o" />
            </Button>
            <Button active={this.state.tab5} onPress={() => this.toggleTab5()}>
              <Icon style={{color:'rgb(0, 0, 0)'}} active={this.state.tab5} type="FontAwesome" name="user-o" />
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}