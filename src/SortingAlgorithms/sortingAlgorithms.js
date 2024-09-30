export function GetMergeSortAnimations(array){
    const animations = []; 
    if(array.length <= 1) return array; 
    const auxArray = array.slice(); 
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations; 
}

function mergeSortHelper(
    mainArray, 
    startPos, 
    endPos, 
    auxArray, 
    animations,
){
    if (startPos == endPos) return; 
    const midPos = Math.floor((startPos + endPos)/2); 
    mergeSortHelper(auxArray, startPos, midPos, mainArray, animations); 
    mergeSortHelper(auxArray, midPos + 1, endPos, mainArray, animations); 
    doMerge(mainArray, startPos, midPos, endPos, auxArray, animations); 
}

function doMerge(
    mainArray, 
    startPos,
    midPos, 
    endPos, 
    auxArray, 
    animations,
){
    let i = startPos; 
    let ii = startPos; 
    let j = midPos + 1; 

    while( i <= midPos && j <= endPos) {
        // comparing values to push and change their color 
        animations.push([i,j]); 
        // push values a second time to revet their color 
        animations.push([i,j]); 
        if(auxArray[i] <= auxArray[j]){
            // overwrite ii value with i
            animations.push([ii, auxArray[i]]); 
            mainArray[ii++] = auxArray[i++]; 
        }else{
            // overwrite ii value with j 
            animations.push([ii, auxArray[j]]); 
            mainArray[ii++] = auxArray[j++]; 
        }        
    }

    while (i <= midPos){
        // comparing values to push and change their color 
        animations.push([i,i]); 
        // push values a second time to revet their color 
        animations.push([i,i]); 
        // overwrite the value at ii in the og array with value at i in aux array
        animations.push([ii, auxArray[i]]); 
        mainArray[ii++] = auxArray[i++];
    }

    while (j <= endPos){
        // comparing values to push and change their color 
        animations.push([j,j]); 
        // push values a second time to revet their color 
        animations.push([j,j]); 
        // overwrite the value at ii in the og array with value at j in aux array
        animations.push([ii, auxArray[j]]); 
        mainArray[ii++] = auxArray[j++];  
    }
}
