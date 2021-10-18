import { useNavigate } from "react-router";
import { Container, Navbar, NavbarBrand, Nav, NavLink } from "react-bootstrap";
export function Header({ user, Logout }) {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };
  const toOngoingVotes = () => {
    navigate("/ongoingvotes");
  };
  const toAbout = () => {
    navigate("/about");
  };
  const toProfile = () => {
    navigate("/profile");
  };
  return (
    <Navbar variant="dark" style={{ backgroundColor: "#DE5C8E" }}>
      <Container fluid>
        <NavbarBrand style={{ width: 100 }}>
          <img
            src="https://support.it.chula.ac.th/Runtime/Styles/Themes/ITSM_img/login_logo.PNG"
            width="100%"
            height="100%"
            alt="วิศวะจุฬา ตึก 1"
            style={{ backgroundColor: "white" }}
            onClick={toHome}
          ></img>
        </NavbarBrand>
        <Nav>
          <NavLink onClick={toHome}>Home</NavLink>
          <NavLink onClick={toOngoingVotes}>Ongoing Votes</NavLink>
          <NavLink onClick={toAbout}>About</NavLink>
        </Nav>
        <Nav>
          {!user.email ? (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/signup">Signup</NavLink>
            </>
          ) : (
            <>
              <NavLink onClick={toProfile}>
                Welcome, {user.name} {user.surname}
              </NavLink>
              <NavLink onClick={Logout}>Logout</NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
