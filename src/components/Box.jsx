import React, { useState } from "react";
import {GrAchievement} from 'react-icons/gr'
import './BoxStyled.css'

export default function Box(){

    const [turn, setTurn] = useState('X');
    const [win, setWin] = useState(Array(9).fill(''));
    const [newwinner, setNewWinner] = useState();

    const checkForWinner = (squares) => {
        const combos = {
            across:[
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
            ],
            down:[
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
            ],
            diagnol:[
				[0, 4, 8],
				[2, 4, 6],
            ],
        };

        for(const combo in combos) {
            combos[combo].forEach((pattern) => {
                if(
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' || 
                    squares[pattern[2]] === ''  
                ){
                } else if(
                    squares[pattern[0]] === squares[pattern[1]] && 
                    squares[pattern[1]] === squares[pattern[2]]
                ){
                    setNewWinner(squares[pattern[0]]);
                }
            });
        }
    }

    const Board = ({number}) => {
        return <td className="todo-list" onClick={() => handleClick(number)}>{win[number]}</td>;
    };

    const handleClick = (number) => {
        if(win[number] !== ''){
            alert('Ebbe a kockba már kattitott!');
            return;
        }

        const squares = [...win];

        if (turn === 'X'){
            squares[number] = 'X';
            setTurn('O');
        } else {
            squares[number] = 'O';
            setTurn('X');
        }

        checkForWinner(squares);
        setWin(squares);
    };

    const handleRestart = () => {
        setNewWinner(null);
        setWin(Array(9).fill(''));
	};

    return (
        <div className="box">
            <h1>Tic-Tac-Toe</h1>

            <div className="container">
                <p>Következő lépés:
                    <span>{turn}</span> jön!
                </p>
                <button className="btn" onClick={() => handleRestart()}>Új játék</button>
            </div>

            <table>
                <tbody>
                    <tr>
                        <Board number={0} />
                        <Board number={1} />
                        <Board number={2} />
                    </tr>
                    <tr>
                        <Board number={3} />
                        <Board number={4} />
                        <Board number={5} />
                    </tr>
                    <tr>
                        <Board number={6} />
                        <Board number={7} />
                        <Board number={8} />
                    </tr>
                </tbody>
            </table>
            {newwinner && (
                <>
                    <p className="text">{newwinner} Nyert! <GrAchievement /> </p>
                </>
            )}
        </div>
    );
}