import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
interface ClassicProps {
    closeChoose: () => void; // Тип функции: не принимает аргументов, возвращает void
}
const TicTacToeV2: React.FC<ClassicProps> = ({ closeChoose }) => {
    const [turn, setTurn] = useState('cross');
    const [finish, setFinish] = useState(false);
    const [draw, setDraw] = useState(false);
    const [winner, setWinner] = useState('');
    const [bot, setBot] = useState(false);

    //for v2
    let arrForCross: [number, number, number] | [number, number] | [number] = [
        -1,
    ];

    function V2() {
        for (const key in combinations) {
            //мы будем по мере заполнения combinations заполнять массивы доступных крест/нолликов (arrForCross)
        }
    }

    type Combinations = {
        [key: number]: string;
    };
    const [combinations, setCombinations] = useState<Combinations>({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
    });
    //AI
    function checkWinner(board: string[]) {
        // Проверка горизонтальных линий
        for (let i = 0; i < 3; i++) {
            if (
                board[i * 3] &&
                board[i * 3] === board[i * 3 + 1] &&
                board[i * 3] === board[i * 3 + 2]
            ) {
                return board[i * 3]; // Победа на горизонтали
            }
        }

        // Проверка вертикальных линий
        for (let i = 0; i < 3; i++) {
            if (
                board[i] &&
                board[i] === board[i + 3] &&
                board[i] === board[i + 6]
            ) {
                return board[i]; // Победа на вертикали
            }
        }

        // Проверка диагоналей
        if (board[0] && board[0] === board[4] && board[0] === board[8]) {
            return board[0]; // Победа на главной диагонали
        }
        if (board[2] && board[2] === board[4] && board[2] === board[6]) {
            return board[2]; // Победа на побочной диагонали
        }

        // Если нет победителя
        return null;
    }

    function minimax(
        board: string[],
        depth: number,
        isMaximizingPlayer: boolean
    ) {
        const winner = checkWinner(board);
        if (winner === 'cross') return -10; // Игрок (человек) выигрывает
        if (winner === 'circle') return 10; // Робот (круг) выигрывает
        if (board.every((cell) => cell !== '')) return 0; // Ничья

        if (isMaximizingPlayer) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'circle'; // Ход робота
                    best = Math.max(best, minimax(board, depth + 1, false));
                    board[i] = ''; // Отмена хода
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'cross'; // Ход игрока
                    best = Math.min(best, minimax(board, depth + 1, true));
                    board[i] = ''; // Отмена хода
                }
            }
            return best;
        }
    }

    function findBestMove(board: string[]) {
        let bestVal = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'circle'; // Пробуем ход робота
                let moveVal = minimax(board, 0, false);
                board[i] = ''; // Отмена хода

                if (moveVal > bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }

        return bestMove;
    }
    function makeRobotMove() {
        let counter = 0;
        for (const key in combinations) {
            if (combinations[key] === 'cross') {
                counter++;
            }
        }
        if (counter === 5) {
            return;
        }
        if (turn === 'circle' && !finish && !draw) {
            const bestMove = findBestMove(Object.values(combinations));
            const target = document.getElementById(
                bestMove.toString()
            ) as HTMLTextAreaElement;
            changeFigure(target);
        }
    }

    //AI
    function changeFigure(target: HTMLTextAreaElement) {
        const key = target.id;
        if (target.children[0] === undefined) {
            if (turn === 'cross') {
                target.innerHTML =
                    '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" class="svg-inline--fa fa-xmark fa-4x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>';
                setCombinations({ ...combinations, [key]: turn });
                setTurn('circle');
            } else {
                target.innerHTML =
                    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle" class="svg-inline--fa fa-circle fa-3x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path></svg>';
                setCombinations({ ...combinations, [key]: turn });
                setTurn('cross');
            }
        } else {
            console.log('Error! Its full square!');
        }
    }
    useEffect(() => {
        //ai
        setTimeout(() => {
            if (turn === 'circle' && !finish && !draw && bot) {
                makeRobotMove();
            }
        }, 1000);

        //ai

        if (
            (combinations[0] === 'cross' &&
                combinations[1] === 'cross' &&
                combinations[2] === 'cross') ||
            (combinations[3] === 'cross' &&
                combinations[4] === 'cross' &&
                combinations[5] === 'cross') ||
            (combinations[6] === 'cross' &&
                combinations[7] === 'cross' &&
                combinations[8] === 'cross') ||
            (combinations[0] === 'cross' &&
                combinations[3] === 'cross' &&
                combinations[6] === 'cross') ||
            (combinations[1] === 'cross' &&
                combinations[4] === 'cross' &&
                combinations[7] === 'cross') ||
            (combinations[2] === 'cross' &&
                combinations[5] === 'cross' &&
                combinations[8] === 'cross') ||
            (combinations[0] === 'cross' &&
                combinations[4] === 'cross' &&
                combinations[8] === 'cross') ||
            (combinations[2] === 'cross' &&
                combinations[4] === 'cross' &&
                combinations[6] === 'cross')
        ) {
            setWinner('cross');
            setFinish(true);
        }
        if (
            (combinations[0] === 'circle' &&
                combinations[1] === 'circle' &&
                combinations[2] === 'circle') ||
            (combinations[3] === 'circle' &&
                combinations[4] === 'circle' &&
                combinations[5] === 'circle') ||
            (combinations[6] === 'circle' &&
                combinations[7] === 'circle' &&
                combinations[8] === 'circle') ||
            (combinations[0] === 'circle' &&
                combinations[3] === 'circle' &&
                combinations[6] === 'circle') ||
            (combinations[1] === 'circle' &&
                combinations[4] === 'circle' &&
                combinations[7] === 'circle') ||
            (combinations[2] === 'circle' &&
                combinations[5] === 'circle' &&
                combinations[8] === 'circle') ||
            (combinations[0] === 'circle' &&
                combinations[4] === 'circle' &&
                combinations[8] === 'circle') ||
            (combinations[2] === 'circle' &&
                combinations[4] === 'circle' &&
                combinations[6] === 'circle')
        ) {
            setWinner('circle');
            setFinish(true);
        }
        if (
            combinations[0].length !== 0 &&
            combinations[1].length !== 0 &&
            combinations[2].length !== 0 &&
            combinations[3].length !== 0 &&
            combinations[4].length !== 0 &&
            combinations[5].length !== 0 &&
            combinations[6].length !== 0 &&
            combinations[7].length !== 0 &&
            combinations[8].length !== 0 &&
            !finish
        ) {
            // setFinish(true);
            setDraw(true);
        }
    }, [combinations, finish]);
    return (
        <>
            <div className="pop-up choose">
                <div className="pop-up__wrapper">
                    <h4 className="pop-up__header">Choose mode:</h4>
                    <button
                        className="pop-up__btn"
                        onClick={() => {
                            setBot(true);
                            closeChoose();
                        }}
                    >
                        vs bot
                    </button>
                    <button
                        className="pop-up__btn"
                        onClick={() => closeChoose()}
                    >
                        1 vs 1
                    </button>
                </div>
            </div>
            {draw ? (
                <div className="pop-up">
                    <div className="pop-up__wrapper">
                        <h4 className="pop-up__header">draw</h4>
                        <button
                            className="pop-up__btn"
                            onClick={() => location.reload()}
                        >
                            reload
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {finish ? (
                <div className="pop-up">
                    <div className="pop-up__wrapper">
                        <h4 className="pop-up__header">
                            Winner: {winner}{' '}
                            {winner === 'cross' ? (
                                <FontAwesomeIcon icon={faXmark} />
                            ) : (
                                <FontAwesomeIcon icon={faCircle} size="xs" />
                            )}
                        </h4>
                        <button
                            className="pop-up__btn"
                            onClick={() => location.reload()}
                        >
                            reload
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <h1 onClick={() => console.log(combinations)} className="title">
                TIC-TAC-TOE(V2)
            </h1>
            <p className="turn">
                Now turn: {turn}{' '}
                {turn === 'cross' ? (
                    <FontAwesomeIcon icon={faXmark} />
                ) : (
                    <FontAwesomeIcon icon={faCircle} size="xs" />
                )}
            </p>
            <div className="big-square">
                <div
                    className="small-square"
                    id="0"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="1"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="2"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="3"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="4"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="5"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="6"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="7"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="8"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                    }}
                ></div>
            </div>
        </>
    );
};

export default TicTacToeV2;
