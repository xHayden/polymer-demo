let c = document.getElementById("ctx1");
let ctx = c.getContext("2d");
let c2 = document.getElementById("ctx2");
let ctx2 = c2.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
ctx.canvas.width = width;
ctx.canvas.height = height;

ctx2.canvas.width = width;
ctx2.canvas.height = height;

let locations = []

for(let i = 0; i < width; i++) {
    if(Math.random() * 13 < 1){
        locations.push({'x': i, 'y': Math.floor(Math.random() * height), 'color': undefined, 'nodes': []})
    }
}

function drawPolymer(locations){
    for(i in locations) {
        let location = locations[i]
        let x = location.x
        let y = location.y
        for(j in locations){
            let location2 = locations[j]
            let x2 = location2.x
            let y2 = location2.y
            if(locations[j] !== locations[i] && !locations[i].nodes.includes(locations[j])){
                let lineRange = 90;
                if((Math.abs(x - x2) < lineRange || Math.abs(x2 - x) < lineRange) && (Math.abs(y - y2) < lineRange || Math.abs(y2 - y) < lineRange)){
                    locations[i].nodes.push(locations[j]);
                }
            }
        }
        location = locations[i]
        if(location.nodes.length > 0){
            if(!location.color){
                let blue = Math.random() * 255
                location.color = `rgb(0, ${blue}, 255)`
            }
            ctx.strokeStyle = '#00aad9';
            for(i in location.nodes){
                let node = location.nodes[i]
                ctx.moveTo(location.x, location.y);
                ctx.lineTo(node.x, node.y);
                if(!node.color){
                    node.color = location.color;
                }
                ctx.stroke();
                ctx.closePath();
            }
            ctx2.beginPath();
            let size = (location.nodes.length * 4) + 1
            if(size > 8){
                size = 8
            }
            ctx2.arc(location.x, location.y, size, 0, 2 * Math.PI);
            ctx2.strokeStyle = location.color;
            ctx2.fillStyle = location.color;
            ctx2.fill();
            ctx2.stroke();
            ctx2.closePath();
        }
    }
}

function updatePointPositions(){
    ctx.beginPath();
    ctx2.beginPath();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
    for(i in locations){
        let x = locations[i].x;
        let y = locations[i].y;
        locations[i].x = x + Math.round((Math.random() * 1) - (Math.random() * 1));
        locations[i].y = y + Math.round((Math.random() * 1) - (Math.random() * 1));
    }
    ctx.beginPath();
    ctx2.beginPath();
    drawPolymer(locations)
    ctx2.closePath()
    ctx.closePath()
}

setInterval(updatePointPositions, 10);