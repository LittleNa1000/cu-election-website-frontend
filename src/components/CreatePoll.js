import Navbar from "./Navbar";
import {
  Col,
  Row,
  Form,
  Container,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
export function CreatePoll({ user, Logout }) {
  const navigate = useNavigate();
  const toProfile = () => {
    navigate("/profile");
  };
  const [details, setDetails] = useState({
    poll_name: "",
    poll_description: "",
    start_date: "",
    end_date: "",
    candidate1: "",
    candidate2: "",
    candidate3: "",
    candidate4: "",
  });
  const [error, setError] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(details);
    const candidates = [];
    candidates.push({
      candidate_name: details.candidate1.split(" ")[0],
      candidate_surname: details.candidate1.split(" ")[1],
    });
    candidates.push({
      candidate_name: details.candidate2.split(" ")[0],
      candidate_surname: details.candidate2.split(" ")[1],
    });
    candidates.push({
      candidate_name: details.candidate3.split(" ")[0],
      candidate_surname: details.candidate3.split(" ")[1],
    });
    candidates.push({
      candidate_name: details.candidate4.split(" ")[0],
      candidate_surname: details.candidate4.split(" ")[1],
    });
    const reqBody = {
      poll_name: details.poll_name,
      poll_description: details.poll_description,
      start_date: details.start_date,
      end_date: details.end_date,
      candidate: candidates,
    };
    console.log(reqBody);
    const res = await axios
      .post("http://localhost:3000/create_poll", reqBody)
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <>
      <Navbar user={user} Logout={Logout} />
      <Container className="p-3 m-5 mx-auto" id="box">
        <Row className="mt-2 mb-5 mx-2">
          <Col>
            <h1 className="mb-2">Create Poll</h1>
            {error ? <h4 className="error">{error}</h4> : ""}
          </Col>
        </Row>
        {!user.is_admin ? (
          <>
            <Row>
              <Col>
                <h4 className="error">Only admins can create a poll</h4>
              </Col>
            </Row>
          </>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <FormGroup className="mb-3" controlId="formGridPollName">
                  <FormLabel htmlFor="pollName">Poll Name </FormLabel>
                  <FormControl
                    type="text"
                    name="pollName"
                    id="pollName"
                    placeholder="Enter poll name"
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        poll_name: e.target.value,
                      })
                    }
                    value={details.poll_name}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3" controlId="formGridCandidate1">
                  <FormLabel htmlFor="candidate1">Candidate 1 </FormLabel>
                  <FormControl
                    type="text"
                    name="candidate1"
                    id="candidate1"
                    placeholder="Enter Name and Surname of Candidate 1"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        candidate1: e.target.value,
                      });
                    }}
                    value={details.candidate1}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className="mb-3" controlId="formGridPollDescription">
                  <FormLabel htmlFor="pollDescription">
                    Poll Description
                  </FormLabel>
                  <FormControl
                    type="text"
                    name="pollDescription"
                    id="pollDescription"
                    placeholder="Enter poll description"
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        poll_description: e.target.value,
                      })
                    }
                    value={details.poll_description}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3" controlId="formGridCandidate2">
                  <FormLabel htmlFor="candidate2">Candidate 2 </FormLabel>
                  <FormControl
                    type="text"
                    name="candidate2"
                    id="candidate2"
                    placeholder="Enter Name and Surname of Candidate 2"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        candidate2: e.target.value,
                      });
                    }}
                    value={details.candidate2}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className="mb-3" controlId="formGridStartDate">
                  <FormLabel htmlFor="startDate">Start Date </FormLabel>
                  <FormControl
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="Choose Start Date"
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        start_date: e.target.value,
                      })
                    }
                    value={details.start_date}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3" controlId="formGridCandidate3">
                  <FormLabel htmlFor="candidate3">Candidate 3 </FormLabel>
                  <FormControl
                    type="text"
                    name="candidate3"
                    id="candidate3"
                    placeholder="Enter Name and Surname of Candidate 3"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        candidate3: e.target.value,
                      });
                    }}
                    value={details.candidate3}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className="mb-3" controlId="formGridEndDate">
                  <FormLabel htmlFor="endDate">End Date </FormLabel>
                  <FormControl
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="Choose End Date"
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        end_date: e.target.value,
                      })
                    }
                    value={details.end_date}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3" controlId="formGridCandidate4">
                  <FormLabel htmlFor="candidate4">Candidate 4 </FormLabel>
                  <FormControl
                    type="text"
                    name="candidate4"
                    id="candidate4"
                    placeholder="Enter Name and Surname of Candidate 4"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        candidate4: e.target.value,
                      });
                    }}
                    value={details.candidate4}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center text-center mx-auto">
              <Col>
                <Button className="px-5" id="cuButton" onClick={toProfile}>
                  Back
                </Button>
              </Col>
              <Col>
                <Button className="px-5 " id="cuButton" type="submit">
                  Create Poll
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </>
  );
}
export default CreatePoll;
