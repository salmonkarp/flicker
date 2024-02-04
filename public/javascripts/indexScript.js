let bgImage = document.querySelector('.background-image');
let imageGrid = document.querySelector('.image-grid');
let linkArray = [
    "https://images.unsplash.com/photo-1652523229219-fde2f25a0e79?q=80&w=2196&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1652523229217-02b0cf805f1e?q=80&w=2196&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

function calculateDetails(imageGrid) {
    let gridWidth = imageGrid.clientWidth;
    let gridHeight = imageGrid.clientHeight;
    // console.log(gridWidth,gridHeight);

    let testDiv = imageGrid.querySelector('.test-div');
    let testDivStyle = window.getComputedStyle(testDiv);
    let divWidth = parseFloat(testDivStyle.width);
    let divHeight = parseFloat(testDivStyle.height);
    // console.log(divWidth,divHeight);

    let rowNum = Math.round(gridHeight / divHeight);
    let colNum = Math.round(gridWidth / divWidth);
    // console.log(rowNum,colNum);

    return {
        'rowNum':rowNum,
        'colNum':colNum,
        'divHeight':divHeight,
        'divWidth':divWidth
    }
}

function cutImage(bgImage, imageGrid, gridDetails) {
    const computedStyles = getComputedStyle(bgImage);
    let index = 0;
    for (let x = 0; x < gridDetails.rowNum; x++) {
        for (let y = 0; y < gridDetails.colNum; y++) {
            // pixel setting
            let bgImageCopy = document.createElement('img');
            bgImageCopy.src = bgImage.src;
            bgImageCopy.style = computedStyles;
            bgImageCopy.className = 'pixel';
            bgImageCopy.style.left = -gridDetails.divWidth * y + 'px';
            bgImageCopy.style.top = -gridDetails.divHeight * x + 'px';
            
            // pixel-container setting
            let tmpDiv = document.createElement('div');
            tmpDiv.className = `pixel-container`;
            // console.log(index);
            tmpDiv.onclick = (function(index) {
                return function() {
                    animateAdjacent(index);
                };
            })(index);
            
            // base-color setting
            let baseColor = document.createElement('div')
            baseColor.className = 'base-color'
            
            // alternative image

            // appending everything together
            
            tmpDiv.appendChild(baseColor);
            tmpDiv.appendChild(bgImageCopy);

            imageGrid.appendChild(tmpDiv);
            index++;
        }
    }
}

// actual doing
gridDetails = calculateDetails(imageGrid);
// console.log(gridDetails);
imageGrid.removeChild(imageGrid.querySelector('.test-div'));
cutImage(bgImage, imageGrid, gridDetails);
document.querySelector('.background-container').removeChild(document.querySelector('.background-image'));

let count = 0;
function animateAdjacent(i) {
    // console.log(i);
    anime({
        targets:".pixel-container",
        keyframes: [
            {opacity: 0.7},
            {opacity: 1}
        ],
        delay: anime.stagger(50, {
            grid: [gridDetails.colNum, gridDetails.rowNum],
            from: i
        })
    });
}

// window.onresize = () => create
