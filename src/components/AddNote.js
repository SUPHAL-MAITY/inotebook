import React,{useState,useContext} from "react";
import noteContext from "./context/notes/noteContext"


const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote}=context

    const [note,setNote]=useState({"title":"","description":"","tag":""})


    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({"title":"","description":"","tag":""})
    }

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >
            Title
          </label>
          <input
            type="email"
            className="form-control"
            value={note.title}
            
            aria-describedby="emailHelp"
            id="title" name="title" onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" >
            Description
          </label>
          <input
            type="text"
            value={note.description}
            className="form-control"
            id="description" name="description" onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
         Add Note
        </button>
      </form>
     
    </div>
  );
};

export default AddNote;
