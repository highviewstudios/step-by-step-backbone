import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserNav from './userNav';

function Nav() {
  return (
    <nav>
    <Row>
    <Col></Col>
    <Col>
        <h1><strong>My STAFF</strong></h1>
        <h2><strong>Space, Times, Flexible, Facilities</strong></h2>
    </Col>
    <Col>
        <div className="user-nav">
          <UserNav />
        </div>
      </Col>
      </Row>
    </nav>
  );
}

export default Nav;