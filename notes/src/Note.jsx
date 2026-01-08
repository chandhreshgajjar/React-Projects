import { React, useState, useEffect } from 'react'
import useLocalStorage from './custom_hooks/useLocalStorage'

function Note() {

    let note = {
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }

    const [noteTitle, setNoteTitle] = useState();
    const [noteDesc, setNoteDesc] = useState();
    const [noteArray, setNoteArray] = useState([note]);
    const { addToStorage } = useLocalStorage();

    const handleNoteForm = (event) => {
        event.preventDefault();
        //console.log("Note title: " + noteTitle + " and note description: " + noteDesc);
        addToStorage(noteTitle, noteDesc);
        setNoteArray([...noteArray, {
            title: noteTitle,
            description: noteDesc
        }]);
        setNoteTitle('');
        setNoteDesc('');
    }

    const handleDelete = (event) => {
        let indexNum = event.target.id;
        localStorage.removeItem(noteArray[indexNum].title);
        if (indexNum !== -1) {
            setNoteArray(noteArray.filter((_, i) => i !== Number(indexNum)));
        }
    }

    const handleEdit = (event) => {
        let index = event.target.id;
        setNoteTitle(noteArray[index].title);
        setNoteDesc(noteArray[index].description);
        console.log("Title: " + noteArray[index].title + " and description: " + noteArray[index].description);
        document.querySelector('.edit-note-btn').style.display = 'flex';
        document.querySelector('.edit-note-btn').setAttribute('id', index);
    }

    const handleEditedNote = (event) => {
        let indexEditBtn = Number(event.target.id);
        console.log("Note Index: " + indexEditBtn);
        console.log("Note title: " + noteTitle + " and note description: " + noteDesc);
        noteArray[indexEditBtn].title = noteTitle;
        noteArray[indexEditBtn].description = noteDesc;
        localStorage.setItem(noteTitle, noteDesc);
        document.querySelector('.edit-note-btn').style.display = 'none';
        setNoteTitle('');
        setNoteDesc('');
    }

    useEffect(() => {
        Object.keys(localStorage).forEach((key) => {
            if (noteArray.title != key) {
                noteArray.push({
                    title: key,
                    description: localStorage.getItem(key),
                });
                console.log("Note Array: " + JSON.stringify(noteArray));
            }
        });
    }, []);

    const noteListTest = noteArray.map((note, index) => <li key={index} className="note-wrapper"> <div className="note-title"><h3>{note.title}</h3><div className="edit-delete-wrapper"><p id={index} className="edit" onClick={handleEdit}>&#x270f;</p><p id={index} className="delete" onClick={handleDelete}>&#10006;</p></div></div><div className="note-description"><p>{note.description}</p></div></li>);

    return (
        <>
            <div className="note-form-container">
                <div className="note-form-wrapper">
                    <form className="note-form" onSubmit={handleNoteForm}>
                        <div className="note-title-wrapper">
                            <label>Title:</label>
                            <input type="text" value={noteTitle} onChange={(event) => setNoteTitle(event.target.value)} placeholder='Enter Note Title' />
                        </div>

                        <div className="note-description-wrapper">
                            <label>Description:</label>
                            <input type="text" value={noteDesc} onChange={(event) => setNoteDesc(event.target.value)} placeholder='Enter Note Description' />
                        </div>

                        <button className="add-note-btn">+ Add Note</button>
                    </form>
                    <button className="edit-note-btn" onClick={handleEditedNote}><p>&#x270f;</p> Edit note</button>
                </div>
            </div>
            <ul className="note-main-container">
                {noteListTest}
            </ul>
        </>
    )
}

export default Note;