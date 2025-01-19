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

app.get("/video", async (req, res, next) => {
  try {
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

app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

// const GetTicketDetailsRequest = proto.nested.movie.GetTicketDetailsRequest;

// const main = () => {
//   try {
//     const err = GetTicketDetailsRequest.verify({
//       ticketPrice: {
//         Titanic: 160,
//       },
//     });

//     if (err) {
//       throw Error(err);
//     }
//     const request = GetTicketDetailsRequest.create({
//       ticketPrice: {
//         Titanic: 160,
//       },
//     });

//     const encodedRequest = GetTicketDetailsRequest.encode(request).finish();
//     console.log("Encoded Request:", encodedRequest);

//     movieClient.GetTicketDetails(request, (error, response) => {
//       if (error) {
//         console.log(error);
//         return;
//       }

//       console.log(response);
//       return;
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// main();
