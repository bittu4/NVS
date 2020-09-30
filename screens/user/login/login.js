import React, { Component } from 'react';
import { Container, Content, View, Text, Input, Item, Icon, Button, Drawer, Spinner } from 'native-base';
import { loginStyle } from './loginStyle'
import AppHeader from '../../home/header/header'
import SideBar from '../../home/sideBar/sideBar'
import { connect } from 'react-redux'
import { onLogin } from '../../../store/actions/auth'
import LoginService from './loginApi'
import ValidationComponent from 'react-native-form-validator';
import { Field, reduxForm } from 'redux-form';
import LoginForm from './loginForm'
const validate = values => {
    const error = {};
    error.email = '';
    error.name = '';
    var ema = values.email;
    var nm = values.name;
    if (values.email === undefined) {
        ema = '';
    }
    if (values.name === undefined) {
        nm = '';
    }
    if (ema.length < 8 && ema !== '') {
        error.email = 'too short';
    }
    if (!ema.includes('@') && ema !== '') {
        error.email = '@ not included';
    }
    if (nm.length > 8) {
        error.name = 'max 8 characters';
    }
    return error;
};

class Login extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = ({
            email: '',
            password: '',
            isSubmitDisabled: false,
            isLoading: false,
            invalidUserName: ''
        });
        this.loginService = new LoginService();
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };

    openDrawer = () => {
        this.drawer._root.open()
    };

    handleEmailChange = (value) => {
        this.setState({ email: value, invalidUserName: '' })
    }

    handlePasswordChange = (value) => {
        this.setState({ password: value, invalidUserName: '' })
    }

    async handleLogin() {
        this.validate({
            password: { required: true },
            email: { email: true },
        });
        if (!this.state.email) {
            this.setState({
                invalidUserName: 'Please Enter Email '
            })
        }
        else if (!this.state.password) {
            this.setState({
                invalidUserName: 'Please Enter Password'
            })
        }
        else {
            this.setState({
                isLoading: true
            })
            await this.setState({
                isSubmitDisabled: true
            })
            let body = {
                "parameters": {
                    "email": this.state.email,
                    "password": this.state.password,
                    "deviceid": "1",
                    "devicetype": "tryrtyeyeyey"
                }
            }
            let response = await this.loginService.loginUser(body);

            if (response != null && response.status === 200) {
                if (response.data[0].status == "1") {
                    this.setState({
                        isLoading: false
                    })
                    this.props.saveDetails(response.data[0].response, true, response.data[0].response.bearer_token);
                    this.props.navigation.goBack();
                } else {
                    this.setState({
                        isLoading: false,
                        invalidUserName: 'Invalid UserName or Password'
                    })
                }
            }
            else {
                this.setState({
                    isLoading: false
                })
            }
        }
    }

    renderInput({ input, label, type, meta: { touched, error, warning } }) {
        var hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError}>
                <Input {...input} />
                {hasError ? <Text>{error}</Text> : <Text />}
            </Item>
        )
    }

    render() {
        return (
            <Container>
                <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigation={this.props.navigation} />} onClose={() => this.closeDrawer()} >
                    <AppHeader onOpen={this.openDrawer} />
                    {
                        this.state.isLoading == true ?
                            <Content>
                                <Spinner />
                            </Content>
                            :
                            <Content>
                                <View style={loginStyle.topView}>
                                    <Text style={loginStyle.topText}>Sign in with your social account</Text>
                                </View>
                                <View style={{ justifyContent: 'center', padding: 20 }}>
                                    <View style={{ marginTop: '1%' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '1%', paddingLeft: '5%', paddingRight: '5%', marginLeft: '5%', marginRight: '5%' }}>
                                            <Icon style={{ color: 'blue', fontSize: 50 }} type="FontAwesome" name="facebook-square" />
                                            <Icon style={{ color: '#00acee', marginLeft: '10%', fontSize: 50 }} type="FontAwesome" name="google-plus-square" />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', padding: 10 }}>
                                    <Text style={loginStyle.middleText}>Or</Text>
                                    <Text style={loginStyle.middleText}>Sign in with email</Text>
                                </View>
                               {/* <LoginForm/> */}
                                <View style={{ justifyContent: 'center', padding: 20 }}>
                                    <Item regular>
                                        <Input ref="email" placeholder='Email Address' keyboardType="email-address"
                                            value={this.state.email}
                                            onChangeText={this.handleEmailChange.bind(this)} />
                                    </Item>
                                    <Item regular style={{ marginTop: '5%' }}>
                                        <Input ref="password" secureTextEntry={true} placeholder='Password'
                                            value={this.state.password}
                                            onChangeText={this.handlePasswordChange.bind(this)} />
                                    </Item>
                                </View>
                                <View>
                                    {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text>{errorMessage}</Text>)}
                                </View>
                                {/* <View>
                                    <Text style={{ alignSelf: 'center', color: '#ff0000' }}>{this.state.invalidUserName}</Text>
                                </View> */}
                                <View style={{ justifyContent: 'center', padding: 20 }}>
                                    <Button rounded success style={loginStyle.signInBtn} disabled={this.state.isSubmitDisabled}>
                                        <Text style={loginStyle.signInBtnTxt} onPress={this.handleLogin.bind(this)}>Sign In</Text>
                                    </Button>
                                </View>
                                <View style={{ justifyContent: 'center', padding: 20 }}>
                                    <Text style={loginStyle.forgotText}>Forgotten Password?</Text>
                                </View>
                                <View style={{ alignContent: 'center', padding: 20 }} button onPress={() => this.props.navigation.navigate('Product')}>
                                    <Text style={loginStyle.textAlignCentrt}>Don't have an account?</Text>
                                    <Text button onPress={() => this.props.navigation.navigate('signUp')} style={loginStyle.signUpText}>Sign Up Today</Text>
                                </View>
                            </Content>
                    }
                </Drawer>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)