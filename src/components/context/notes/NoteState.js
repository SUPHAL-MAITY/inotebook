import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]

    const[notes,setNotes]=useState(notesInitial)

       
    ////get all notes

    const getNotes= async()=>{
        const response= await fetch(`${host}/api/notes/fetchallnotes`,
        {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                    "auth-token": 
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTkyZTdjN2MwZWIxMzZlZDhmNDAzIn0sImlhdCI6MTcwMTk0MTk5MX0.uxyCupive227NrLFdYa8Djv1uglN0VdkpLHmOxX2JaQ"
            }                                     
        
    }
    ) 
    const json= await response.json()
    console.log(json)
    setNotes(json)
}
       
       
       
        /// Add a note
    const addNote=async (title,description,tag)=>{


            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTkyZTdjN2MwZWIxMzZlZDhmNDAzIn0sImlhdCI6MTcwMTk0MTk5MX0.uxyCupive227NrLFdYa8Djv1uglN0VdkpLHmOxX2JaQ"
                },
                body: JSON.stringify({title, description, tag})
              });

              const note = await response.json();
              setNotes(notes.concat(note))
             

        }



        //// Delete a note
    
            
            const deleteNote = async (id) => {
              // API Call
              const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTkyZTdjN2MwZWIxMzZlZDhmNDAzIn0sImlhdCI6MTcwMTk0MTk5MX0.uxyCupive227NrLFdYa8Djv1uglN0VdkpLHmOxX2JaQ"
                }
              });
              const json = response.json();
              console.log(json)



            console.log("Deleting the note with id" + id);
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
          }
          


          



       


    
        // Edit a Note
    const editNote = async (id, title, description, tag) => {
            // API Call 
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTkyZTdjN2MwZWIxMzZlZDhmNDAzIn0sImlhdCI6MTcwMTk0MTk5MX0.uxyCupive227NrLFdYa8Djv1uglN0VdkpLHmOxX2JaQ"
              },
              body: JSON.stringify({title, description, tag})
            });
            const json =  await response.json();
            console.log(json)

            let newNotes = JSON.parse(JSON.stringify(notes))

            for(let index=0 ; index < newNotes.length; index++){
              const element=newNotes[index]
              if(element._id===id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;

              }
            }

        setNotes(newNotes)





       
        }

    return (
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}

        </noteContext.Provider>
    )
}


export default NoteState;

