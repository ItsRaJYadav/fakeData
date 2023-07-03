import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center' }}>
      <div className="container">
        <p>Copyright&copy; 2023 Raj Yadav</p>
        
        <div>
          <a href="https://github.com/ItsRaJYadav" >
            GitHub
          </a>
          {' | '}
          <a href="https://www.linkedin.com/in/rajydv07/">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
