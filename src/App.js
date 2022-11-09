import Matrix from "./components/Matrix";
import './styles/App.css';
import MyInput from "./components/ui/input/MyInput";
import MyButton from "./components/ui/button/MyButton";
import { StartMatrix, Concents, Classes, Syndroms } from "./Data";
import { useState, useRef } from "react";
import * as MdIcons from 'react-icons/ti';
import * as BsIcons from 'react-icons/ai';

let history = [structuredClone(StartMatrix)]

function App() {
    const [matr, setMatrix] = useState(StartMatrix)
    const [answer, setAnswer] = useState('')
    const ref = useRef(null);
    const [iter, setIter] = useState(0)
    const Learn = (index, array) => {
        let arr = [...matr];
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                index === j ? arr[i][j] += array[i] : arr[i][j] -= array[i];
            }
        }
        setMatrix(arr)
        Normalize();
        setIter(iter + 1)
    }
    const LearnCircle = (event) => {
        
        for (var k = 0; k < Syndroms.length; k++) {
            let arr = [...matr];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    k === j ? arr[i][j] += Syndroms[k][i]*0.1 : arr[i][j] -= Syndroms[k][i]*0.1;
                }
            }
            console.log(arr)
            setMatrix(arr)
            Normalize();
        }

        // setMatrix(arr)
        // Normalize();
        setIter(iter + 8)
    }
    const Normalize = () => {
        let arr = [...matr];
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                if (arr[i][j] < -1) {
                    arr[i][j] = -1;
                }
                else if (arr[i][j] > 1) {
                    arr[i][j] = 1;
                }
            }
        }
        history.push(structuredClone(arr))
        setMatrix(arr)
    }
    const handleClick = (event, key) => {
        Learn(key, Syndroms[key])
        console.log('key index: ', key);
    };
    const backClick = (event) => {
        if (history.length > 1) {
            let arr = [...matr];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    arr[i][j] = history[history.length - 2][i][j]
                }
            }
            setMatrix(arr)
            history.pop()
            setIter(iter - 1)
        }
    };
    const Expert = () => {
        let arr = [...matr];
        let str = ""
        let arrays = ref.current.value.split('\n')
        console.log(arrays.length)
        for(var k = 0; k < arrays.length; k++){
            let inputStr = arrays[k].split(' ');
            const input = inputStr.map(str => {
                return Number(str);
            });
            console.log("asdasd")
            let res = new Array(Classes.length).fill(0);
            // // let res = [];
            // // for (var k = 0; k < arr[0].length; k++) {
            // //     res.push(0);
            // // }
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    res[j] += input[i] * arr[i][j];
                }
            }
            console.log(res)
            const max = Math.max(...res);
            const index = res.indexOf(max);
            str += Classes[index] + '\n'
            //setAnswer(Classes[index])
            //alert();
        }
        
        alert(str)
        // let inputStr = Array.from(bodyInputRef.current.value);
        // const input = inputStr.map(str => {
        //     return Number(str);
        // });
        // let res = new Array(Classes.length).fill(0);
        // // let res = [];
        // // for (var k = 0; k < arr[0].length; k++) {
        // //     res.push(0);
        // // }
        // for (var i = 0; i < arr.length; i++) {
        //     for (var j = 0; j < arr[i].length; j++) {
        //         res[j] += input[i] * arr[i][j];
        //     }
        // }
        // console.log(res)
        // const max = Math.max(...res);
        // const index = res.indexOf(max);
        // //setAnswer(Classes[index])
        //alert(arrays[0]);
    }
    const bodyInputRef = useRef()
    return (
        <div className="App">
            <div className="post">
                <div>
                    <h1 style={{ textAlign: 'left', marginBottom: '10px', fontSize: '22px', fontFamily: 'sans-serif' }}>
                        Итерация {iter}
                    </h1>
                    {Classes.map((element, key) => (
                        <div className="controls">
                            <MyButton onClick={event => handleClick(event, key)} key={key}>
                                {element}
                            </MyButton>
                        </div>
                    ))}
                    <div className="controls2">
                        <MyButton onClick={event => LearnCircle(event)}>
                            Обучить все
                        </MyButton>

                    </div>
                    <div className="controls2">
                        <MyButton onClick={event => backClick(event)}>
                            <MdIcons.TiArrowBack />Назад<MdIcons.TiArrowBack />
                        </MyButton>
                    </div>

                </div>

                <div>
                    <Matrix array={matr} concents={Concents} classes={Classes}></Matrix>
                    {/* <MyInput type="text" ref={bodyInputRef}></MyInput>
                    */}
                  
                </div>
                <div>
                    <div>
                        <textarea ref={ref} name="comment"></textarea>
                    </div>
                    
                    <MyButton onClick={Expert} disabled={false}>
                        Экспертиза
                    </MyButton>
                </div>
            
                {/* <div>
                {answer}
            </div> */}


            </div>

        </div>
    );
}

export default App;
