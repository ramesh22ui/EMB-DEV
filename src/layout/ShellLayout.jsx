import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShellLayout = (props) => {
  const navigate = useNavigate();

  const navigateToInformation = () => {
    navigate('/information');
  };

  return (
    <div>
      <nav>
        <span onClick={navigateToInformation}>Home</span>
      </nav>
      {props.children}
    </div>
  );
};

export default ShellLayout;
