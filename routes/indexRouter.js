const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Message" },
];


indexRouter.get("/", (req, res) => res.render("index", { title: "Mini Messageboard", messages, links }));
indexRouter.get("/new", (req, res) => res.render("form", { links }));
indexRouter.post("/new", (req, res) => {
    messages.push({ id: messages.length + 1, text: req.body.message, user: req.body.user, added: new Date() });
    res.redirect("/");
});
indexRouter.get("/:messageID", (req, res) => {
    const id = Number(req.params.messageID);
    const message = messages.find(m => m.id === id); // Find the matching message

    if (message) {
        res.render('messageDetails', { message, links });
    } else {
        res.status(404).send('Message not found');
    }
});

module.exports = indexRouter;
