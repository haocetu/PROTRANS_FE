const DocumentItem = ({ item, onRemove }) => {
  return (
    <div className="DocumentItemPage">
      <div className="item-details">
        <h4>{item.id}</h4>
      </div>
      <div className="item-quantity">
        <button onClick={() => onRemove(item.id)}>-</button>
      </div>
    </div>
  );
};

export default DocumentItem;
