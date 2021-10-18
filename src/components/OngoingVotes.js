import Navbar from "./Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { PollList } from "./PollList";
import { useState } from "react";
import axios from "axios";
export function OngoingVotes({ user, Logout }) {
  const url = `http://localhost:3000/poll`;
  const [details, setDetails] = useState({
    total: 0,
    polls: [],
    count: 0,
  });
  async function getData() {
    const res = await axios
      .get(url)
      .then((res) => {
        setDetails({
          total: res.data.total_poll,
          polls: res.data.polls,
          count: details.count + 1,
        });
      })
      .catch((err) => {
        console.dir(err);
      });
  }
  if (details.count < 1) getData();
  return (
    <>
      <Navbar user={user} Logout={Logout} />
      <Container className=" m-5 mx-auto px-5 py-4 " id="box">
        <Row className="mb-3 ">
          <Col className="align-self-end" xs={10}>
            <h2>Ongoing Votes</h2>
          </Col>
        </Row>
        <Row className="px-2">
          <hr></hr>
        </Row>
        <Row className="mt-2 mb-4 ">
          <Col>
            {details.polls.map((poll) => (
              <PollList poll={poll} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
