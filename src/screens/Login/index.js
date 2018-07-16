import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from 'utils/history';
import Link from 'components/common/Link';
import EmptyLayout from 'components/layouts/EmptyLayout';
import { sessionOperations } from 'ducks/session';
import Title from 'components/common/Title';
import { InputText, InputContainer } from 'components/common/Input';
import Button from 'components/common/Button';
import * as qs from 'query-string';
import styles from './style.module.scss';

class Login extends Component {
  state = {};

  onInputChange = (data) => {
    this.setState({
      [data.id]: data.value
    })
  }
  submitLogin = () => {
    const { login, location } = this.props;
    const { redirect } = qs.parse(location.search);
    const { email, password } = this.state;

    login({email, password}, redirect)
  }
  render() {
    const { email, password } = this.state;
    return (
      <EmptyLayout darkLogo>
        <div className={styles.base}>
          <div className={styles.formContainer}>
            <Title className={styles.title}>Log in to your account</Title>
            <InputContainer stretch>
              <InputText flex id='email' placeholder='Email address' value={email} onChange={this.onInputChange}/>
            </InputContainer>
            <InputContainer stretch>
              <InputText flex id='password' mask placeholder='Password' value={password} onChange={this.onInputChange}/>
            </InputContainer>
            <InputContainer stretch>
              <Button flex onClick={this.submitLogin}>
                Log in
              </Button>
            </InputContainer>
          </div>
          <div className={styles.actionsContainer}>
            <Link>Create a new account</Link>
            <Link>Forgot your password?</Link>
          </div>
        </div>
      </EmptyLayout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (...args) => dispatch(sessionOperations.login(...args))
  }
}

export default connect(null, mapDispatchToProps)(Login);
