import { useState } from "react";

export default function CreateTodo(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    return (
        <div>
            <input style = {{padding: 5, margin: 5, width: 400}} type="text" placeholder="title" onChange={(e)=>{
                const target = e.target.value;
                setTitle(target);
            }}></input> <br/>
            <input style = {{padding: 5, margin: 5, width: 400}} type="text" placeholder="description" onChange={(e)=>{
                const target = e.target.value;
                setDescription(target);
            }}></input> <br/>
            <button onClick={()=>{
                    fetch("http://localhost:3000/",{
                        method: 'POST',
                        body: JSON.stringify({
                          "title": title,
                          "description": description,
                          "status": false
                        }),
                        headers: {
                          'Content-Type': 'application/json'
                        }
                    }).then(async (res)=>{
                        const json = await res.json;
                        console.log("todo added")
                        return;
                      })
                }
            }>Add Todo</button>
        </div>
    )
}