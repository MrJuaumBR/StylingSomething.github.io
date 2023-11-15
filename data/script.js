var background = document.getElementById("background");

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let ColorDetail = [
    '--plum-web',
    '--apricot',
    '--tea-rose-red'
];

function getRandomColor() {
    var randomColor1 = ColorDetail[Math.floor(Math.random() * ColorDetail.length)];
    var randomColor2 = ColorDetail[Math.floor(Math.random() * ColorDetail.length)];
    if (randomColor1 == randomColor2){
        return getRandomColor();
    };
    return [randomColor1, randomColor2];
}

function GenerateBackground(){
    let gen = random(10, 50);
    for (let i = 0; i < gen; i++){
        var background = document.getElementById("background");
        var rect = document.createElement("div");

        // Limiters Variables
        var Data = background.getBoundingClientRect();

        // Size Variables
        var Width = random(10, 100);
        var Height = random(10, 100);

        // Position Variables
        var Top = random(0, Data.bottom-Height);
        var Left = random(0, Data.right - Width);

        rect.classList.add("bg-item");

        rect.style.left = Left + 'px';
        rect.style.top = Top + 'px';

        var randomColor = getRandomColor();

        rect.style.background = "rgb(0,0,0)";
        rect.style.background= `linear-gradient(var(${randomColor[0]}),var(${randomColor[1]}))`;
        
        rect.style.width = Width + 'px';
        rect.style.height = Height+ 'px';

        background.append(rect);
    };
};

GenerateBackground();

function SeeCSS(){
    window.location.href = "/data/seer.html?need=styling.css";
}
function SeeJS(){
    window.location.href = "/data/seer.html?need=script.js";
}