const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const proto = require("../proto/bundle");
const errorHandlerMiddleware = require("./middleware/error-middleware");
const movieClient = require("./client/movieClient");
const streamClient = require("./client/videoClient");
const userClient = require("./client/userClient");
const customErrorHandler = require("./handler/customErrorHandler");

app.use(express.static(path.resolve("../public")));
app.use(express.json());

app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "../public/index.html");

  return res.sendFile(filePath);
});

app.get("/video", async (req, res, next) => {
  try {
    console.log("Hello");
    const videoPath = path.resolve(__dirname, "../public/video/21.mp4");

    const streamCall = streamClient.StreamVideoFile({ filePath: videoPath });

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Transfer-Encoding", "chunked");

    streamCall.on("data", (data) => {
      res.write(data.data);
    });

    streamCall.on("end", () => {
      res.end();
    });
  } catch (err) {
    next(err);
  }
});

app.get("/static-video", async (req, res, next) => {
  const videoPath = path.resolve(__dirname, "../public/video/21.mp4");
  return res.sendFile(videoPath);
});

app.get("/add-user", (req, res) => {
  const filePath = path.resolve(__dirname, "../public/adduser.html");

  return res.sendFile(filePath);
});

app.post("/add-user", async (req, res, next) => {
  const AddUserRequest = proto.nested.user.AddUserRequest;
  const AddUserResponse = proto.nested.user.AddUserResponse;

  const { data } = req.body;

  const encodedRequestData = Buffer.from(data, "base64");
  try {
    const request = AddUserRequest.decode(encodedRequestData);

    console.log(request);

    const response = await new Promise((resolve, reject) => {
      userClient.AddUser(request, (error, response) => {
        if (error) {
          reject({
            details: error.details,
            message: error.message,
            code: error.code,
          });
        }
        resolve(response);
      });
    });

    const encodedResponse = AddUserResponse.encode(response).finish();

    return res.status(201).json(encodedResponse);
  } catch (error) {
    console.log(error);
    return customErrorHandler(
      {
        details: error.details || "Failed to add user",
        message: error.message || "Error from server",
        code: error.code || 500,
      },
      next
    );
  }
});
app.get("/set-price", (req, res) => {
  const filePath = path.resolve(__dirname, "../public/form.html");

  return res.sendFile(filePath);
});

app.post("/set-price", async (req, res, next) => {
  const GetTicketDetailsRequest = proto.nested.movie.GetTicketDetailsRequest;
  const GetTicketDetailsResponse = proto.nested.movie.GetTicketDetailsResponse;

  const encodedData = Buffer.from(req.body.data, "base64");

  try {
    const request = GetTicketDetailsRequest.decode(encodedData);

    movieClient.GetTicketDetails(request, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(response);

      const encodedResponse =
        GetTicketDetailsResponse.encode(response).finish();

      return res.status(201).json(encodedResponse);
    });
  } catch (error) {
    console.log(error);
    return next({
      message: "Failed to set price",
      code: 500,
      details: "Something went wrong",
    });
  }
});

app.get("/getUserDetails", (req, res) => {
  const filePath = path.resolve(__dirname, "../public/user.html");

  return res.sendFile(filePath);
});

app.post("/getUserDetails", async (req, res, next) => {
  try {
    const GetUserDetailsRequest = proto.nested.user.GetUserDetailsRequest;
    const GetUserDetailsResponse = proto.nested.user.GetUserDetailsResponse;

    const { data } = req.body;

    const encodedData = Buffer.from(data, "base64");

    const request = GetUserDetailsRequest.decode(encodedData);

    const response = await new Promise((resolve, reject) => {
      userClient.GetUserDetails(request, (error, response) => {
        if (error) {
          return reject({
            details: error.details || error.message,
            code: error.code,
          });
        }
        resolve(response);
      });
    });

    const encodedResponse = GetUserDetailsResponse.encode(response).finish();

    return res
      .status(201)
      .json({ message: "Data received successfully", encodedResponse });
  } catch (error) {
    console.log(error);
    return customErrorHandler(
      {
        message: error.details,
        code: error.code,
      },
      next
    );
  }
});

app.get("/stream-users", async (req, res, next) => {
  try {
    const GetUserDetailsResponse = proto.nested.user.GetUserDetailsResponse;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const call = userClient.GetStreamOfUsers({});

    call.on("data", (data) => {
      const encodedData = GetUserDetailsResponse.encode(data).finish();

      console.log(encodedData);
      res.write(
        JSON.stringify({
          data: btoa(String.fromCharCode.apply(null, encodedData)),
        })
      );
    });

    call.on("end", () => {
      res.end();
    });
  } catch (error) {
    console.log(error);
    return customErrorHandler(
      {
        message: error.details,
        code: error.code,
      },
      next
    );
  }
});

app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
