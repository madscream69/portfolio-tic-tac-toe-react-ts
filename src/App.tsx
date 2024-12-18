import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

function App() {
    const [currentId, setCurrentId] = useState(Number);
    const [turn, setTurn] = useState('cross');
    const [currentFigure, setCurrentFigure] = useState('');

    function changeFigure(target: HTMLTextAreaElement) {
        if (target.children[0] === undefined) {
            if (turn === 'cross') {
                target.innerHTML =
                    '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" class="svg-inline--fa fa-xmark fa-4x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>';
                setTurn('circle');
            } else {
                target.innerHTML =
                    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle" class="svg-inline--fa fa-circle fa-3x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path></svg>';
                setTurn('cross');
            }
        } else console.log('Error! Its full square!');
    }
    return (
        <>
            <h1>TIC-TAC-TOE</h1>
            <p className="turn">Now turn: {turn}</p>
            <div className="big-square">
                <div
                    className="small-square"
                    id="0"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="1"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="2"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="3"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="4"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="5"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="6"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="7"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
                <div
                    className="small-square"
                    id="8"
                    onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setCurrentId(Number(target.id));
                        changeFigure(target);
                        // console.log(target.innerHTML);
                    }}
                ></div>
            </div>
        </>
    );
}

export default App;
