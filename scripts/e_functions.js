const HtmlUnitList = [
	//common units
    "px",
	"%",
    "vh",
    "vw",
	
	//relative units
    "em",
    "ex",
    "ch",
    "rem",
    "vmin",
    "vmax",

	//abs units
    "cm",
    "mm",
    "in",
    "pt",
    "pc"
]

function HtmlSeperateUnit(val=0){
    if (typeof(val) == "string"){
        for(let i = (val.length - 1); i > 0; i--){
			if(!isFinite(val[i]) && val[i] != "."){continue}
			if(i == (val.length-1)){return [parseFloat(val),0]}
			return [parseFloat(val.slice(0,i+1)),val.slice(i+1,val.length)]
		}
		return (isFinite(val) && val.length != 0)? [parseFloat(val),0] : false
    }else{
        return [val,0]
    }
	return false
}

//RIP e_color
const RGBtoHex = (r,g,b) => "#" + r.toString(16) + g.toString(16) + b.toString(16)
const HextoRBG = (h) => [parseInt(h.substring(1,2),16),parseInt(h.substring(3,4),16),parseInt(h.substring(5,6),16)]