import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={`footer page-padding`}>
      <p className="footerItem">Copyright Placeholder</p>
      <Link to="/" className="footerItem">
        Terms of use
      </Link>
      <Link to="/" className="footerItem">
        Privacy policy
      </Link>
    </footer>
  );
};

export default Footer;
