const Note = require("../models/Note");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Send all notes to newly connected users
        socket.on("get_notes", async () => {
            const notes = await Note.find();
            socket.emit("notes_list", notes);
        });

        // Create a new note
        socket.on("create_note", async ({ title, content }) => {
            const newNote = new Note({ title, content });
            await newNote.save();
            io.emit("note_created", newNote);
        });

        // Update an existing note
        socket.on("update_note", async ({ noteId, title, content }) => {
            const updatedNote = await Note.findByIdAndUpdate(
                noteId,
                { title, content, updatedAt: Date.now() },
                { new: true }
            );
            io.emit("note_updated", updatedNote);
        });

        // Delete a note
        socket.on("delete_note", async (noteId) => {
            await Note.findByIdAndDelete(noteId);
            io.emit("note_deleted", noteId);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
