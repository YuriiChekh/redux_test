import React,{Fragment} from "react";
import logo from './logo.svg';
import './App.css';

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

const CreateTodoForm =({onSubmit})=>{
  const [title, setTitle]=useState()
  const [description, setDescription]=useState()

  const handleSubmit =async (e)=>{
      e.preventDefault();

      if (!title || !description) return;
      try {
          await onSubmit(title, description);

          setTitle('')
          setDescription('')
      } catch (e) {
          console.log(e)
      }

  }

  return(
    <form onSubmit={handleSubmit} >
      <input type="text" value={title} onChange={({target:{value}})=>setTitle(value)} placeholder="todo titile"/>
      <br/>
        <br/>
      <input type="text" value={description} onChange={({target:{value}})=>setDescription(value)} placeholder="todo description"/>
      <br/>
        <br/>
      <button type="submit" disabled={!title || !description}>create todo</button>
    </form>
)
}

const Todos =({todos})=>{
    return(
        <div>
            {todos.map(todo =>(
                <Fragment key={todo.id}>
                    <div>{todo.title}</div>
                    <div>{todo.description}</div>
                    <div>Created at:{new Date(todo.createdAt).toDateString()}</div>
                   < hr/>
                </Fragment >
            ))}
        </div>
    )
}

function App() {
  const todos =  useSelector(store => store.todosReducer)
    const dispatch=useDispatch()
  const fetchTodos =async ()=>{
    const resp = await fetch('http://localhost:8888/get-todos')
    const data = await resp.json();

    dispatch({type:'ADD_TODOS', payload:data})

  }
  useEffect(()=>{
    fetchTodos();
  },[])

    const onTodoCreate = async (title, description)=>{
      if(!title || !description) return;

      const resp= await fetch('http://localhost:8888/create-todo', {
          method:'POST',
          body:JSON.stringify({title, description}),
          headers:{
              'Content-Type': 'application/json'
          }
      })
        const data = await resp.json();
        console.log(data, 'onTodoCreate');
    }
    return (
    <div className="App">
      <CreateTodoForm onSubmit={onTodoCreate}/>
        <Todos todos={todos}/>
    </div>
  );
}

export default App;
