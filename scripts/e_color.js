const e_color = {
    RGBtoHex : (r,g,b) => "#" + r.toString(16) + g.toString(16) + b.toString(16),
    HextoRBG : (h) => [parseInt(h.substring(1,2),16),parseInt(h.substring(3,4),16),parseInt(h.substring(5,6),16)], 
}