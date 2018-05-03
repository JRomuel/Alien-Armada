//--- the sprite object
	var spriteObject =
	{
		//the X and Y source position of the sprites image and its height and width
		sourceX: 0,
		sourceY: 0,
		sourceWidth: 32,
		sourceHeight: 32,

		//the X and Y position of the sprite on the canvas as well as its height

		x: 0,
		y: 0,
		width: 32,
		height: 32,

		//the center X and center Y of the objects
		centerX : function()
		{
			return this.x + (this.width/2);
		},

		centerY: function()
		{
			return this.y + (this.height/2);
		},

		//the halfwidths and hieghts of the the object
		halfWidth: function()
		{
			return this.width/2;
		},

		halfHeight: function()
		{
			return this.height/2;
		},		

		vx: 0,
		vy: 0
	};

	var alienObject = Object.create(spriteObject);
	alienObject.NORMAL = 2;
	alienObject.EXPLODED = 3;
	alienObject.state = alienObject.NORMAL;
	
	alienObject.update = function()
	{
		this.sourceX = this.state * this.width;
	};

	var messageObject =
	{
		x: 0,
		y: 0,
		visible: true,
		text: "0",
		font: "normal bold 20px Helvetica",
		fillStyle: "red",
		textBaseline: "top"
	};