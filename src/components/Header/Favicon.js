import PropTypes from 'prop-types';
import React from 'react';
import favicon from '../../assets/images/favicon.png';

function Favicon({ breadcrumb, to, cursor }) {
  const display = breadcrumb ? (
    <li>
      <a
        href={to}
        style={{
          display: 'block',
          height: '30px',
          width: '30px',
          margin: 'auto 4px',
          cursor: `${cursor}`,
        }}
      >
        <img style={{ height: '30px', width: '30px' }} alt="" src={favicon} />
      </a>
    </li>
  ) : (
    <div>
      <img
        style={{ height: '40px', width: '40px', margin: '10px' }}
        alt=""
        src={favicon}
      />
    </div>
  );
  return display;
}
Favicon.propTypes = {
  breadcrumb: PropTypes.bool,
  to: PropTypes.string,
  cursor: PropTypes.string,
};
Favicon.defaultProps = {
  breadcrumb: false,
  to: '',
  cursor: '',
};

export default Favicon;
