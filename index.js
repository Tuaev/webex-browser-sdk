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
