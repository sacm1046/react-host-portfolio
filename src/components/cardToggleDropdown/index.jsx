import React, { useState } from 'react';
import './index.scss';

function CardToggleDropdown({ cards, rows, onRowsChange }) {
  const [open, setOpen] = useState(false);

  const getEnabledKeys = () => {
    const activeIds = new Set();
    rows.forEach(row => row.forEach(card => activeIds.add(card.id)));
    return activeIds;
  };

  const handleToggle = (key, checked) => {
    const updated = [...rows];
    if (!checked) {
      const filtered = updated.map(row => row.filter(card => card.id !== key));
      onRowsChange(filtered);
    } else {
      const newCard = {
        id: key,
        render: cards[key].render,
        key: cards[key].key,
      };
      if (updated.length === 0) updated.push([]);
      updated[0] = [newCard, ...updated[0]];
      onRowsChange(updated);
    }
  };

  const enabled = getEnabledKeys();

  return (
    <div className="card-toggle-dropdown">
      <button className="card-toggle-dropdown__button" onClick={() => setOpen(!open)}>
        Tarjetas disponibles
      </button>
      {open && (
        <div className="card-toggle-dropdown__menu">
          {Object.entries(cards).map(([key, { title }]) => (
            <label key={key} className="card-toggle-dropdown__option">
              <input
                type="checkbox"
                checked={enabled.has(key)}
                onChange={(e) => handleToggle(key, e.target.checked)}
              />
              {title}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardToggleDropdown;
