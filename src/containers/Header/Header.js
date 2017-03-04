import React from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';
import './Header.css';

export class Header extends React.Component {
  render() {
    return (
      <div className="Header">
          <img src={logo} className="Header-logo" alt="logo" />
          <Link to="/"><h2>Yelp</h2></Link>
          <section>
            Fullstack.io
        </section>
      </div>
    );
  }
}

export default Header;