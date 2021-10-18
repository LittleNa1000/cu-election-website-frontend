import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";
function ElectionRules() {
  return (
    <div>
      <h2>Election Rules</h2>
      <ol>
        <li>1 คน เลือกได้ 1 เสียง</li>
        <li>มีระยะเวลาและแก้ไขเลือกได้ 1 week</li>
        <li>แก้ไขการโหวตกี่ครั้งก็ได้</li>
      </ol>
    </div>
  );
}
export function Rules({ user, Logout }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const toVote = () => {
    navigate(`/poll/${name}/vote`);
  };
  return (
    <>
      <Navbar user={user} Logout={Logout} />
      <Container fluid>
        <Row className="text-center py-5">
          <Col>
            <h1>Election Rules and Regulations</h1>
          </Col>
        </Row>
        <Row
          className="text-center pb-5"
          style={{
            paddingLeft: "20%",
            paddingRight: "20%",
            fontSize: 20,
            lineHeight: "190%",
          }}
        >
          <Col>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed
              ante pellentesque, lacinia lectus sit amet, lacinia tellus.
              Suspendisse semper dolor non ornare blandit. Morbi eget augue id
              leo pretium tincidunt. Curabitur sodales ante sed sapien rutrum
              sodales. Proin pulvinar nulla in diam gravida, non
              fermentumorcirutrum. Proin sed est rhoncus, pellentesque ex sit
              amet, accumsan lectus. Mauris vel urna tincidunt, facilisis dui a,
              sodales quam. Pellentesque rutrum odio interdum, pulvinar nulla
              nec, maximus lectus. Cras sed dui at massa dignissim molestie sit
              amet vitae erat. Lorem ipsum dolor sit amet, consectetur
              adipiscingelit. Nunc sed ante pellentesque, lacinia lectus sit
              amet, lacinia tellus. Suspendisse semper dolor non ornare blandit.
              Morbi eget augue id leo pretium tincidunt. Curabitur sodales ante
              sed sapien rutrum sodales. Proin pulvinar nulla in diam gravida,
              non fermentum orci rutrum.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center text-center mt-5">
          <Col>
            <Button className="px-5 py-2" id="cuButton" onClick={toVote}>
              Accept and Proceed
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Rules;
