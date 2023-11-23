import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const clickPresHandler = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      const newPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setBoard(newBoard);
      setCurrentPlayer(newPlayer);
      checkWinner(newBoard, index);
    }
  };

  const checkWinner = (board) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
      }
    }

    if (!board.includes(null) && !winner) {
      setWinner('Draw');
    }
  };

  function startNewGameHandler() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tic-Tac-Toe</Text>
      <View style={styles.board}>
        {/* {board.map((cell, index) => (
          <Button
            key={index}
            title={cell}
            onPress={() => clickPresHandler(index)}
            disabled={cell || winner}
            style={styles.cellItem}
          />
        ))} */}
        {board.map((cell, index) => (
          <Pressable
            key={index}
            onPress={() => clickPresHandler(index)}
            disabled={cell || winner}
            style={styles.cellItem}
          >
            <View style={styles.itemWrapper}>
                <Text style={styles.title}>
                    {/* {cell ? cell : index} */}
                    {cell}
                </Text>
            </View>
            </Pressable>
        ))}
      </View>
      {winner && (
        <Text style={styles.result}>
          {winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`}
        </Text>
      )}
      {winner && (
        <Button title='New Game' onPress={startNewGameHandler} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 372,
  },
  cellItem: {
    width: 100,
    height: 100,
    fontSize: 40,
    margin: 12,
    backgroundColor: 'gray',
    borderRadius: 4,
    padding: 4,
  },
  itemWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  result: {
    fontSize: 24,
    marginVertical: 20,
  },
});

export default TicTacToe;