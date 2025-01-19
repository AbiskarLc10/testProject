const grpc = require("@grpc/grpc-js");
const fs = require("fs");
const path = require("path");
const StreamVideoFile = (call) => {
  const { filePath } = call.request;

  try {
    if (!filePath) {
      throw new Error("File Path not received");
    }

    const fileResolvedPath = path.resolve(filePath);
    const videoStream = fs.createReadStream(fileResolvedPath, {
      highWaterMark: 1024 * 1024,
    });

    videoStream.on("data", (chunk) => {
      call.write({
        data: chunk,
      });
    });

    videoStream.on("end", () => {
      call.end();
    });
    videoStream.on("error", (err) => {
      call.emit("error", err);
    });
  } catch (error) {
    console.log(error);
    return call.emit("error", {
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

module.exports = StreamVideoFile;
