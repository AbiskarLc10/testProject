const proto = require("../proto/bundle");
const movieClient = require("./client/movieClient");

const GetTicketDetailsRequest = proto.nested.movie.GetTicketDetailsRequest;




const main = () => {
  try {

    const err = GetTicketDetailsRequest.verify({
        ticketPrice: {
          Titanic: 160,
        },
      });

    if(err){
        throw Error(err);
    }
    const request = GetTicketDetailsRequest.create({
        ticketPrice: {
          Titanic: 160,
        },
      });


    const encodedRequest = GetTicketDetailsRequest.encode(request).finish();
    console.log("Encoded Request:", encodedRequest);

    
    movieClient.GetTicketDetails(request, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log(response);
      return;
    });
  } catch (error) {
    console.log(error.message);
  }
};

main();
