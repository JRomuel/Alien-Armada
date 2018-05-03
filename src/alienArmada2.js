(function(){
	
	//The canvas
	var canvas = document.querySelector("canvas");
	
	//Create the drawing surface
	var drawingSurface = canvas.getContext("2d");
	
	//Arrays to store the game objects and assets to load
	var sprites = [];
	var assetsToLoad = [];
	var missiles = [];
	//Create the background
	var background = Object.create(spriteObject);
	background.x = 0;
	background.y = 0;
	background.sourceY = 32;
	background.sourceWidth = 480;
	background.sourceHeight = 320;
	background.width = 480;
	background.height = 320;
	sprites.push(background);
	
	//Create the cannon and center it
	var cannon = Object.create(spriteObject);
	cannon.x = canvas.width / 2 - cannon.width / 2;
	cannon.y = 280;
	sprites.push(cannon);
	
	//Load the tilesheet image
	var image = new Image();
	image.addEventListener("load", loadHandler, false);
	image.src = "../img/alienarmada.png";
	assetsToLoad.push(image);

	//Variable to count the number of assets the game needs to load
	var assetsLoaded = 0;
	
	//Game states
	var LOADING = 0
	var PLAYING = 1;
	var OVER = 2;
	var gameState = LOADING;
	
	//Arrow key codes
	var RIGHT = 39;
	var LEFT = 37;
	var SPACE = 32;
	
	//Directions
	var moveRight = false;
	var moveLeft = false;

	//variables to manage the missile
	var shoot = false;
	var spaceKeyIsDown = false;
	
	//Add keyboard listeners
	window.addEventListener("keydown", function(event)
	{
		switch(event.keyCode)
		{
			case LEFT:
				moveLeft = true;
				break;

			case RIGHT:
				moveRight = true;
				break;
			case SPACE:
				if(!spaceKeyIsDown)
				{
					shoot = true;
					spaceKeyIsDown = true;
				}
		}
	}, false);

	window.addEventListener("keyup", function(event)
	{
		switch(event.keyCode)
		{
			case LEFT:
				moveLeft = false;
				break;
			case RIGHT:
				moveRight = false;
				break;
			case SPACE:
				spaceKeyIsDown = false;
		}
	}, false);

	//Start the game animation loop
	update();
	
	function update()
	{
		//The animation loop
		requestAnimationFrame(update, canvas);
		//Change what the game is doing based on the game state
		switch(gameState)
		{
			case LOADING:
				console.log("loading...");
				break;
			case PLAYING:
				playGame();
				break;
			case OVER:
				endGame();
				break;
		}
		//Render the game
		render();
	}

	function loadHandler()
	{
		assetsLoaded++;
		if(assetsLoaded === assetsToLoad.length)
		{
			//Remove the load event listener
			image.removeEventListener("load", loadHandler, false);
			//Start the game
			gameState = PLAYING;
		}
	}

	function playGame()
	{
		//Left
		if(moveLeft && !moveRight)
		{
			cannon.vx = -8;
		}
		//Right
		if(moveRight && !moveLeft)
		{
			cannon.vx = 8;
		}
	
		//Set the cannon's velocity to zero if none of the keys are being pressed
		if(!moveLeft && !moveRight)
		{
			cannon.vx = 0;
		}

		if(shoot)
		{
			fireMissile();
			shoot = false;
		}
	
		//Move the cannon and keep it within the screen boundaries
		cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));
		
		//move the missiles
		for(var i=0; i<missiles.length;i++)
		{
			var missile = missiles[i];

			//move it up the screen
			missile.y += missile.vy;

			//remove the missile if it crosses the top fo the screen
			if(missile.y < 0 - missile.height)
			{
				//remove the missile from the missiles array
				removeObject(missile,missiles);

				//remove the missiles from the sprites array
				removeObject(missile,sprites);

				//reduce the loop counter by 1 to compensate for the removed element
				i--;
			}
		}


	}

	//function in firing the missile
	function fireMissile()
	{
		//create a missile sprite
		var missile = Object.create(spriteObject);
		missile.sourceX = 128;
		missile.sourceWidth = 16;
		missile.sourceHeight = 16;
		missile.width = 16;
		missile.height = 16;

		//center it over the cannon
		missile.x = cannon.centerX() - missile.halfWidth();
		missile.y = cannon.y - missile.height;

		//set its speed
		missile.vy = -4;

		//push the missile into the sprites and missile array
		sprites.push(missile);
		missiles.push(missile);
	}
	
	function removeObject(objectToRemove, array)
	{
		var i = array.indexOf(objectToRemove);
		if (i !== -1)
		{
			array.splice(i, 1);
		}
	}
	function endGame()
	{
		//Empty for now
	}
	
	//Variable to count the number of assets the game needs to load

	function render()
	{
		//clear the previous animation frame
		drawingSurface.clearRect(0,0,canvas.width,canvas.height);

		//loop through all the sprites array and use their properties
		if(sprites.legth !== 0)
		{
			for(var i=0;i<sprites.length;i++)
			{
				var sprite = sprites[i];
				drawingSurface.drawImage
				(
					image,
					sprite.sourceX,sprite.sourceY,
					sprite.sourceWidth,sprite.sourceHeight,
					Math.floor(sprite.x),Math.floor(sprite.y),
					sprite.width,sprite.height
				);
			}
		}
	}
}());