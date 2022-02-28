Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@JRomuel 
JRomuel
/
Alien-Armada
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Alien-Armada/src/collision.js /

johnromuelmendoza@yahoo.com just another change
Latest commit 83f5324 on May 4, 2018
 History
 0 contributors
37 lines (32 sloc)  856 Bytes
   
function hitTestRectangle(r1,r2)
	{
		//a variable to determine whether there's a collision
		var hit = false;

		//calculate the distance vector
		var vecx = r1.centerX() - r2.centerX();
		var vecy = r1.centerY() - r2.centerY();

		//figure out the combined half-widths and half-heights
		var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
		var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();

		//check for a collision on the x axis
		if(Math.abs(vecx) < combinedHalfWidths)
		{
			//a collision might be occuring. Check for a collision on the Y axis
			if(Math.abs(vecy) < combinedHalfHeights)
			{
				//there's definitely a collision happening
				hit = true;
			}
			else
			{
				//there's no collision on the Y axis
				hit = false;
			}
		}
		else
		{
			//there's no collision on the X axis
			hit = false;
		}

		return hit;

	}
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
