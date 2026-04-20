import React, { useEffect } from 'react';

const JitsiMeet = () => {
  useEffect(() => {
    // Load the Jitsi Meet API when the component mounts
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'ReactJitsiConferenceRoom',  // Change this to your room name
      width: '100%',
      height: 700,
      parentNode: document.getElementById('jitsi-container'),
      configOverwrite: {
        // Optional: Add any configuration overrides here
      },
      interfaceConfigOverwrite: {
        // Optional: Customize the interface here
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); // Clean up Jitsi API when component is unmounted
  }, []);

  return (
    <div>
      <h1>Join the Video Conference</h1>
      <div id="jitsi-container" style={{ height: '700px', width: '100%' }} />
    </div>
  );
};

export default JitsiMeet;
