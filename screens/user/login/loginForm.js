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

const validate = values => {
    const error = {};
    error.email = 'gjdkfjgk';
    error.password = 'jgdfkjgkfdkjg';
    var ema = values.email;
    var nm = values.password;
    if (values.email === undefined) {
        ema = 'fdf';
    }
    if (values.password === undefined) {
        nm = 'gdfgfd';
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

class LoginForm extends React.Component {
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

    // handleEmailChange = (value) => {
    //     this.setState({ email: value, invalidUserName: '' })
    // }

    // handlePasswordChange = (value) => {
    //     this.setState({ password: value, invalidUserName: '' })
    // }

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
        const { handleSubmit, reset } = this.props;
        return (
            <Container>
                <Content>
                    <Field name="email" component={this.renderInput} />
                    <Field name="name" component={this.renderInput} />
                    <Button block primary onPress= {reset}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default reduxForm({
    form: 'test',
    validate
})(LoginForm)