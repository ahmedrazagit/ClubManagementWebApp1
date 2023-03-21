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
            <p>&copy; 2023 ClubPing | All Rights Reserved</p>
            <a href="/gdpr">GDPR</a>
          </p>
        </div>
      </Col>
    </Row>
  </div>
);

export default Footer;
