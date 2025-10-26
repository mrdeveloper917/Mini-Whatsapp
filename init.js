const mongoose = require("mongoose");
const Chat = require("./models/chat");
const { log } = require("node:console");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/whatsapp");
}

let allChats = [
  {
    from: "rohit",
    to: "mohit",
    msg: "teach me JS callbacks",
    created_at: new Date(),
  },
  {
    from: "neha",
    to: "priya",
    msg: "send me notes for the exam",
    created_at: new Date(),
  },
  {
    from: "amit",
    to: "sumit",
    msg: "All the best!",
    created_at: new Date(),
  },
  {
    from: "anita",
    to: "ramesh",
    msg: "bring me some fruits",
    created_at: new Date(),
  },
  {
    from: "tony",
    to: "peter",
    msg: "Love you 30000",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
