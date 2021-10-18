import { useReducer, useState } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CandidateList } from "./CandidateList";
import axios from "axios";
export function Vote({ user, Logout }) {
  const { name } = useParams();
  const navigate = useNavigate();
  let method = "post";
  const [voting, setVoting] = useReducer((voting) => {
    voting = !voting;
  }, true);
  const [candidates, setCandidates] = useState({
    candidates: [],
    count: 0,
  });
  const [details, setDetails] = useState({ id: "" });
  const [error, setError] = useState("");
  async function getCandidates() {
    const res = await axios
      .get(`http://localhost:3000/candidate/${name}`)
      .then((res) => {
        // console.dir(res);
        setCandidates({
          candidates: res.data.candidates,
          count: candidates.count + 1,
        });
      })
      .catch((err) => {
        console.dir(err);
      });
  }
  if (candidates.count < 1 && voting) getCandidates();
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(details);
    if (!details.id) {
      setError("Please choose a candidate first");
      return;
    }

    const check = await axios
      .post(`http://localhost:3000/poll/${name}/check_vote`, {
        user_id: user._id,
      })
      .then((res) => {
        method = "put";
      })
      .catch((err) => {
        console.dir(err);
      });
    const res = await axios({
      method: method,
      url: `http://localhost:3000/poll/${name}/vote`,
      data: {
        user_id: user._id,
        candidate_id: details.id,
      },
    })
      .then((res) => {
        console.dir(res);
      })
      .catch((err) => {
        console.dir(err);
      });
    setVoting();
  };
  const toHome = () => {
    navigate("/");
  };
  return (
    <>
      <Navbar user={user} Logout={Logout} />
      {!voting ? (
        <>
          <div
            id="box"
            className="text-center align-self-middle align-item-center voteSuccess"
            fluid
          >
            <h1>{method == "put" ? "Edit" : ""}Voting Success</h1>
            <h3 className="chula">Results will be announced shortly</h3>
            <h5 onClick={toHome} className="my-3">
              <a className="link-primary">Return to homepage</a>
            </h5>
          </div>
        </>
      ) : (
        <>
          <Container fluid>
            <Row className="text-center py-5">
              <Col>
                <h1>Voting</h1>
                {error ? (
                  <>
                    <h4 class="error">{error}</h4>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Form onSubmit={submitHandler}>
              {candidates.candidates.map((candidate) => (
                <h5>
                  <CandidateList
                    candidate={candidate}
                    setdetails={setDetails}
                  />
                </h5>
              ))}
              <Row className="justify-content-center text-center mt-5">
                <Col>
                  {user.email ? (
                    <>
                      <Button
                        className="px-5 py-2"
                        style={{ fontSize: 24 }}
                        id="cuButton2"
                        type="submit"
                      >
                        Vote
                      </Button>
                    </>
                  ) : (
                    <>
                      <h4 className="error">Please Login to Vote</h4>
                    </>
                  )}
                </Col>
              </Row>
            </Form>
          </Container>
        </>
      )}
    </>
  );
}
export default Vote;
