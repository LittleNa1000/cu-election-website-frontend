import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Navbar from "./Navbar";
import "./styles.css";
import axios from "axios";
import { PollList } from "./PollList";
import { useNavigate } from "react-router";
export function Profile({ user, Logout }) {
  const info = user.is_admin ? "Polls" : "Votes";
  const url = `http://localhost:3000/${user.is_admin ? "poll" : "your_vote"}`;
  let method = user.is_admin ? "get" : "post";
  const [details, setDetails] = useState({
    total: 0,
    polls: [],
    count: 0,
  });
  async function getData() {
    const res = await axios({
      method: method,
      url: url,
      data: {
        user_id: user._id,
      },
    })
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

  const navigate = useNavigate();
  const toCreatePoll = () => {
    navigate("/create_poll");
  };
  return (
    <>
      <Navbar user={user} Logout={Logout} />
      <Container className="p-3 m-5 mx-auto" id="box">
        <Row className="mt-2 mb-5 mx-2">
          <Col xs={9}>
            <h1 className="mb-4">Profile</h1>
            {!user.email ? (
              <>
                <h4 className="error">Please Login before viewing profile</h4>
              </>
            ) : (
              <>
                <Container className="p-0 m-0" style={{ fontSize: 18 }}>
                  <Row>
                    <Col xs={4}>
                      {user.name} {user.surname}
                    </Col>
                    <Col>Phone Number: {user.phone}</Col>
                  </Row>
                </Container>
              </>
            )}
          </Col>
          <Col className="text-center mx-5 p-4 " id="total">
            {details.total} Total {info}
          </Col>
        </Row>
        <Row className="mt-2 mb-4 mx-2">
          <Col>
            <h2>Your {info}</h2>
            <hr></hr>
            {details.polls.map((poll) => (
              <PollList poll={poll} />
            ))}
          </Col>
        </Row>
        {user.is_admin ? (
          <>
            <Row>
              <Col xs={10}></Col>
              <Col>
                <Button className="px-4" id="cuButton" onClick={toCreatePoll}>
                  Create Poll
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
export default Profile;
