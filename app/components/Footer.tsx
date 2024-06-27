import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-text">
        Copyright &copy; {currentYear} Marcus Alenius. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
