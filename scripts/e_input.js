class e_input_key_class{
	constructor(){
		this.late_input_date = null
		this.isDown = false
		
		this.on_down = new e_signal
		this.on_press = new e_signal
	}
}

const e_input = {
	delta_eval_str : "delta"
}


//please note "keypress" is a event but is not used because it does not detect Arrow Keys
document.addEventListener("keydown",function(event){
	alert(event.key)
})

document.addEventListener("keyup",function(event){
	alert(event.key)
})