import React, { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState('');      
  const [lists, setLists] = useState([]);     

  const inpute = (e) => {
    setList(e.target.value);
  };

  const errorr = () => {
    const content = list.trim();
    if (content.length === 0) {
      alert('할 일을 입력하세요!');
      return;
    }
    if (content.length > 20) {
      alert('할 일은 20자 이내로 작성해주세요.');
      return;
    }

    const newItem = {
      id: Date.now(),
      text: content,
      completed: false,
    };

    setLists([...lists, newItem]);
    setList('');
  };

  const handleCheck = (id) => {
    setLists(
      lists.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteList = (id) => {
    setLists(lists.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <div className="name">
        <h1>To Do List</h1>
      </div>

      <div className="bb">
        할 일 추가하기:
        <div className="create">
          <input
            placeholder="할 일을 입력하세요."
            value={list}
            onChange={inpute}
            onKeyDown={(e) => { if (e.key === 'Enter') errorr(); }}
          />
          <button onClick={errorr}>입력</button>
        </div>
      </div>

      <ul>
        {lists.length === 0 ? (
          <li className="empty">할 일이 없습니다</li>
        ) : (
          lists.map(({ id, text, completed }) => (
            <li key={id} className={completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => handleCheck(id)}
              />
              <span>{text}</span>
              <button onClick={() => deleteList(id)}>삭제</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
