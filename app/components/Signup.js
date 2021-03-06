import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {user_signup} from '../actions/auth';
import styles from './Form.css';
import CSSModules from 'react-css-modules';


@CSSModules(styles)
class UserSignup extends Component {
    render() {
        const {dispatch, is_login, is_pending} = this.props;
        return (
             <form styleName="form">
               <fieldset>
                 <legend>Signup</legend>
                 <div styleName="field">
                   <label htmlFor="username">Username</label>
                   <input id="username" type="text" ref="username" styleName="input" />
                 </div>
                 <div styleName="field">
                   <label htmlFor="password">Password</label>
                   <input id="password" type="password" ref="password" styleName="input" />
                 </div>

                 <button type="submit"
                         styleName="formButton"
                         disabled={is_pending}
                         onClick={e => this.handleClick(e)}>Login</button>
               </fieldset>
             </form>
        );
    }

    componentWillMount() {
        const {dispatch, is_login} = this.props;
        if (is_login) {
            dispatch(pushState({}, '/'));
        }
    }

    handleClick(e) {
        e.preventDefault();
        const nameNode = this.refs.username;
        const passNode = this.refs.password;

        const username = (nameNode.value || '').trim();
        const password = (passNode.value || '').trim();
        const email = 'NoNeed';

        const { dispatch } = this.props;
        dispatch(user_signup(username, password, email));
    }
}

UserSignup.propTypes = {
    is_login: PropTypes.bool.isRequired,
    is_pending: PropTypes.bool.isRequired
};

function select(state) {
    return {
        is_pending: state.auth.signup_pending,
        is_login: state.auth.is_login
    };
}

export default connect(select)(UserSignup);
