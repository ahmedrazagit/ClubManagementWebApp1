import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <div className="text-center" style={{ fontSize: '10px' }}>
          <p>
            <Translate contentKey="footer">Your footer</Translate>
            {/*<p>&copy; 2023 ClubPing | All Rights Reserved</p>*/}
            <p>
              Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow
              users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we
              cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial
              information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all
              associated data will be destroyed.
            </p>
            <a href="/gdpr">GDPR</a>
          </p>
        </div>
      </Col>
    </Row>
  </div>
);

export default Footer;
