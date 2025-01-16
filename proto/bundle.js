 
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.setOptions({
  syntax: "proto3"
})
.addJSON({
  movie: {
    nested: {
      GetTicketDetailsRequest: {
        fields: {
          ticketPrice: {
            keyType: "string",
            type: "int32",
            id: 2
          }
        }
      },
      GetTicketDetailsResponse: {
        fields: {
          ticketPrice: {
            keyType: "string",
            type: "int32",
            id: 2
          }
        }
      },
      MovieService: {
        methods: {
          GetTicketDetails: {
            requestType: "GetTicketDetailsRequest",
            responseType: "GetTicketDetailsResponse"
          }
        }
      }
    }
  },
  user: {
    nested: {
      User: {
        fields: {
          id: {
            type: "int32",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      },
      GetUserDetailsRequest: {
        fields: {
          id: {
            type: "int32",
            id: 1
          }
        }
      },
      GetUserDetailsResponse: {
        fields: {
          user: {
            type: "User",
            id: 1
          }
        }
      },
      UserService: {
        methods: {
          GetUserDetails: {
            requestType: "GetUserDetailsRequest",
            responseType: "GetUserDetailsResponse"
          }
        }
      }
    }
  }
});

module.exports = $root;
