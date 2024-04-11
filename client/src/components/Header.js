import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-div">
        <img src="/Assets/logo.png" width="200px" alt="" />
      </div>

      <nav className="nav">
        <Link to="/">תפריט</Link>
        <Link to="/">תפריט</Link>
        <Link to="/">תפריט</Link>
        <Link to="/">תפריט</Link>
      </nav>

      <div className="header-button-div">
        <button id="noBGbtn">דחיסת קבצים</button>
        <button>דחיסת קבצים</button>
      </div>
    </div>
  );
};

export default Header;
