//console.log("https://www.jeffreythompson.org/collision-detection")
//console.log("Jeffrey Thompson is the GOAT")

const e_collision = {
    RectRect : (r1,r2) => (
        r1.x + r1.w >= r2.x &&
        r1.x <= r2.x + r2.w &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height
    ),
    RectPoint : (r,p) => (p.x >= r.x && p.y >= r.y && p.y <= r.y+r.height && p.x <= r.x+r.width),
    LineLine(x1,y1,x2,y2,x3,y3,x4,y4){
        const uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
        const uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            // optionally, draw a circle where the lines meet
            const intersectionX = x1 + (uA * (x2-x1));
            const intersectionY = y1 + (uA * (y2-y1));
            //fill(255,0,0);
            //noStroke();
            //ellipse(intersectionX,intersectionY, 20,20);
        
            return true;
          }
          return false;
    },
    LineRect(rect,ls,le){
        const top = MathC.LineLine(
            ...ls.List,...le.List,
            rect.x,rect.y,rect.x + rect.width,rect.y
        )
        const bottom = MathC.LineLine(
            ...ls.List,...le.List,
            rect.x,rect.y + rect.height,rect.x + rect.width,rect.y + rect.height
        )
        const left = MathC.LineLine(
            ...ls.List,...le.List,
            rect.x,rect.y,rect.x,rect.y + rect.height
        )
        const right = MathC.LineLine(
            ...ls.List,...le.List,
            rect.x + rect.width,rect.y,rect.x + rect.width,rect.y + rect.height
        )
        if(top || bottom || right || left){return true}
        return false
    },
    PolyPoint(px,py,...vertices){
        let collision = false
        let next = 0;
        for (let current=0; current<vertices.length; current++) {
            next = current+1;
            if (next == vertices.length){next = 0};
            let vc = vertices[current];    // c for "current"
            let vn = vertices[next];       // n for "next"
            //console.log(current,next,vc,vn)
            if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) && (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
                collision = !collision;
            }
        }
        return collision;
    },
    PolyLine(x1,y1,x2,y2,...vertices){
        let next = 0
        for(current = 0; current < vertices.length;current++){
            //(current + 1)%vertices.length
            next = (next == (vertices.length-1)) ? 0 : current + 1
            const x3 = vertices[current].x
            const y3 = vertices[current].y
            const x4 = vertices[next].x
            const y4 = vertices[next].y

            if(MathC.LineLine(x1,y1,x2,y2,x3,y3,x4,y4)){return true}
        }
        return false
    },
    PolyRect(rect,...vertices){
        let next = 0
        for (let current=0; current<vertices.length; current++) {
            next = current+1;
            if (next == vertices.length){next = 0};
            let vc = vertices[current];
            let vn = vertices[next];
            
            //if (MathC.LineRect(rect,vc,vn)){return true};
            if (MathC.PolyPoint(rect.x,rect.y,...vertices)){return true}
            return false
        }
    },
    PolyPoly(p1,p2){
        let next = 0
        for(current = 0; current < p1.length;current++){
            next = (next == (p1.length-1)) ? 0 : current + 1

            if(MathC.PolyLine(
                p1[current].x,
                p1[current].y,
                p1[next].x,
                p1[next].y,
                ...p2
                             )){return true}
        }
        return false
    }
}