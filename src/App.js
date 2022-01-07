import "./App.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

function App() {
  const data = [
    { name: "Apple", price: 1 },
    { name: "Banana", price: 3 },
    { name: "Cherry", price: 5 },
    { name: "Grapes", price: 7 },
    { name: "Mango", price: 2 },
    { name: "Orange", price: 3 },
    { name: "Strawberry", price: 5 },
  ];

  const [items, setItems] = useState(data);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result.source.index, result.destination.index);
    const newItem = Array.from(items);
    const [reorderedItem] = newItem.splice(result.source.index, 1);
    newItem.splice(result.destination.index, 0, reorderedItem);
    setItems(newItem);
  }

  return (
    <div className="App">
      <h1>List of Items</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul
              className="items"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => {
                return (
                  <Draggable
                    key={item.name}
                    draggableId={item.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        id="items"
                      >
                        {item.name} = {item.price}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
