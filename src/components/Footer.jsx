import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="ico">
        <a
          href="mailto:%20uraeel@gmail.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-square-envelope"></i>
        </a>
        <a
          href="https://github.com/yarazarin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github-square"></i>
        </a>
      </div>
      <div className="Rights">
        <pre> Yara Zarin © 2023</pre>
      </div>
    </div>
  );
};

export default Footer;
