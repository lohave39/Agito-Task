import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Notes.css";

const socket = io("http://localhost:5000", {
    withCredentials: true,
});

function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        socket.emit("get_notes"); // Request all notes

        socket.on("notes_list", (notes) => {
            setNotes(notes);
        });

        socket.on("note_created", (newNote) => {
            setNotes((prevNotes) => [...prevNotes, newNote]);
        });

        socket.on("note_updated", (updatedNote) => {
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
            );
        });

        socket.on("note_deleted", (noteId) => {
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        });

        return () => {
            socket.off("notes_list");
            socket.off("note_created");
            socket.off("note_updated");
            socket.off("note_deleted");
        };
    }, []);

    const handleCreateNote = () => {
        if (title.trim() && content.trim()) {
            socket.emit("create_note", { title, content });
            setTitle("");
            setContent("");
        }
    };

    const handleUpdateNote = () => {
        if (editingNote) {
            socket.emit("update_note", {
                noteId: editingNote._id,
                title,
                content,
            });
            setTitle("");
            setContent("");
            setEditingNote(null);
        }
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditingNote(note);
    };

    const handleDelete = (noteId) => {
        socket.emit("delete_note", noteId);
    };

    return (
        <div className="App">
            <h1>Real-time Notes</h1>
            <div className="note-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                />
                {editingNote ? (
                    <button onClick={handleUpdateNote}>Update Note</button>
                ) : (
                    <button onClick={handleCreateNote}>Create Note</button>
                )}
            </div>
            <div className="notes-list">
                {notes.map((note) => (
                    <div key={note._id} className="note">
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <button onClick={() => handleEdit(note)}>Edit</button>
                        <button onClick={() => handleDelete(note._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;
