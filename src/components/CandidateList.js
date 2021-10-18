import "./styles.css";
import {
  Row,
  Col,
  Container,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
} from "react-bootstrap";
export function CandidateList({ candidate, setdetails }) {
  return (
    <>
      <Row
        id="box"
        className="py-3 px-1 mx-5 my-4 align-self-middle"
        style={{ fontSize: 24 }}
      >
        <FormGroup
          className="my-1"
          controlId={`${candidate.candidate_name} ${candidate.candidate_surname}`}
        >
          <FormCheck
            type="radio"
            label={`${candidate.candidate_name} ${candidate.candidate_surname}`}
            id={`${candidate._id}`}
            className="radio"
            name="candidate"
            onChange={(e) => {
              setdetails({ id: candidate._id });
            }}
          ></FormCheck>
        </FormGroup>
      </Row>
    </>
  );
}
export default CandidateList;
