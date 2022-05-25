import React from "react";
import {
  Modal,
  Col,
  Row,
  Stack,
  Button,
  Container,
  Image,
} from "react-bootstrap";
import {
  dialogStyle,
  dialogWidth,
  titleStyle,
  closeStyle,
  headerStyle,
  closeColumnStyle,
} from "./LargeCard.module.css";

const LargeCard = ({
  show,
  handleClose,
  image,
  children,
  title,
  subHeader,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen="lg-down"
      scrollable="true"
      dialogClassName={dialogStyle + " " + dialogWidth}
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header className={headerStyle + " px-0 pt-2"}>
        <Container fluid>
          <Row>
            <Col xs={10} lg>
              <Row>
                <Col md="auto pl-0 mb-2">
                  <Image src={image} alt="an image" height={150} />
                </Col>
                <Col>
                  <Stack direction="horizontal" gap={1}>
                    <Stack gap={1}>
                      <Modal.Title
                        className={titleStyle + " display-3"}
                        as="div"
                      >
                        {title}
                      </Modal.Title>
                      {subHeader}
                    </Stack>
                  </Stack>
                </Col>
              </Row>
            </Col>
            <Col lg="auto pl-0" xs={2} className={closeColumnStyle}>
              <Button
                className={closeStyle + " mt-2 me-2 btn-close-white"} //btn-close
                aria-label="Close"
                variant="none"
                onClick={handleClose}
              ></Button>
            </Col>
          </Row>
        </Container>
      </Modal.Header>
      {children}
    </Modal>
  );
};

export default LargeCard;
