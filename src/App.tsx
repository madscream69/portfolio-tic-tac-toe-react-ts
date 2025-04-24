import { useState } from 'react';
import Classic from './components/Classic';
import TicTacToeV2 from './components/TicTacToeV2';

function App() {
    const [version, setVersion] = useState('');
    function closeChoose(): void {
        document.querySelector('.choose')?.remove();
    }

    return (
        <>
            <div className="pop-up choose">
                <div className="pop-up__wrapper">
                    <h4 className="pop-up__header">Choose version</h4>
                    <button
                        className="pop-up__btn"
                        onClick={() => {
                            setVersion('Classic');
                            closeChoose();
                        }}
                    >
                        Classic
                    </button>
                    <button
                        className="pop-up__btn"
                        onClick={() => {
                            closeChoose();
                            setVersion('V2');
                        }}
                    >
                        V2
                    </button>
                </div>
            </div>
            {version === 'V2' ? (
                <TicTacToeV2 closeChoose={closeChoose} />
            ) : version === 'Classic' ? (
                <Classic closeChoose={closeChoose}></Classic>
            ) : (
                <></>
            )}
        </>
    );
}

export default App;
