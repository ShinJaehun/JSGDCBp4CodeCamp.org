import "./styles.css";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

//ctx.fillStyle = "white";
//ctx.fillRect(50, 50, 100, 150);

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
//console.log(canvasPosition);

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    //this.x = x - this.width / 2;
    //this.y = y - this.height / 2;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "../assets/img/boom.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;

    this.sound = new Audio();
    this.sound.src = "../assets/sound/boom.wav";
    //살짝 애니메이션 프레임이랑 사운드 효과가 맞지 않는 것을 확인했다.
    //싱크 맞추는 게 중요하다고 함
  }
  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }
  draw() {
    // 멀쩡하게 잘 되는 효과를 왜 이렇게 바꾸는지는 모르겠는디...
    // 대충 폭발하는 효과를 랜덤하게 회전시킴으로 좀 더 다양하게 보여주는 거 아닐까
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    //ctx.drawImage(
    //  this.image,
    //  this.spriteWidth * this.frame,
    //  0,
    //  this.spriteWidth,
    //  this.spriteHeight,
    //  this.x,
    //  this.y,
    //  this.width,
    //  this.height
    //);

    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );

    ctx.restore();
  }
}

window.addEventListener("click", function (e) {
  /*
  let positionX = e.x - canvasPosition.left - 25;
  let positionY = e.y - canvasPosition.top - 25;
  //console.log(e.x);
  
  // 이렇게 해서 클릭에 따라 canvas에 상자를 그린다
  //ctx.fillStyle = "white";
  //ctx.fillRect(
  //  positionX,
  //  positionY,
  //  50,
  //  50
  //);
  
  explosions.push(new Explosion(positionX, positionY));
  console.log(explosions); // 클릭할 때마다 explosions 리스트의 크기가 커지고 있음
  */
  createAnimation(e);
});

//이런 장난도 쳐볼 수 있는거지... 아마 이건 폭발 프레임을 정확하게 관찰하기 위해서 인거 같애
/*
window.addEventListener("mousemove", function (e) {
  createAnimation(e);
});
*/

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left - 25;
  let positionY = e.y - canvasPosition.top - 25;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    // 프레임을 다 표현했으면 리스트에서 삭제
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}

animate();
