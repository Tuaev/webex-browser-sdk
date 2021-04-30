// Development token lasts 12 hours
const ACCESS_TOKEN =
  'NjBlOGJiNDItM2YwYS00ZDczLTk4OTQtY2MxNjc3MzY2MWYxZjRkMmE0OTYtNzdi_PE93_23df57c9-c698-4101-9d39-db7aac8ecafd';

const webex = window.Webex.init({
  credentials: {
    access_token: ACCESS_TOKEN,
  },
});

webex.meetings
  .register()
  .then(() => console.log('Connected'))
  .catch((err) => {
    console.error(err);
    alert(err);
    throw err;
  });

const bindMeetingEvents = (meeting) => {
  meeting.on('error', (err) => console.error(err));

  // Handle media streams changes to ready state
  meeting.on('media:ready', (media) => {
    if (!media) return;

    if (media.type === 'local') {
      document.querySelector('#self-view').srcObject = media.stream;
    }

    if (media.type === 'remoteVideo') {
      document.querySelector('#remote-view-video').srcObject = media.stream;
    }

    if (media.type === 'remoteAudio') {
      document.querySelector('#remote-view-audio').srcObject = media.stream;
    }
  });

  // Handle media streams stopping
  meeting.on('media:stopped', (media) => {
    // Remove media streams
    if (media.type === 'local') {
      document.querySelector('#self-view').srcObject = null;
    }
    if (media.type === 'remoteVideo') {
      document.querySelector('#remote-view-video').srcObject = null;
    }
    if (media.type === 'remoteAudio') {
      document.querySelector('#remote-view-audio').srcObject = null;
    }
  });

  // Handle leaving the meeting
  document.querySelector('#hangup').addEventListener('click', () => {
    meeting.leave();
  });
};

// Join the meeting and add media
const joinMeeting = (meeting) => {
  return meeting.join().then(() => {
    const mediaSettings = {
      receiveVideo: true,
      receiveAudio: true,
      receiveShare: false,
      sendVideo: true,
      sendAudio: true,
      sendShare: false,
    };

    return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
      const [localStream, localShare] = mediaStreams;

      meeting.addMedia({
        localShare,
        localStream,
        mediaSettings,
      });
    });
  });
};
