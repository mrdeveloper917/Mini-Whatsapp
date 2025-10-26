const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//---------------------------------------- Index Route -------------------------------------------------------------------
app.get("/", async (req, res) => {
  const chats = await Chat.find();
  // console.log(chats);
  res.render("index", { chats });
  // res.send("working");
});

//--------------------------------------- New Route -----------------------------------------------------------------------
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//--------------------------------------- Create Route --------------------------------------------------------------------
app.post("/", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });
  // saving the new Chat
  newChat
    .save()
    .then((res) => {
      console.log("chat was saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

//---------------------------------------- Edit Route -----------------------------------------------------------------------
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//---------------------------------------- Update Route --------------------------------------------------------------------
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updateChat);
  res.redirect("/");
});


//--------------------------------------- Delete Route ---------------------------------------------------------------------
app.delete("/chats/:id",async(req , res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/")
});

// app.get("/", (req, res) => {
//   res.send("working root");
// });

app.listen(8080, () => {
  console.log("app is listening");
});
