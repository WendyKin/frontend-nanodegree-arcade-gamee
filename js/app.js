// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = Math.random() * 190 + 50;
    this.speed = Math.random() * 100 + 50;//参考论坛，设置最低速与最高速；
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
        this.y = Math.random() * 190 + 50;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
//碰撞检测,参考论坛
Player.prototype.checkCollisions = function() {
    for(var i = 0; i < allEnemies.length; i++){
        if (Math.abs(this.y - allEnemies[i].y ) < 40) {
              if (Math.abs(this.x - allEnemies[i].x ) < 50) {
                window.alert("YOU LOSE")
                this.y = 400;
                this.x = 200;
            }
        }
    }
};

Player.prototype.update = function(dt) {
    
    player.handleInput();
    if (this.y < -14) {
      window.alert("YOU WIN")
      this.x = 200;
      this.y = 400;
    } else {
        if ( this.x < 0 || this.x > 424 || this.y > 434 ) { //当player越过图片边缘时复位
           this.x = 200;
           this.y = 400;
        } else {
        this.x;
        this.y;
        }
    }
    this.checkCollisions();//调用碰撞检测函数
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys) {
        case 'left':
        this.x -= 25;
        break;
        case 'right':
        this.x += 25;
        break;
        case 'up':
        this.y -= 25;
        break;
        case 'down':
        this.y += 25;
        break;
    }
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [];
for(var i = 0; i < 6; i++) {
    var enemy = new Enemy(-20, 83 * (i % 3) + 62);//参照论坛,将虫子分布到3行
    allEnemies.push(enemy);
}
var player = new Player(200,400);




// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
