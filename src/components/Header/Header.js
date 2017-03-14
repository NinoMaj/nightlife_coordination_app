import React from 'react';
import { Link, IndexLink } from 'react-router';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../colors';
import logo from './logo.svg';

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    backgroundColor: colors.almostBlack,
    height: "150px",
    padding: "20px",
    color: "white",
    fontSize: "large"
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
    position: 'absolute',
    top: 160,
    right: 25,
    fontSize: '0.9em'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  ul: {
    display: 'inline',
    position: 'absolute',
    top: 140,
    left: 25,
    fontSize: '0.9em',
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    border: '2px solid' + colors.lightGray,
    lineHeight: '40px'
  },
  li: {

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
    width: '150px',
    height: "40px"
  },
});

export class Header extends React.Component {
  render() {
    return (
      <div className={css(styles.header)}>
        <ul className={css(styles.ul, styles.hover)}>
          <li className={css(styles.li)}><IndexLink className={css(styles.navLink)} to="/"><div className={css(styles.navBtn)}>Home</div></IndexLink></li>
        </ul>
        <Link to="/">
          <img src={logo} className={css(styles.headerLogo)} alt="logo" />
        </Link>
        <Link className={css(styles.link)} to="/"><h2>Nighlife Coordination App</h2></Link>
        <section className={css(styles.login)}>
          <Link className={css(styles.link)} to="/login">Log in</Link>
          <span> | </span>
          <Link className={css(styles.link)} to="/signup">Sign up</Link>
        </section>
        {this.props.children}
      </div>
    );
  }
}

export default Header;