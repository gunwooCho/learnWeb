import React from 'react';
import PropTypes from 'prop-types';

/** @type {React.FC} */
const Home = ({ height }) => (
  <div style={{ height }}>hello world</div>
);

Home.defaultProps = {
  height: '100vh',
};

Home.propTypes = {
  height: PropTypes.string,
};

export default Home;
