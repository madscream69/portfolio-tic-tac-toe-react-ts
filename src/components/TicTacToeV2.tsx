import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

interface ClassicProps {
    closeChoose: () => void; // Тип функции: не принимает аргументов, возвращает void
}

const TicTacToeV2: React.FC<ClassicProps> = ({ closeChoose }) => {
    const [turn, setTurn] = useState('cross');
    const [finish, setFinish] = useState(false);
    const [draw, setDraw] = useState(false);
    const [winner, setWinner] = useState('');
    const [bot, setBot] = useState(false);

    const [combinations, setCombinations] = useState<string[]>(
        new Array(9).fill('')
    );

    useEffect(() => {
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
    }, [
        combinations[0],
        combinations[1],
        combinations[2],
        combinations[3],
        combinations[4],
        combinations[5],
        combinations[6],
        combinations[7],
        combinations[8],
        finish,
    ]);
    const [arrForCross, setArrForCross] = useState<number[]>([]);
    const [arrForCircle, setArrForCircle] = useState<number[]>([]);
    function clearLast() {
        if (arrForCross.length === 3) {
            if (document.getElementById(`${arrForCross[0]}`)) {
                (
                    document.getElementById(`${arrForCross[0]}`) as HTMLElement
                ).style.opacity = '0.5';
            }
        }
        if (arrForCircle.length === 3) {
            if (document.getElementById(`${arrForCircle[0]}`)) {
                (
                    document.getElementById(`${arrForCircle[0]}`) as HTMLElement
                ).style.opacity = '0.5';
            }
        }
        if (arrForCross.length === 4) {
            let temp_arr = combinations;
            temp_arr[arrForCross[0]] = '';
            setCombinations(temp_arr);
            (
                document.getElementById(`${arrForCross[0]}`) as HTMLElement
            ).style.opacity = '1';
            setArrForCross(arrForCross.slice(1));
        } else if (arrForCircle.length === 4) {
            let temp_arr = combinations;
            temp_arr[arrForCircle[0]] = '';
            setCombinations(temp_arr);
            (
                document.getElementById(`${arrForCircle[0]}`) as HTMLElement
            ).style.opacity = '1';
            setArrForCircle(arrForCircle.slice(1));
        }
    }
    function putFigure(
        value: string,
        index: number,
        target: HTMLTextAreaElement
    ) {
        if (value.length > 0) {
            console.log('already smth exist');
        } else {
            console.log('putting...');
            let temp_arr = combinations;
            temp_arr[index] = turn;
            if (turn === 'cross') {
                setCombinations(temp_arr);
                let tmpArr = arrForCross;
                tmpArr.push(index);
                setArrForCross(tmpArr);
                setTurn('circle');
                clearLast();
            } else if (turn === 'circle') {
                setCombinations(temp_arr);
                let tmpArr = arrForCircle;
                tmpArr.push(index);
                setArrForCircle(tmpArr);
                setTurn('cross');
                clearLast();
            }
        }
    }
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
                TIC-TAC-TOEV2
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
                {combinations.map((value, index) => {
                    return (
                        <div
                            className="small-square"
                            id={index.toString()}
                            key={index}
                            onClick={(e) => {
                                const target = e.target as HTMLTextAreaElement;

                                putFigure(value, index, target);
                            }}
                        >
                            {value === 'cross' ? (
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="xmark"
                                    className="svg-inline--fa fa-xmark fa-4x "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                    ></path>
                                </svg>
                            ) : value === 'circle' ? (
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="far"
                                    data-icon="circle"
                                    className="svg-inline--fa fa-circle fa-3x "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                                    ></path>
                                </svg>
                            ) : (
                                ''
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TicTacToeV2;
