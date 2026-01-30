//https://www.youtube.com/watch?v=EqNcqBdrNyI
//aspect = canvas.height/canvas.width

function e_pro_makePerspective(aspect,fov,near,far){
    let m = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    m[0][0] = aspect * (1 / Math.tan(fov/2))
    m[1][1] = 1 / Math.tan(fov/2)
    m[2][2] = far / (far - near)
    m[2][3] = (far * near) / (far - near)
    m[3][2] = 1.0
    
    return m
}

function e_pro_multiplyPerspective(per,vec4){
    let result = new vector4()
    result.x = vec4.x * per[0][0] 
    result.y = vec4.y * per[1][1]
    result.z = (vec4.z * per[2][2]) - per[2][3]
    result.w = vec4.z

    if (result.w != 0.0){
        result.x /= result.w
        result.y /= result.w
        result.z /= result.w
    }

    return result
}

function e_pro_simplyProject(per,vec4){
    const pro = e_pro_multiplyPerspective(per,vec4)
    //console.log("w",pro.w)
    return new vector4((pro.x * canvas.width) + (canvas.width*0.5),(pro.y * canvas.height) + (canvas.height*0.5),pro.z,pro.w)
}

/*
    let aspect = canvas.height/canvas.width
    let far = 1000
    let near = 0
    let fov = 1
    
    let matp = new DOMMatrix()
    matp.m11 = aspect * (1 / Math.tan(fov/2))
    matp.m22 = 1 / Math.tan(fov/2)
    matp.m33 = far / (far - near)
    matp.m34 = (far * near) / (far - near)
    matp.m43 = 1.0
    matp.m44 = 0
        
    function MatrixToArray(Matrix){
        if(Matrix instanceof DOMMatrix){
            let Ar = []
            for(let x = 1; x <= 4; x++){
                for(let y = 1; y <= 4; y++){
                    Ar.push(Matrix["m"+x+y])
                }
            }
            return Ar
        }else{
            console.log("Passed Value is not and Instance of \nDOMMatrix\n")
            return false
        }
    }

    function MatrixToArrayNested(Matrix){
        if(Matrix instanceof DOMMatrix){
            let Ar = [[],[],[],[]]
            for(let x = 1; x <= 4; x++){
                for(let y = 1; y <= 4; y++){
                    Ar[x-1][y-1] = Matrix["m"+x+y]
                }
            }
            return Ar
        }else{
            console.log("Passed Value is not and Instance of \nDOMMatrix\n")
            return false
        }
    }

    function MatrixMultiplyVector(x,y,z,w,matrix){
        let mx = (matrix.m11 * x) + (matrix.m12 * y) + (matrix.m13 * z) + (matrix.m14 * w)
        let my = (matrix.m21 * x) + (matrix.m22 * y) + (matrix.m23 * z) + (matrix.m24 * w)
        let mz = (matrix.m31 * x) + (matrix.m32 * y) + (matrix.m33 * z) + (matrix.m34 * w)
        let mw = (matrix.m41 * x) + (matrix.m42 * y) + (matrix.m43 * z) + (matrix.m44 * w)
        return [mx,my,mz,mw]
    }
*/