import React from 'react';
import Credit from './Credit/Credit';
import '../../assets/styles/footer.scss';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <p className="copyright">
          <span>© Copyright 2021</span>
          <Credit ghLink="https://github.com/shaharkamay" ghName="Shahar Kamay" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;