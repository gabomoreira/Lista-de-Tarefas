import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "por favor insira algo", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "item editado", "success");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      showAlert(true, "items adicionado na lista", "success");
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "lista vazia", "danger");
    setList([]);
  };

  const removeItem = (idEspecific) => {
    const newList = list.filter((item) => item.id !== idEspecific);
    setList(newList);
    showAlert(true, "item removido", "danger");
  };

  const editItem = (idEspecific) => {
    const especificItem = list.find((item) => item.id === idEspecific);
    setIsEditing(true);
    setEditId(idEspecific);
    setName(especificItem.title);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Lista de Tarefas</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="ex.: beber água"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Editar" : "Salvar"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Limpar items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
