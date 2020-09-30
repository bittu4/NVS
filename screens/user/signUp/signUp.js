import React, { Component } from 'react';
import { Content, Container, View, Text, Input, Item, Icon, Button, Form, Picker, Drawer, DatePicker } from 'native-base';
import { signUpStyle } from './signUpStyle'
import AppHeader from '../../home/header/header'
import SideBar from '../../home/sideBar/sideBar'
import SignUpModel from './signUpModel'
import SignUpService from './signUpApi'
import { connect } from 'react-redux'
import { onLogin } from '../../../store/actions/auth'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: 0,
            model: new SignUpModel('', '', '', '', 0, '3', 0, ''),
            genderList: []
        };
        this.signUpService = new SignUpService();
    }

    componentWillMount = () => {
        this.getGenderList();
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    handleGenderChange(value) {
        this.setState({
            selectedGender: value
        });
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                gender: value
            }
        }))
    }

    handleEmailChange = (value) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                email: value
            }
        }))
    }

    handlePasswordChange = (value) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                password: value
            }
        }))
    }

    handleConfirmPasswordChange = (value) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                confirmPassword: value
            }
        }))
    }

    handleFirstNameChange = (value) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                firstname: value
            }
        }))
    }

    handleLastNameChange = (value) => {
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                lastname: value
            }
        }))
    }

    handleDobChange = (value) => {
        this.setState({ chosenDate: value });
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                dob: value
            }
        }))
    }

    async getGenderList() {
        let response = await this.signUpService.getGenderList();
        if (response != null) {
            await this.setState({
                genderList: response.data[0].response
            })
        }
    }

    async handleSignUp() {
        let body = {
            "parameters": {
                "email": this.state.model.email,
                "password": this.state.model.password,
                "firstname": this.state.model.firstname,
                "lastname": this.state.model.lastname,
                "is_subscribed": 0,
                "store_id": "3",
                "gender": this.state.model.gender,
                "dob": this.state.model.dob
            }
        }
        let response = await this.signUpService.registerUser(body);

        if (response != null) {
            if (response.data[0].status == "1") {
                // await this.setState({
                //     genderList: response.data[0].response
                // })
                this.props.saveDetails(response.data[0].response, true, response.data[0].response.bearer_token)
                this.props.navigation.navigate('Home')
            } else {

            }
        }

    }



    render() {
        return (
            <Container>
                <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigation={this.props.navigation} />} onClose={() => this.closeDrawer()} >
                    <AppHeader onOpen={this.openDrawer} />
                    <Content>
                        <View style={signUpStyle.topView}>
                            <Text style={signUpStyle.topText}>Sign up with...</Text>
                        </View>
                        <View style={{ justifyContent: 'center', padding: 20 }}>
                            <View style={{ marginTop: '1%' }}>
                                <Button rounded success style={signUpStyle.socialBtn}>
                                    <Icon style={{ color: 'blue', fontSize: 25, alignContent: 'flex-start' }} type="FontAwesome" name="facebook" />
                                    <Text style={signUpStyle.socialBtnTxt}>Sign up with facebook</Text>
                                </Button>
                                <Button rounded success style={signUpStyle.socialBtn}>
                                    <Icon style={{ color: '#00acee', fontSize: 25, alignContent: 'flex-start' }} type="FontAwesome" name="google-plus" />
                                    <Text style={signUpStyle.socialBtnTxt}>Sign up with google</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', padding: 10 }}>
                            <Text style={signUpStyle.middleText}>Or</Text>
                            <Text style={signUpStyle.middleText}>Sign in with email</Text>
                        </View>
                        <View style={{ justifyContent: 'center', padding: 20 }}>
                            <Form>
                                <Item regular>
                                    <Input placeholder='Email Address'
                                        keyboardType="email-address" value={this.state.model.email}
                                        onChangeText={this.handleEmailChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input secureTextEntry={true}
                                        placeholder='Password' value={this.state.model.password}
                                        onChangeText={this.handlePasswordChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input secureTextEntry={true}
                                        placeholder='Confirm Password' value={this.state.model.confirmPassword}
                                        onChangeText={this.handleConfirmPasswordChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='First Name' value={this.state.model.firstname}
                                        onChangeText={this.handleFirstNameChange.bind(this)} />
                                </Item>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Input placeholder='Last Name' value={this.state.model.lastname}
                                        onChangeText={this.handleLastNameChange.bind(this)} />
                                </Item>
                                <View>
                                    <Item regular style={{ marginTop: '5%' }}>
                                        <DatePicker
                                            defaultDate={new Date()}
                                            minimumDate={new Date(1920, 1, 1)}
                                            maximumDate={new Date()}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText="Date of Birth                                                                                                             "
                                            textStyle={{ color: "black" }}
                                            placeHolderTextStyle={{ color: "#4d4d4d" }}
                                            onDateChange={this.handleDobChange}
                                            disabled={false}
                                            style={{ width: '100%' }}
                                        />
                                    </Item>
                                </View>
                                <Item regular style={{ marginTop: '5%' }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined, borderColor: 'black', borderRadius: '1px' }}
                                        placeholder="Select your Gender"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selectedGender}
                                        onValueChange={this.handleGenderChange.bind(this)}
                                    >
                                        <Picker.Item label="-- Select Gender --" value="0" />
                                        {
                                            this.state.genderList.map((gender, i) =>
                                                <Picker.Item label={gender.label} value={gender.value} />
                                            )
                                        }
                                    </Picker>
                                </Item>
                            </Form>
                        </View>

                        <View style={{ justifyContent: 'center', padding: 20 }}>
                            <Button rounded success style={{ justifyContent: 'center' }}>
                                <Text style={signUpStyle.signUpText} onPress={this.handleSignUp.bind(this)}>Create an account</Text>
                            </Button>
                        </View>
                    </Content>
                </Drawer>
            </Container >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.authReducer.userDetails,
        isLoggedIn: state.authReducer.isLoggedin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveDetails: (userDetails, isLoggedIn, token) => dispatch(onLogin(userDetails, isLoggedIn, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)