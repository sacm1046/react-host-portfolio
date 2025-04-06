import React, { useState } from 'react';
import './index.scss';

function GridBoard({ rows, onRowsChange }) {
    const [draggedCard, setDraggedCard] = useState(null);

    const handleDragStart = (rowIndex, cardIndex) => {
        setDraggedCard({ rowIndex, cardIndex });
    };

    const handleDrop = (e, targetRowIndex, targetCardIndex) => {
        e.preventDefault();
        if (!draggedCard) return;
      
        const { rowIndex: sourceRowIndex, cardIndex: sourceCardIndex } = draggedCard;
      
        const updatedRows = rows.map(r => [...r]);
        const [movedCard] = updatedRows[sourceRowIndex].splice(sourceCardIndex, 1);
      
        let insertIndex = targetCardIndex;

        if (insertIndex > updatedRows[targetRowIndex].length) {
          insertIndex = updatedRows[targetRowIndex].length;
        }
      
        const totalCols = updatedRows[targetRowIndex].reduce(
          (sum, c) => sum + (c.col || 1),
          0
        ) + (movedCard.col || 1);
      
        if (totalCols > 12) return;
      
        updatedRows[targetRowIndex].splice(insertIndex, 0, movedCard);
      
        onRowsChange(updatedRows);
        setDraggedCard(null);
      };
      
      
      

    const handleAddRow = () => {
        if (!rows.some(row => row.length === 0)) {
            onRowsChange([...rows, []]);
        }
    };

    const handleDeleteRow = (rowIndex) => {
        onRowsChange(rows.filter((_, i) => i !== rowIndex));
    };

    const handleDeleteCard = (rowIndex, cardIndex) => {
        const updated = rows.map(r => [...r]);
        updated[rowIndex].splice(cardIndex, 1);
        onRowsChange(updated);
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <div className="grid-board">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid-board__row"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, rowIndex, row.length)}
            >
              {row.length === 0 && (
                <button
                  className="grid-board__delete-row-button"
                  onClick={() => handleDeleteRow(rowIndex)}
                >
                  Eliminar fila vacía
                </button>
              )}
              {row.map((card, cardIndex) => {
                const isDragged =
                  draggedCard &&
                  draggedCard.rowIndex === rowIndex &&
                  draggedCard.cardIndex === cardIndex;
    
                return (
                  <div
                    key={`${card.id}-${cardIndex}`}
                    className={`grid-board__card${card.col ? ' grid-board__card--fixed' : ''}${isDragged ? ' grid-board__card--dragging' : ''}`}
                    style={card.col ? { '--col': card.col } : {}}
                    draggable
                    onDragStart={() => handleDragStart(rowIndex, cardIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.stopPropagation();
                      handleDrop(e, rowIndex, cardIndex);
                    }}
                    onTouchStart={() => handleDragStart(rowIndex, cardIndex)}
                    onTouchEnd={() => handleDrop({}, rowIndex, cardIndex)}
                  >
                    <div className="grid-board__card-content">{card.render}</div>
                    <button
                      className="grid-board__card-remove"
                      onClick={() => handleDeleteCard(rowIndex, cardIndex)}
                    >
                      ✖
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
          <button className="grid-board__add-row-button" onClick={handleAddRow}>
            Agregar fila
          </button>
        </div>
      );
    }
    
    export default GridBoard;
