const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const proto = require("../proto/bundle");
const errorHandlerMiddleware = require("./middleware/error-middleware");
const movieClient = require("./client/movieClient");
const streamClient = require("./client/videoClient");

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

app.get("/set-price", (req,res) => {
  const filePath = path.resolve(__dirname, "../public/form.html");

  return res.sendFile(filePath);
});


app.post("/set-price", async (req, res, next) => {
  const GetTicketDetailsRequest = proto.nested.movie.GetTicketDetailsRequest;
  const GetTicketDetailsResponse = proto.nested.movie.GetTicketDetailsResponse;

  const { movieName, price } = req.body;

  console.log(req.body);
  const ticketPrice = {};

  ticketPrice[movieName] = price;
  console.log(ticketPrice);
  try {
    const err = GetTicketDetailsRequest.verify({
      ticketPrice,
    });

    if (err) {
      throw Error(err);
    }
    const request = GetTicketDetailsRequest.create({
      ticketPrice: ticketPrice,
    });
    console.log(request);

    const encodedRequest = GetTicketDetailsRequest.encode(request).finish();
    console.log("Encoded Request:", encodedRequest);

    movieClient.GetTicketDetails(request, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(response);

      // const decodedResponse = GetTicketDetailsResponse.decode(response);
      // console.log(decodedResponse);
      const encodedResponse =
        GetTicketDetailsResponse.encode(response).finish();
      console.log(encodedResponse);
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

app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

// const main = () => {
//   try {

//       console.log(response);
//       return;
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// main();
