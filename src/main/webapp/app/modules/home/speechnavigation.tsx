import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SpeechNav: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleOk = () => {
    setShowDisclaimer(false);
  };

  return (
    <div>
      <Modal show={showDisclaimer} onHide={handleOk}>
        <Modal.Header closeButton>
          <Modal.Title>Speech recognition accessibility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If you are someone who would like to access the website without a keyboard and would like to navigate using voice,
            <br />
            please have someone download the lipsurf extension for you or you can download it yourself by{' '}
            <a href="https://chrome.google.com/webstore/detail/lipsurf-voice-control-for/lnnmjmalakahagblkkcnjkoaihlfglon?hl=en">
              {' '}
              clicking here{' '}
            </a>{' '}
            and follow the steps to activate it, to navigate the app via speech. <br />
            Here are the commands you can say once you've enabled it:
            <br /> "scroll up"
            <br /> "scroll down"
            <br />
            To click a button say: "click (button name)".
            <br /> Say: "sleep" to switch off the extension
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {!showDisclaimer}
    </div>
  );
};

export default SpeechNav;
