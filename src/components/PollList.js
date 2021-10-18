import { Container, Row, Col, Button } from "react-bootstrap";
import "./styles.css";
import { useNavigate } from "react-router";
export function PollList({ poll }) {
  const navigate = useNavigate();
  const viewPoll = () => {
    navigate(`/poll/${poll.poll_name}`);
  };
  return (
    <Container fluid className="py-3 justify-content-center poll mb-4">
      <Row>
        <Col xs={8} className="my-auto">
          {poll.poll_name}
        </Col>
        <Col className="my-auto">Total: {poll.total} Votes</Col>
        <Col className="my-auto ">
          <Button className="px-4" id="cuButton" onClick={viewPoll}>
            View
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default PollList;
