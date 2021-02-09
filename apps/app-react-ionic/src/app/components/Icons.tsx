import React, { useEffect, useState } from 'react';
import { closeOutline, closeCircle, reorderThreeOutline } from 'ionicons/icons';

const Icons = (props) => {

  const [state, setState] = useState();

  useEffect(() => {
    // return () => { };
  }, []);

  return (
    <div>
      <h3 style={{ background: '#ccc', padding: '15px' }}>
        {'Icons - placeholder' }
      </h3>
    </div>
  );
};

export default Icons;
