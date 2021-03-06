import React from 'react';
import './Entity.css';

const Entity = props => {
  const {
    item,
    onClick,
    deleteHandler,
    modifyHandler,
    modifyAcceptHandler,
    modifyInput,
    changeModify,
    modifyInputError,
  } = props;
  const { color, label } = item;

  return (
    <div className="item" onClick={onClick}>
      <div className="color" style={{ background: color }} />
      <p>{label}</p>
      <div className="icons" />
      <div className="modify">
        <i
          className="fas fa-user-edit"
          onClick={event => modifyHandler(event, item.index)}
        />
      </div>
      <div className="delete">
        <i
          className="fas fa-trash-alt"
          onClick={event => deleteHandler(event, item.index)}
        />
      </div>
      <form
        className="modifyForm"
        onClick={e => {
          e.stopPropagation();
        }}
        onSubmit={e => {
          modifyAcceptHandler(e, item.index);
        }}
      >
        <input
          style={modifyInputError ? { border: '1px solid maroon' } : {}}
          type="text"
          id="modifyInput"
          value={modifyInput}
          onChange={changeModify}
        />
        <button title="Accept" type="submit">
          <i className="fas fa-check" />
        </button>
      </form>
    </div>
  );
};

export default Entity;
