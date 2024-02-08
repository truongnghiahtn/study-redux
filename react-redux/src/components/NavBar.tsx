/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeMode } from "../redux/app/appSlide";
const NavBar = () => {
  const mode = useAppSelector(state => state.app.mode)
  const dispatch = useAppDispatch();
  useEffect(() => {
    const test = document.createAttribute("data-bs-theme");
    test.value = mode;
    const body: any = document.querySelector("body");
    body.setAttributeNode(test);
  }, [mode]);
  return (
    <>
      <Navbar expand="xl" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Nav>
              <Form.Check
                defaultChecked={mode === "light" ? false : true}
                type="switch"
                id="custom-switch"
                label={
                  mode === "light" ? (
                    <Navbar.Text>Light</Navbar.Text>
                  ) : (
                    <Navbar.Text>Dark</Navbar.Text>
                  )
                }
                onChange={(e) => {
                  dispatch(changeMode(e.target.checked === true ? "dark" : "light"))
                }}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
