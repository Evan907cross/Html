//requires e_math.js(du) and structure_classes.js (or were ever your "vector2" class it stored/keeped)

const e_as_MaxDistanceForNodeToQualifyAsNeighbour = e_math.distance(new vector2(0,0),new vector2(16,16)) //long ass name
const e_as_limit = 50 //here just for testing reasons (just incase I fuck up and make a indefinite while loop [I don't trust Whiles])

//Just a distance formula that I can change without messing with e_math.js
function e_as_heuristic(node,end){
    const dx = (node.Position.x - end.Position.x)
    const dy = (node.Position.y - end.Position.y)
    return Math.sqrt(dx * dx + dy * dy)
}

class e_as_node{
    constructor(x = 0,y = 0,traversable = true,name = "node"){
        this.Name = name
        this.Position = new vector2(x,y)
        this.FCost = 0//-1
        this.Parent = null
        this.IsTraversable = traversable
    }

    GenerateFCost(NewParent,StartNode,EndNode){
        this.Parent = NewParent
        const h_cost = e_as_heuristic(this,EndNode)//e_math.distance(this.Position,EndNode.Position)
        const g_cost = e_as_heuristic(this,StartNode)
        //const ten_cost = e_math.distance(this.Position,NewParent.Position)
        this.FCost = h_cost + NewParent.FCost
    }

    GetAncestors(){
        if(this.Parent == null){return []}
        
        let a = []
        let sNode = this.Parent
        while(sNode.Parent != null){
            a.push(sNode)
            sNode = sNode.Parent
        }

        return a
    }
}

Array.prototype.RemoveI = (i) => [...this.slice(0,i),...this.slice(i + 1)]

//Should probably make this a function not unquie to this file
function RemoveIFromArray(array,i){    
    return [...array.slice(0,i),...array.slice(i + 1)]
}

function e_as_getLowestFCost(Nodes){
    //console.log("GLFC : ",Nodes)
    if(Nodes.length == 1){return Nodes[0]}
    let cur = [Nodes[0],Nodes[0].FCost]
    for(n = 1; n < Nodes.length; n++){
        const Node = Nodes[n]
        if(Node.FCost < cur[1]){cur = [Node,Node.FCost]}
    }
    return cur[0]
}

function e_as_getNodesNeighbours(current,SearchNodes){
    let NeighbourList = []

    for(n = 0; n < SearchNodes.length; n ++){
        if(SearchNodes[n] == current){continue}
        const Node = SearchNodes[n]

        if(e_math.distance(current.Position,Node.Position) <= e_as_MaxDistanceForNodeToQualifyAsNeighbour){
            NeighbourList.push(Node)
        }
    }

    //console.log("Get Neighbours ",NeighbourList)
    return NeighbourList
}

function e_astar(StartNode,EndNode,Nodes){
    let OPEN = []
    StartNode.FCost = e_math.distance(StartNode.Position,EndNode.Position)
    OPEN.push(StartNode)
    let CLOSED = []
    let interations = 0
    
    while(interations < 50){
        let current = e_as_getLowestFCost(OPEN) 
        OPEN = RemoveIFromArray(OPEN,OPEN.indexOf(current))
        CLOSED.push(current)

        if(current == EndNode){break}

        const neighbours = e_as_getNodesNeighbours(current,Nodes)
        for(ni = 0; ni < neighbours.length; ni ++){
            const nei = neighbours[ni]
            if(CLOSED.indexOf(nei) != -1 || nei.IsTraversable == false){continue}
            nei.GenerateFCost(current,StartNode,EndNode) // and set parent
            if(OPEN.indexOf(nei) == -1){
                OPEN.push(nei)
            }
        }

        interations += 1
    }

    if(interations >= 50){
        console.warn("A* Pathing Timed Out. At 1st While loop :(")
        return false
    }

    let path = [EndNode]
    let CurrentPathNode = EndNode

    //Find Da Path
    interations = 0
    while(CurrentPathNode.Parent != null || CurrentPathNode != StartNode){
        if(interations >= e_as_limit){break}else{interations += 1}

        path.push(CurrentPathNode.Parent)
        CurrentPathNode = CurrentPathNode.Parent
    }

    if(interations >= 50){
        console.warn("A* Pathing Timed Out. At 2nd While loop :(")
        return false
    }

    //console.log("END ",OPEN,CLOSED)
    
    //Note: the path starts from the end to start, instead of start to end. So I guess maybe make a function to "flip" the array
    //(or just use negative indices :P [in order to use negative indices you must use "Array.at()"])
    return path
}