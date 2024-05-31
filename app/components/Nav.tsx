import "./Nav.css";

import NavHome from "./NavHome";
// import NavMobile from './NavMobile';
import NavRight from "./NavRight";

function Nav() {
  return (
    <nav>
      <NavHome />
      {/* <NavMobile /> */}
      <NavRight />
    </nav>
  );
}

export default Nav;
