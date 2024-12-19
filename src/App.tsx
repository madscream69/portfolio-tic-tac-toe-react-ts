import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

function App() {
    const [currentId, setCurrentId] = useState(Number);
    const [turn, setTurn] = useState('cross');
    const [finish, setFinish] = useState(false);
    const [draw, setDraw] = useState(false);
    const [winner, setWinner] = useState('');
    type Combinations = {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
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
            setDraw(true);
        }
    }, [combinations, finish]);
    function checkResult() {
        // console.log(combinations[0]);
    }
    return (
        <>
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
                TIC-TAC-TOE
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
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="1"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="2"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="3"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="4"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="5"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="6"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="7"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="8"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        changeFigure(target);
                        checkResult();
                        // console.log(target.innerHTML);
                    }}
                ></div>
            </div>
        </>
    );
}

export default App;
