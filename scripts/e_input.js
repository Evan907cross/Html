//If you don't want the dafault binds just add "e_input.Binds = {}". This will clear all binds


let e_input = {
    Update : function(_delta = 1){
        //console.log("e_input update")
        for(b of Object.keys(e_input.Binds)){
            let c = e_input.Binds[b]
            if(c.isDown && c.isPressed == false && c.isHolding == false){
                c.isPressed = true
                c.onPress()
            }else{
                if(c.isDown && c.isPressed){
                    c.isPressed = false
                    c.isHolding = true
                    c.onHold()
                }
            }
            if(c.isHolding){
                c.onHold()
            }
        }
    },
    Classes : {
        Bind : class{
            constructor(){
                this.onDown = function(){}
                this.onUp = function(){}
                this.onPress = function(){}
                //this.onHoldStart = function(){}
                this.onHold = function(){}

                this.isDown = false
                this.isPressed = false
                this.isHolding = false
            }
        }
    },
    Pointers : {},
    Binds : {},

    MakeBind(NAME,KEYS = []){
        if(NAME in e_input.Binds){
            console.warn("e_input: \n"+NAME+"\n already exists as a bind!")
            return
        }else{
            e_input.Binds[NAME] = new e_input.Classes.Bind()
        }
        for(k of KEYS){
            e_input.BindKey(k,NAME)
        }
    },
    BindKey(KEY,BIND){
        if(KEY in e_input.Pointers){
            if(BIND in e_input.Pointers[KEY]){
                console.warn("e_input: \n"+KEY+"\n is already binded to \n" + BIND + "\n")
                return
            }
            e_input.Pointers[KEY] += BIND
        }else{
            e_input.Pointers[KEY] = [BIND]
        }
    },
    getVector(negX,posX,negY = null,posY = null){
        let num = new vector2()
        negX = e_input.Binds[negX].isDown
        posX = e_input.Binds[posX].isDown
        if(negX){num.x -= 1}
        if(posX){num.x += 1}
        if(negY == null){
            return num.x
        }else{
            negY = e_input.Binds[negY].isDown
            posY = e_input.Binds[posY].isDown
            if(negY){num.y -= 1}
            if(posY){num.y += 1}
        }
        return num
    }
}

e_input.MakeBind("ui_left" ,["ArrowLeft"])
e_input.MakeBind("ui_right",["ArrowRight"])
e_input.MakeBind("ui_up"   ,["ArrowUp"])
e_input.MakeBind("ui_down" ,["ArrowDown"])

/*
e_input.MakeBind("ui_accept",["Enter"," "])
e_input.MakeBind("ui_back"  ,["Backspace","Escape"])

e_input.MakeBind("ui_copy" ,["Control","C"])
e_input.MakeBind("ui_paste",["Control","V"])
e_input.MakeBind("ui_undo" ,["Control","Z"])
e_input.MakeBind("ui_redo" ,["Control","Y"])
*/

document.addEventListener("keydown", function(event){
    if(event.key in e_input.Pointers){
        for(k in e_input.Pointers[event.key]){
            let curBind = e_input.Binds[e_input.Pointers[event.key][k]]
            curBind.onDown()
            curBind.isDown = true
        }
    }
});

document.addEventListener("keyup", function(event){
    if(event.key in e_input.Pointers){
        for(k in e_input.Pointers[event.key]){
            let curBind = e_input.Binds[e_input.Pointers[event.key][k]]
            curBind.isDown = false
            curBind.isPressed = false
            curBind.isHolding = false
            curBind.onUp()
        }
    }
});