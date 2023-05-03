import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import OpenAIChat from './OpenAIChatBox';

const AIAdviceBotPage: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleOk = () => {
    setShowDisclaimer(false);
  };

  return (
    <div>
      <Modal show={showDisclaimer} onHide={handleOk}>
        <Modal.Header closeButton>
          <Modal.Title>Disclaimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This is an AI-powered chat. <br /> By using this page, you agree that you understand and accept that the responses are generated
            by an artificial intelligence model and may not be accurate or appropriate in all situations. <br /> The AI is powered using the
            OpenAI API so please have a look at their <a href="https://openai.com/privacy-policy/">privacy policy</a> as they are a 3rd
            party service.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {!showDisclaimer && <OpenAIChat />}
    </div>
  );
};

export default AIAdviceBotPage;
