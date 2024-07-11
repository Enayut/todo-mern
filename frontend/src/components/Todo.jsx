export default function Todo({todos}){
    return (
        <div>
            {todos?.map((todo)=>{
                return (
                    <div key={todo._id} style={{
                        width: '100%',
                        display: "flex",
                        margin: 20,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <h2 style={{marginRight:20}}>{todo.title}</h2>
                            <p style={{margininRight: 20}}>{todo.description}</p>
                        </div>
                        <button style={{width:100, marginLeft:20, alignSelf:"end"}} onClick={()=>{
                            fetch(`http://localhost:3000/:${todo._id}`,{
                                method: 'PUT',
                                body: JSON.stringify({
                                    "status":!todo.status
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(async (res)=>{
                                console.log(todo._id);
                                const json = await res.json();
                                if(json){
                                    console.log("Status updated successfully");

                                }
                            })
                        }}>{todo.status === true ? "Completed":"Mark as Complete"}</button>
                    </div>
                )
            })}
        </div>
    )
}