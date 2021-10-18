import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useReducer } from "react";
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
export function SignupForm({ user, Logout }) {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    surname: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(details);
    const res = await axios
      .post("http://localhost:3000/register", details)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  const [page, setPage] = useReducer((page) => !page, true);
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
                    <h2>Signup</h2>
                    {error ? <h4 className="error">{error}</h4> : ""}
                  </Col>
                </Row>
                <Row>
                  <Col className="px-5 mx-1 my-3">
                    <Form onSubmit={submitHandler}>
                      {page ? (
                        <>
                          <FormGroup className="mb-3" controlId="formGridEmail">
                            <FormLabel htmlFor="email">Email </FormLabel>
                            <FormControl
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Type your email"
                              onChange={(e) =>
                                setDetails({
                                  ...details,
                                  email: e.target.value,
                                })
                              }
                              value={details.email}
                            />
                          </FormGroup>
                          <FormGroup
                            className="mb-3"
                            controlId="formGridPassword"
                          >
                            <FormLabel htmlFor="password">Password </FormLabel>
                            <FormControl
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Type your password"
                              onChange={(e) =>
                                setDetails({
                                  ...details,
                                  password: e.target.value,
                                })
                              }
                              value={details.password}
                            />
                          </FormGroup>
                          <FormGroup
                            className="mb-3"
                            controlId="formGridConfirmPassword"
                          >
                            <FormLabel htmlFor="confirm_password">
                              Confirm your password
                            </FormLabel>
                            <FormControl
                              type="password"
                              name="confirm_password"
                              id="confirm_password"
                              placeholder="Confirm your password"
                              onChange={(e) =>
                                setDetails({
                                  ...details,
                                  confirm_password: e.target.value,
                                })
                              }
                              value={details.confirm_password}
                            />
                          </FormGroup>
                          <Container className="text-center">
                            <Row>
                              <Col>
                                <Button
                                  onClick={setPage}
                                  id="cuButton2"
                                  className="submitButton mt-5 mb-2 px-4"
                                >
                                  Next
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </>
                      ) : (
                        <>
                          <FormGroup className="mb-3" controlId="formGridName">
                            <FormLabel htmlFor="name">Name </FormLabel>
                            <FormControl
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Type your name"
                              onChange={(e) =>
                                setDetails({
                                  ...details,
                                  name: e.target.value,
                                })
                              }
                              value={details.name}
                            />
                          </FormGroup>
                          <FormGroup
                            className="mb-3"
                            controlId="formGridSurname"
                          >
                            <FormLabel htmlFor="surname">Surname </FormLabel>
                            <FormControl
                              type="text"
                              name="surname"
                              id="surname"
                              placeholder="Type your surname"
                              onChange={(e) =>
                                setDetails({
                                  ...details,
                                  surname: e.target.value,
                                })
                              }
                              value={details.surname}
                            />
                          </FormGroup>
                          <FormGroup className="mb-3" controlId="formGridPhone">
                            <FormLabel htmlFor="phone">Phone Number</FormLabel>
                            <FormControl
                              type="tel"
                              name="phone"
                              id="phone"
                              placeholder="Type your phone number"
                              onChange={(e) =>
                                setDetails({
                                  ...details,
                                  phone: e.target.value,
                                })
                              }
                              value={details.phone}
                            />
                          </FormGroup>
                          <Container className="text-center">
                            <Row>
                              <Col>
                                <Button
                                  onClick={setPage}
                                  id="cuButton2"
                                  className="submitButton mt-5 mb-2 px-4"
                                >
                                  Back
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  type="submit"
                                  id="cuButton2"
                                  className="submitButton mt-5 mb-2 px-4"
                                >
                                  Register
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </>
                      )}
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
export default SignupForm;
