/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = (
  $protobuf.roots["default"] ||
  ($protobuf.roots["default"] = new $protobuf.Root())
)
  .setOptions({
    syntax: "proto3",
  })
  .addJSON({
    movie: {
      nested: {
        GetTicketDetailsRequest: {
          fields: {
            ticketPrice: {
              keyType: "string",
              type: "int32",
              id: 2,
            },
          },
        },
        GetTicketDetailsResponse: {
          fields: {
            ticketPrice: {
              keyType: "string",
              type: "int32",
              id: 2,
            },
          },
        },
        MovieService: {
          methods: {
            GetTicketDetails: {
              requestType: "GetTicketDetailsRequest",
              responseType: "GetTicketDetailsResponse",
            },
          },
        },
      },
    },
    user: {
      nested: {
        User: {
          fields: {
            id: {
              type: "int32",
              id: 1,
            },
            name: {
              type: "string",
              id: 2,
            },
            email: {
              type: "string",
              id: 3,
            },
            age: {
              type: "int32",
              id: 4,
            },
            address: {
              type: "string",
              id: 5,
            },
          },
        },
        AddUserRequest: {
          fields: {
            user: {
              type: "User",
              id: 1,
            },
          },
        },
        AddUserResponse: {
          fields: {
            message: {
              type: "string",
              id: 1,
            },
            success: {
              type: "bool",
              id: 2,
            },
          },
        },
        GetUserDetailsRequest: {
          fields: {
            id: {
              type: "int32",
              id: 1,
            },
          },
        },
        GetUserDetailsResponse: {
          fields: {
            user: {
              type: "User",
              id: 1,
            },
          },
        },
        UserService: {
          methods: {
            GetUserDetails: {
              requestType: "GetUserDetailsRequest",
              responseType: "GetUserDetailsResponse",
            },
            AddUser: {
              requestType: "AddUserRequest",
              responseType: "AddUserResponse",
            },
          },
        },
      },
    },
    stream: {
      nested: {
        StreamVideoRequest: {
          fields: {
            filePath: {
              type: "string",
              id: 1,
            },
          },
        },
        VideoChunk: {
          fields: {
            data: {
              type: "bytes",
              id: 1,
            },
          },
        },
        VideoStreamService: {
          methods: {
            StreamVideoFile: {
              requestType: "StreamVideoRequest",
              responseType: "VideoChunk",
              responseStream: true,
            },
          },
        },
      },
    },
  });

module.exports = $root;
