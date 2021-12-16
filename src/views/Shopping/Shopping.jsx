import { useReducer } from 'react';
import AddItem from '../../components/AddItem/AddItem';
import ItemList from '../../components/ItemList/ItemList';

const nextId = 6;

const initialItems = [
  { id: 0, text: 'Book', done: false },
  { id: 1, text: 'Ice Cream', done: false },
  { id: 2, text: 'Dog Treat', done: false },
  { id: 3, text: 'Coffee', done: false },
  { id: 4, text: 'Nail Polish', done: false },
];

function itemsReducer(items, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...items,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return items.map((item) => {
        if (item.id === action.task.id) {
          return action.task;
        }
        return item;
      });
    }
    case 'deleted': {
      return items.filter((item) => item.id !== action.id);
    }
    default: {
      throw Error(`Unknown action:${action.type}`);
    }
  }
}

export default function Shopping() {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);

  const handleAdd = (text) => {
    dispatch({
      type: 'added',
      id: nextId + 1,
      text,
    });
  };
  const handleChange = (task) => {
    dispatch({
      type: 'changed',
      task,
    });
  };
  const handleDelete = (taskId) => {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  };
  return (
    <>
      <h1>Shopping List</h1>
      <AddItem onAddItem={handleAdd} />
      <ItemList
        items={items}
        onChangeItem={handleChange}
        onDeleteItem={handleDelete}
      />
    </>
  );
}
