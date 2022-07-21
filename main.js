const html = document.documentElement;
const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");
const Width = 1080
const Height = 1080
const margin = 40
const grid = 20
const line_w1 = 5
const line_w2 = 6
const grid_w = (Width-2*margin) / grid
let speed = 1
let snake = [
	[11, 10],
	[10, 10]
];
let food = [0,0];
let live = 0;
let direction = [snake[0][0]-snake[1][0], snake[0][1]-snake[1][1]];


function random_free_position(){
	let all_free_pos = []
	for (let i = 0; i<grid; i++){
		for (let j = 0; j<grid; j++){
			let pos = [i, j];
			let in_snake = 0;
			for (let s_id = 0; s_id<snake.length; s_id++){
				if (snake[s_id][0]==pos[0] && snake[s_id][1]==pos[1]){in_snake=1;}
			}
			if (in_snake == 0){
				all_free_pos.push(pos);
			}
		}		
	}
	let free_num = all_free_pos.length
	if (free_num > 0){
		let choice = Math.floor(Math.random() * free_num)
		food = all_free_pos[choice]
	}
}

function check_body(head){
	let crash = 0
	for (let s_id = 1; s_id<snake.length; s_id++){
		if (snake[s_id][0]==head[0] && snake[s_id][1]==head[1]){
			crash=1;
		}
	}
	return crash
}

function draw_background(){
	ctx.lineWidth = line_w1;
	ctx.beginPath();
	ctx.moveTo(margin,margin);
	ctx.lineTo(margin,Height-margin);
	ctx.lineTo(Width-margin,Height-margin);
	ctx.lineTo(Width-margin,margin);
	ctx.lineTo(margin,margin);
	ctx.lineCap = 'round';
	ctx.stroke();
	for (let i = 1; i <grid; i++){
		ctx.moveTo(i*grid_w+margin,margin);
		ctx.lineTo(i*grid_w+margin,Height-margin);
		ctx.moveTo(margin, i*grid_w+margin);
		ctx.lineTo(Height-margin,i*grid_w+margin);

	}
	ctx.stroke();
}

function check(e){
	var code = e.keyCode;
	switch(code) {
		case "KeyS":
		case "ArrowDown":
		  // Handle "back"
		  console("down")
		  break;
		case "KeyW":
		case "ArrowUp":
		  // Handle "forward"
		  console("up")
		  break;
		case "KeyA":
		case "ArrowLeft":
		  // Handle "turn left"
		  console("left")
		  break;
		case "KeyD":
		case "ArrowRight":
		  // Handle "turn right"
		  console("right")
		  break;
	  }
	  setInterval(draw_snake,500);
}

function refresh_snake(){
	let head = [snake[0][0] + direction[0], snake[0][1] + direction[1]];
	if (head[0] < 0 || head[0] > 19 || head[1] < 0 || head[1] > 19 || check_body(head)==1){
		live = 1}
	snake = [head].concat(snake);

	if (head[0] == food[0] && head[1] == food[1]){
		random_free_position();
	}
	else{
		snake.pop();
	}
}

function draw_snake(){
	let snake_len = snake.length;
	document.getElementById("p1").innerHTML = "SCORE:" + snake_len +"    SPEED:" + speed;
	ctx.clearRect(0, 0, Width, Height);
	for (let i = 0; i<snake_len; i++){
		let conner_x = snake[i][0]*grid_w+margin;
		let conner_y = snake[i][1]*grid_w+margin;
		ctx.fillStyle = "green";
		ctx.beginPath();
		ctx.fillRect(conner_x+line_w2, conner_y+line_w2, grid_w-line_w2-line_w2, grid_w-line_w2-line_w2);
	};
}

function draw_food(){
	let conner_x = food[0]*grid_w+margin;
	let conner_y = food[1]*grid_w+margin;
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.fillRect(conner_x+line_w2, conner_y+line_w2, grid_w-line_w2-line_w2, grid_w-line_w2-line_w2);
}

function play_snake(){
	console.log(live)
	if (live == 0){
		if (speed < 5){
			speed = Math.floor(snake.length/5);
		}
		refresh_snake()
		if (live == 0){
			draw_snake();
			draw_background();
			draw_food();
		}

	}
	else{
		document.getElementById("p1").innerHTML = "DEAD! score:" + snake.length;
	}
	setTimeout(play_snake,500/(1.2**speed));
}

function game(){
	canvas.width=Width;
	canvas.height=Height + 20;
	// draw_snake(ctx);
	random_free_position();
	// play_snake();
	setTimeout(play_snake,500/speed);	
}

window.addEventListener('keydown', (event) => {
	// console.log(`key=${event.key}`);
	console.log(event.key);
	if (event.key=="w" && direction[1]!=1){
		direction = [0,-1];
	}
	else if (event.key=="a" && direction[0]!=1){
		direction = [-1,0];
	}
	else if (event.key=="d" && direction[0]!=-1){
		direction = [1,0];
	}
	else if (event.key=="s" && direction[1]!=-1){
		direction = [0,1];
	}
});
window.onload = game;
// window.addEventListener('keydown',this.check,false);

