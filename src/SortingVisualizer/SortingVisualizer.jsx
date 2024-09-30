import React from "react";
import {GetMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css'; 

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'pink';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'purple';


export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [], 
        };
    }

    componentDidMount(){
        this.resetArray(); 
    }

    resetArray() {
        const array = []; 
        for(let i = 0; i < 100; i++){
            array.push(randomInt(5,310)); 
        }
        this.setState({array}); 
    }

    mergeSort() {
        const animations = GetMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('arrayBar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
    }
    

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() {
        for(let i = 0; i < 100; i++){
            const array = []; 
            const length = randomInt(1, 1000); 
            for(let j = 0; j< length; j++){
                array.push(randomInt(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a,b) => a - b);
            // const mergeSortedArray = SortingAlgorithms.mergeSort(array.slice()); 
            // console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }

    }

    render() {
        const {array} = this.state; 
        
        return (
           <div className="arrayContainer">
                <div className="bars">
                    {array.map((value, idx) => (
                        <div className="arrayBar" key={idx} style={{height: `${value}px`}}>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                <button onClick={() => this.resetArray()}>New</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>

            </div> 
        );
    }
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(array1, array2){
    if(array1.length !== array2.length) return false; 

    for(let i = 0; i < array1.length; i++){
        if(array1[i] !== array2[i]) return false; 
    }
    return true; 
}