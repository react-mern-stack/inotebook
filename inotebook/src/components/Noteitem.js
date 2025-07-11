import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-4">
            <div className="card my-2 mx-2">

                <div className="card-body">
                    <h5 className="card-title mx-2">{note.title}</h5>
                    <p className="card-text mx-2">{note.description}</p>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}} ></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}
export default Noteitem;
