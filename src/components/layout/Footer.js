import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>Taissir Guesmi 2GL2</p>
    </footer>
  );
}

const footerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  position: 'absolute',
  bottom: '0',
  width: '100%'
};

export default Footer;
