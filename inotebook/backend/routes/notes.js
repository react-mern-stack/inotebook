const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes".
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote".
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body; // Make sure to destructure req.body

    try {
        const note = new Notes({ // Corrected the instantiation of the Note model
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save(); // Save the note to the database
        res.json(savedNote); // Return the saved note
    } catch (error) {
        res.status(500).send("Server error");
    }
});
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote".
router.put('/updatenote/:id', fetchuser, async (req, res) => {
const {title, description, tag} = req.body;
//create a newnote object
const newNote = {};
if (title){newNote.title = title};
if (description){newNote.description = description};
if (tag){newNote.tag = tag};
// find the note to be updated and update it
 try {
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    if (!updatedNote) return res.status(404).json({msg: "Note not found"});
    res.json(updatedNote);
 } catch (err) {
    res.status(500).send("Server error");
 }
});
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote".
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        
        // Check if the note was found and deleted
        if (!deletedNote) return res.status(404).json({ msg: "Note not found" });
        
        // Respond with the deleted note
        res.json({ msg: "Note deleted", deletedNote });
    } catch (err) {
        res.status(500).send("Server error");
    }
});


module.exports = router;
