const db = require("../db/queries");
const { body, validationResult } = require('express-validator');

const validateMessageBoardPost = [
  // Validation for the 'name' field
  body('name')
    .trim() // Removes leading/trailing whitespace
    .notEmpty() // Ensures the field is not empty after trimming
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters') // Enforces a length constraint
    .matches(/^[a-zA-Z\s\-']+$/).withMessage('Name must contain only letters, spaces, hyphens, or apostrophes'), // Allows common name characters

  // Validation for the 'message' field
  body('message')
    .trim() // Removes leading/trailing whitespace
    .notEmpty() // Ensures the field is not empty after trimming
    .isLength({ min: 1, max: 500 }).withMessage('Message must be between 1 and 500 characters'), // Enforces a length constraint
];

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Message" },
];

async function displayMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { messages, links });
}

async function createMessageGet(req, res) {
  res.render("form", { links });
}

const createMessagePost = [
  validateMessageBoardPost,
  // Middleware to handle validation results
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 Bad Request response with the errors
      return res.status(400).render("form", { 
        links,
        errors: errors.array(),
        previousInput: req.body
      });
    }
    const { text, username } = req.body;
    await db.insertMessage(text, username);
    res.redirect("/");
}]

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