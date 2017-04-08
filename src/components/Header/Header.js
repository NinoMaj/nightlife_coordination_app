import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../colors';
import logo from './logo.svg';
import { screenSizes } from '../../screenSizes';
import Auth from '../../modules/Auth';

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    backgroundColor: colors.almostBlack,
    padding: "20px",
    color: "white",
    fontSize: "large",
    overflow: 'auto'
  },
  headerLogo: {
    animationName: {
      'from': {
        transform: 'rotate(0deg)',
      },
      'to': {
        transform: 'rotate(360deg)',
      }
    },
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    height: "80px"
  },
  login: {
    float: 'right',
    fontSize: '1em',
    lineHeight: '40px',
    paddingLeft: '10px',
    paddingRight: '10px',
    [screenSizes.smartphone]: {
      float: 'none',
      width: "80%",
      margin: '0px auto',
      fontSize: '1.2em'
    },
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  headerTitle:{
    color: 'white',
    textDecoration: 'none',
    fontSize: '2em',
  },
  ul: {
    float: 'left',
    fontSize: '1.2em',
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    borderBottom: '2px solid' + colors.lightGray,
    lineHeight: '40px',
    textAlign: 'center',
    [screenSizes.smartphone]: {
      float: 'none',
      width: '80%',
      margin: '0px auto',
      marginBottom: "10px"
    },
  },
  li: {
    textAlign: 'center'
  },
  hover: {
    ':hover': {
      backgroundColor: colors.lightGray
    }
  },
  navLink: {
    color: 'white',
    textDecoration: 'none'
  },
  navBtn: {
    height: "40px",
    paddingLeft: "15px",
    paddingRight: "15px",
    margin: '0px auto'
  },
});

export class Header extends React.Component {
  handleLogout = () => {
    Auth.deauthenticateUser();
  }
  render() {
    return (

      <div className={css(styles.header)}>

        <div>
          <NavLink to="/">
            <img src={logo} className={css(styles.headerLogo)} alt="logo" />
          </NavLink>
          <NavLink className={css(styles.headerTitle)} to="/"><h2>Nighlife Coordination App</h2></NavLink>
        </div>
        <br />
        <div>
          <ul className={css(styles.ul, styles.hover)}>
            <li className={css(styles.li)}><NavLink className={css(styles.navLink)} to="/"><div className={css(styles.navBtn)}>Home</div></NavLink></li>
          </ul>

          {Auth.isUserAuthenticated() ? (
            <section className={css(styles.login)}>
              <NavLink className={css(styles.link)} to="/login" onClick={this.handleLogout.bind(this)}>Log out</NavLink>
            </section>
          ) : (
              <section className={css(styles.login)}>
                <NavLink className={css(styles.link)} to="/login">Log in</NavLink>
                <span> | </span>
                <NavLink className={css(styles.link)} to="/signup">Sign up</NavLink>
              </section>
            )}
        </div>

      </div>
    );
  }
}

export default Header;
