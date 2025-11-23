class vector2{
	constructor(x=0,y=0){
		this.x = x
		this.y = y
	}
	Listify(){return [this.x,this.y]}
	get Magitude(){return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))}
	Vec3ify(){return new vector3(this.x,this.y,0)}
	Vec4ify(){return new vector4(this.x,this.y,0,0)}
}

class vector3{
	constructor(x = 0,y = 0, z = 0){
		this.x = x
		this.y = y
		this.z = z
	}
	Listify(){return [this.x,this.y,this.z]}
	get Magitude(){return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2))}
	Vec2ify(){return new vector2(this.x,this.y)}
	Vec4ify(){return new vector4(this.x,this.y,this.z,0)}
	
	get xy(){return this.Vec2ify()}
	get xz(){return new vector2(this.x,this.z)}
	get yz(){return new vector2(this.y,this.z)}
}

class vector4{
	constructor(x = 0,y = 0, z = 0,w = 0){
		this.x = x
		this.y = y
		this.z = z
		this.w = w
	}
	Listify(){return [this.x,this.y,this.z,this.w]}
	get Magitude(){return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2) + Math.pow(this.w,2))}
	Vec2ify(){return new vector2(this.x,this.y)}
	Vec3ify(){return new vector3(this.x,this.y,this.z)}
	
	get xy(){return this.Vec2ify()}
	get xz(){return new vector2(this.x,this.z)}
	get yz(){return new vector2(this.y,this.z)}
	
	get xyz(){return this.Vec3ify()}
	get xzw(){return new vector3(this.x,this.z,this.w)}
	get xyw(){return new vector3(this.x,this.y,this.w)}
	get yzw(){return new vector3(this.y,this.z,this.w)}
}

const vec2 = (x=0,y=0) => new vector2(x,y)
const vec3 = (x = 0, y = 0, z = 0) => new vector3(x,y,z)
const vec4 = (x = 0, y = 0, z = 0, w = 0) => new vector4(x,y,z,w)


class rantangle2{
	constructor(x = 0,y = 0,width = 1, height = 1){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}
	Listify(){return [this.x,this.y,this.width,this.height]}
	get z(){this.width}
	get w(){this.height}
}

class e_signal{
	constructor(){
		this._connections = {
			tagged : {},
			untagged : []
		}
	}
	Emit(...paras){
		for(let k of Object.keys(this._connections.tagged)){this._connections.tagged[k](...paras)}
		for(let f of this._connections.untagged){f(...paras)}
	}
	Fire(...paras){
		console.warn("e_signal.Fire() is Depricated! Please use %ce_signal.Emit()%c instead!","text-decoration: underline;","text-decoration: none;")
		this.Emit(...paras)
	}
	Connect(Func,Tag = null){
		if(Tag = null){
			this._connections.untagged.push(Func)
		}else{
			this._connections.tagged[Tag] = Func
		}
	}
	Disconnect(Tag){
		this._connections.tagged[Tag].delete
	}
}


class e_tween{
	constructor(timems){
		this.end_time = timems
		this.start_date = null
		this.is_moving = false
	}
	GetNum(){
		if(!this.is_moving){return 0}
		
		const curDate = new Date()
		const timePercent = (curDate - this.start_date) / this.end_time
		if(timePercent >= 1){this.is_moving = false}
		return Math.min(timePercent,1)
	}
	Start(){
		this.is_moving = true
		this.start_date = new Date()
	}
	Stop(){
		this.is_moving = false
	}
}

class e_animation{
	constructor(maxframes,fps = 24,looping=false,ShouldStartOnCreation = false,StartFrame = 0){
		this.max_frames = maxframes
		this._current_frame = 0
		this.fps = 24
		this.does_loop = looping
		this.is_playing = false
		this.timeout = null //setTimeout(this.AdvanceAnimation,1000/this.fps)
		
		this.on_animation_looped = new e_signal()
		this.on_animation_finished = new e_signal()
		this.on_animation_advanced = new e_signal()
		
		if(ShouldStartOnCreation){
			this.Start(StartFrame)
		}
	}
	
	//get current_frame(){return this._current_frame}
	//set current_frame(NEW){this._current_frame = Math.min(NEW,0) % (this.max_frames+1)}
	AdvanceAnimation(){
		this.on_animation_advanced.Emit()
		if(this._current_frame != this.max_frames){
			this._current_frame += 1
		}else{
			if(this.does_loop){
				this._current_frame = 0
				this.on_animation_looped.Emit()
			}else{
				Stop()
				this.on_animation_finished.Emit()
			}
		}
	}
	Start(Frame = 0){
		this.current_frame = Frame
		this.is_playing = true
		let a = this
		this.timeout = setInterval(function(){a.AdvanceAnimation()},10000/this.fps)
	}
	Stop(){
		this.is_playing = false
		clearInterval(this.timeout)
	}
}

/*
Array.prototype.__defineGetter__("Vectorize",function(){
	switch(this.length){
		case 2:
			return new vector2(this[0],this[1]);
		break;
		default:
			console.warn("Failed to Vectorize");
			return new vector2(0,0);
		break;
	}
})
*/

Array.prototype.Vectorize = function(){
	if(this.length >= 2){
		switch(this.length){
			case 2:
				return new vector2(this[0],this[1])
				break;
			case 3:
				return new vector3(this[0],this[1],this[2])
				break;
			case 4:
				return new vector3(this[0],this[1],this[2],this[3])
				break;
			
			default:
				console.warn("Failed to Vectorize : Failed at %cSwitch Statement","text-decoration: underline;")
				return new vector2(0,0)
				break;
		}
	}else{
		console.warn("Failed to Vectorize : Failed at %cLength Check","text-decoration: underline;")
		return new vector2(0,0)
	}
}

Array.prototype.Vec2ify = function(){
	if(this.length >= 2){
		return new vector2(this[0],this[1])
	}else{
		console.warn("Failed to Vec2ify : Failed at %cLength Check","text-decoration: underline;")
		return new vector2()
	}
}

Array.prototype.Vec3ify = function(){
	if(this.length >= 2){
		if(this.length == 2){return new vector2(this[0],this[1])}
		return new vector3(this[0],this[1],this[2])
	}else{
		console.warn("Failed to Vec3ify : Failed at %cLength Check","text-decoration: underline;")
		return new vector3()
	}
}

Array.prototype.Vec4ify = function(){
	if(this.length >= 2){
		if(this.length == 2){return new vector2(this[0],this[1])}
		if(this.length == 3){return new vector3(this[0],this[1],this[2])}
		return new vector4(this[0],this[1],this[2],this[3])
	}else{
		console.warn("Failed to Vec4ify : Failed at %cLength Check","text-decoration: underline;")
		return new vector4()
	}
}