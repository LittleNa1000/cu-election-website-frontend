import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./styles.css";
import { MdDateRange } from "react-icons/md";
import Chart from "react-google-charts";
export function Poll({ user, Logout }) {
  const { name } = useParams();
  const [poll, setPoll] = useState({
    poll_name: "",
    poll_description: "",
    start_date: "",
    end_date: "",
    count: 0,
  });
  const [candidates, setCandidates] = useState({
    candidates: [],
    count: 0,
  });
  const [total, setTotal] = useState({
    total: 0,
    wins: { candidates: [], vote: 0 },
    result: [],
    resultList: [],
    count: 0,
  });
  const [status, setStatus] = useState({
    status: "",
    count: 0,
  });
  async function getPoll() {
    const res = await axios
      .get(`http://localhost:3000/poll/${name}`)
      .then((res) => {
        setPoll({
          poll_name: res.data.polls.poll_name,
          poll_description: res.data.polls.poll_description,
          start_date: res.data.polls.start_date,
          end_date: res.data.polls.end_date,
          count: poll.count + 1,
        });
      })
      .catch((err) => {
        console.dir(err);
      });
  }
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
  async function getTotal() {
    const res = await axios
      .get(`http://localhost:3000/result/${name}`)
      .then((res) => {
        const resultList = [];
        resultList.push(["Candidates", "Votes"]);
        res.data.result.forEach((element) => {
          resultList.push([
            `${element.candidate_name} ${element.candidate_surname}`,
            element.vote,
          ]);
        });
        setTotal({
          total: res.data.Total,
          result: res.data.result,
          resultList: resultList,
          wins: {
            candidates: res.data.wins.candidates,
            vote: res.data.wins.vote,
          },
          count: total.count + 1,
        });
      })
      .catch((err) => {
        console.dir(err);
      });
  }
  async function getStatus() {
    const res = await axios
      .post(`http://localhost:3000/poll/${name}/check`, {
        date: new Date().toISOString().slice(0, 10),
      })
      .then((res) => {
        setStatus({ status: "ongoing", count: status.count + 1 });
      })
      .catch((err) => {
        if (err.response.data.message == "หมดเวลาโหวต") {
          setStatus({ status: "ended", count: status.count + 1 });
        } else {
          setStatus({ status: "soon", count: status.count + 1 });
        }
      });
  }
  if (poll.count < 1) getPoll();
  if (candidates.count < 1) getCandidates();
  if (total.count < 1) getTotal();
  if (status.count < 1) getStatus();
  console.log(total.resultList);
  const navigate = useNavigate();
  const toRules = () => {
    navigate(`/poll/${poll.poll_name}/rules`);
  };
  const toOngoingVotes = () => {
    navigate("/ongoingvotes");
  };
  return (
    <>
      <Navbar user={user} Logout={Logout} />
      <Container className=" m-5 mx-auto px-5 py-4 " id="box">
        <Row className="mb-3 px-2">
          <Col
            id={`${status.status}`}
            xs={1}
            className="text-center px-2 align-self-center py-2"
          >
            <h6>{status.status}</h6>
          </Col>
          <Col className="align-self-end">
            {poll.poll_name ? (
              <>
                <h2>{poll.poll_name}</h2>
              </>
            ) : (
              <>
                <h2 className="error">Poll not found</h2>
              </>
            )}
          </Col>

          <Col className="align-self-end text-end" xs={3}>
            <h5>Total: {total.total} votes</h5>
          </Col>
        </Row>
        <Row className="p-0">
          <hr></hr>
        </Row>
        {status.status == "ended" ? (
          <>
            <Row>
              <Col xs={7}>
                <h3 style={{ fontSize: 28 }}>
                  <b>Candidates</b>
                </h3>
                <ol className="px-5">
                  {total.result.map((candidate) => (
                    <li style={{ fontSize: 20, lineHeight: "200%" }}>
                      {candidate.candidate_name} {candidate.candidate_surname}
                    </li>
                  ))}
                </ol>
                <h3>
                  Number{" "}
                  {total.wins.candidates.map((candidate) => (
                    <>{candidate.no} </>
                  ))}{" "}
                  Wins, with {total.wins.vote} votes
                </h3>
              </Col>
              <Col className="align-self-center text-center">
                <Chart
                  width={"100%"}
                  height={"100%"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={total.resultList}
                  rootProps={{ "data-testid": "1" }}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="mt-3">
              <Col xs={8}>
                <h3 style={{ fontSize: 28 }}>
                  <b>Candidates</b>
                </h3>
              </Col>
              <Col className="text-end">
                <h4 style={{ fontSize: 22 }}>
                  <MdDateRange /> {poll.start_date} - {poll.end_date}
                </h4>
              </Col>
            </Row>
            <Row>
              <ol className="px-5">
                {candidates.candidates.map((candidate) => (
                  <li style={{ fontSize: 20 }}>
                    {candidate.candidate_name} {candidate.candidate_surname}
                  </li>
                ))}
              </ol>
            </Row>
            <Row className="my-3">
              <Col>
                <h3 style={{ fontSize: 28 }}>
                  <b>Description</b>
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ fontSize: 20 }}>{poll.poll_description}</p>
              </Col>
            </Row>
          </>
        )}
        <Row className="justify-content-center text-center mx-auto mt-5">
          <Col>
            <Button
              className="px-5 py-2"
              id="cuButton"
              onClick={status.status == "ongoing" ? toRules : toOngoingVotes}
              disabled={status.status == "soon" ? true : false}
            >
              {status.status == "ended" ? "Close" : "Proceed to voting"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Poll;
