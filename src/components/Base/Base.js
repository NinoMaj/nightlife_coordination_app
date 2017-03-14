import React from 'react';
import { Link, IndexLink } from 'react-router';

const Base = ({ children }) => {
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React App</IndexLink>
      </div>

      <div className="top-bar-right">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>

    </div>

    {children}

  </div>
};

Base.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default Base;