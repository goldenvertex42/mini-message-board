const db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Message" },
];

async function displayMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages, links });
}

async function createMessageGet(req, res) {
  res.render("form", { links });
}

async function createMessagePost(req, res) {
  const { text, username } = req.body;
  await db.insertMessage(text, username);
  res.redirect("/");
}

async function displayMessageDetails(req, res) {
    const messages = await db.getAllMessages();
    const id = Number(req.params.messageID);
    const message = messages.find(m => m.id === id);

    if (message) {
        res.render('messageDetails', { message, links });
    } else {
        res.status(404).send('Message not found');
    }
}

module.exports = {
  displayMessages,
  createMessageGet,
  createMessagePost,
  displayMessageDetails
};