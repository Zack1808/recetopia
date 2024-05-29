import React, { useState } from "react";

import Button from "../components/Button";
import Modal from "../components/Modal";
import RegistrationForms from "./RegistrationForms";

const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button primary onClick={() => setModalIsOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
        <RegistrationForms />
      </Modal>
    </div>
  );
};

export default Home;
