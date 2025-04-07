import React, { useState, useEffect } from 'react';
import './index.scss';

function GridBoard({ rows, onRowsChange, editMode }) {
    const [draggedCard, setDraggedCard] = useState(null);
    const [editingCol, setEditingCol] = useState(null);

    const handleDragStart = (rowIndex, cardIndex) => {
        setDraggedCard({ rowIndex, cardIndex });
    };

    const handleDrop = (e, targetRowIndex, targetCardIndex) => {
        e.preventDefault();
        if (!draggedCard) return;

        const { rowIndex: sourceRowIndex, cardIndex: sourceCardIndex } = draggedCard;
        if (sourceRowIndex === targetRowIndex && sourceCardIndex === targetCardIndex) return;

        const updatedRows = rows.map((row, i) => (i === sourceRowIndex || i === targetRowIndex ? [...row] : row));
        const [movedCard] = updatedRows[sourceRowIndex].splice(sourceCardIndex, 1);

        let insertIndex = Math.min(targetCardIndex, updatedRows[targetRowIndex].length);

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
        const updated = [...rows];
        updated[rowIndex] = [...updated[rowIndex]];
        updated[rowIndex].splice(cardIndex, 1);
        onRowsChange(updated);
    };

    const handleColChange = (rowIndex, cardIndex, newCol) => {
        const updated = [...rows];
        updated[rowIndex] = [...updated[rowIndex]];

        if (newCol === null) {
            const { col, ...rest } = updated[rowIndex][cardIndex];
            updated[rowIndex][cardIndex] = { ...rest };
        } else {
            const totalOtherCols = updated[rowIndex].reduce((sum, c, i) => {
                if (i === cardIndex) return sum;
                return sum + (c.col || 1);
            }, 0);
            const available = 12 - totalOtherCols;
            const col = Math.max(1, Math.min(newCol, available));
            updated[rowIndex][cardIndex] = { ...updated[rowIndex][cardIndex], col };
        }

        onRowsChange(updated);
    };

    const handleDragOver = (e) => e.preventDefault();

    useEffect(() => {
        const nonEmptyRows = rows.filter((row) => row.length > 0);
        const emptyRows = rows.filter((row) => row.length === 0);
        if (emptyRows.length <= 1) return;
        const updatedRows = [...nonEmptyRows, emptyRows[emptyRows.length - 1]];
        onRowsChange(updatedRows);
    }, [rows]);

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
                            draggedCard?.rowIndex === rowIndex &&
                            draggedCard.cardIndex === cardIndex;

                        const isEditing = editingCol?.rowIndex === rowIndex && editingCol.cardIndex === cardIndex;

                        return (
                            <div
                                key={`${card.id}-${cardIndex}`}
                                
                                className={`grid-board__card${
                                    card.col ? ' grid-board__card--fixed' : ''
                                  }${isDragged ? ' grid-board__card--dragging' : ''}`}
                                  

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
                                {
                                    editMode && (
                                        <div className="grid-board__card-header">
                                            <span className="grid-board__card-label">
                                                {card.col ? `${card.col}/12` : 'auto'}
                                            </span>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    min="2"
                                                    max="8"
                                                    className="grid-board__card-col-input"
                                                    defaultValue={card.col || ""}
                                                    onBlur={(e) => {
                                                        handleColChange(rowIndex, cardIndex, parseInt(e.target.value, 10));
                                                        setEditingCol(null);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleColChange(rowIndex, cardIndex, parseInt(e.target.value, 10));
                                                            setEditingCol(null);
                                                        } else if (e.key === 'Escape') {
                                                            setEditingCol(null);
                                                        } else {
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                    onPaste={(e) => e.preventDefault()}
                                                    onInput={(e) => e.preventDefault()}
                                                    autoFocus
                                                />
                                            ) : (
                                                <>
                                                    {
                                                        card.col ? <button
                                                            className="grid-board__card-auto"
                                                            onClick={() => handleColChange(rowIndex, cardIndex, null)}
                                                        >
                                                            back auto
                                                        </button> : ""
                                                    }
                                                    <button
                                                        className="grid-board__card-edit"
                                                        onClick={() => setEditingCol({ rowIndex, cardIndex })}
                                                    >
                                                        ✎
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                className="grid-board__card-remove"
                                                onClick={() => handleDeleteCard(rowIndex, cardIndex)}
                                            >
                                                ✖
                                            </button>
                                        </div>
                                    )
                                }
                                <div className="grid-board__card-content">{card.render}</div>
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