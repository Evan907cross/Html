const e_math = {
	lerp : (a,b,t) => a + (b-a) * t,
	distance : function(v1,v2){
		if(!(v1 instanceof vector4)){v1 = v1.Vec4ify()}
		if(!(v2 instanceof vector4)){v2 = v2.Vec4ify()}
		return Math.sqrt(Math.pow(v1.x - v2.x,2) + Math.pow(v1.y - v2.y,2) + Math.pow(v1.z - v2.z,2) + + Math.pow(v1.w - v2.w,2))
	},

	distance2d : function(v1,v2){
		return Math.sqrt(Math.pow(v2.x - v1.x,2) + Math.pow(v2.y - v1.y,2))
	},

	deg_to_rad : (deg) => deg * Math.PI/180,
	rad_to_deg : (rad) => rad * 180/Math.PI,
	rotate_2d_r : function(rad,point,origin){
		point.x -= origin.x
		point.y -= origin.y
		
		const dx = (point.x * Math.cos(rad)) - (point.y * Math.sin(rad))
		const dy = (point.x * Math.sin(rad)) + (point.y * Math.cos(rad))
		
		return new vector2(dx + origin.x,dy + origin.y)
	},
	clamp :  (x,min=0,max=100) => Math.max(Math.min(x,max),min),
}

const parseBool = (x) => (x > 0)

const lerp = (a,b,t) => e_math.lerp(a,b,t)
const distance = (v1,v2) => e_math.distance(v1,v2)
const deg_to_rad = (deg) => e_math.deg_to_rad(deg)
const rad_to_deg = (rad) => e_math.rad_to_deg(rad)
const clamp = (x,min=0,max=100) => e_math.clamp(x,min,max)

const abs = (x) => Math.abs(x)

const pow = (base,exponent) => Math.pow(base,exponent)
const sqrt = (x) => Math.sqrt(x)
const cbrt = (x) => Math.cbrt(x)

const tan = (x) => Math.tan(x)
const sin = (x) => Math.sin(x)
const cos = (x) => Math.cos(x)

const atan2 =(x,y) => Math.atan2(x,y) //Takes a direction and returns a radian