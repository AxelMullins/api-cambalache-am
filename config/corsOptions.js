const whitelist = [
    "https://api-cambalache-am.herokuapp.com/",
    "http://localhost:8080",
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  };

  module.exports = corsOptions;