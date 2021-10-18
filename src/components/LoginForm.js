import { useState } from "react";
import Navbar from "./Navbar";
import "./styles.css";
import {
  Row,
  Col,
  Form,
  Container,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
const axios = require("axios");
export function LoginForm({ user, Login, Logout }) {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(details);
    const res = await axios
      .post("http://localhost:3000/login", details)
      .then((res) => {
        Login(res.data.user);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <>
      <Navbar user={user} Logout={Logout} />
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <div className="text-center mt-5 mb-4 p-4">
              <h1>Online Election System</h1>
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={5}>
            <div id="box">
              <Container>
                <Row>
                  <Col className="p-2 mt-4 text-center">
                    <h2>Login</h2>
                    {error ? <h4 className="error">{error}</h4> : ""}
                  </Col>
                </Row>
                <Row>
                  <Col className="px-5 mx-1 my-3">
                    <Form onSubmit={submitHandler}>
                      <FormGroup className="mb-3" controlId="formGridEmail">
                        <FormLabel htmlFor="email">Email </FormLabel>
                        <FormControl
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Type your email"
                          onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                          }
                          value={details.email}
                        />
                      </FormGroup>
                      <FormGroup className="mb-3" controlId="formGridPassword">
                        <FormLabel htmlFor="password">Password </FormLabel>
                        <FormControl
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Type your password"
                          onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                          }
                          value={details.password}
                        />
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="submitButton loginButton px-5"
                          id="cuButton2"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
export default LoginForm;
