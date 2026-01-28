//requires e_math.js(du) and structure_classes.js (or were ever your "vector2" class it stored/keeped)

const e_as_MaxDistanceForNodeToQualifyAsNeighbour = math_e.distance(new vector2(0,0),new vector2(16,16)) //long ass name
const e_as_limit = 50

class e_as_node{
    constructor(x = 0,y = 0,traversable = true,name = "node"){
        this.Name = name
        this.Position = new vector2(x,y)
        this.FCost = -1
        this.Parent = null
        this.IsTraversable = traversable
    }

    GenerateFCost(NewParent,StartNode,EndNode){
        this.Parent = NewParent
        const h_cost = e_math.distance(this.Position,EndNode.Position)
        const g_cost = e_math.distance(this.Position,StartNode.Position)
        this.FCost = g_cost + h_cost //NewParent.FCost + h_cost 
    }
}

function RemoveIFromArray(array,i){
    return [...array.slice(0,i),...array.slice(i + 1)]
}

function e_as_getLowestFCost(Nodes){
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

    return NeighbourList
}

function e_astar(StartNode,EndNode,Nodes){
    let OPEN = []
    StartNode.FCost = e_math.distance(StartNode.Position,EndNode.Position)
    OPEN.push(StartNode)
    let CLOSED = []
    let interations = 0

    while(interations < 50){
        let current = (interations == 0)? StartNode : e_as_getLowestFCost() 
        RemoveIFromArray(OPEN,OPEN.findIndex(current))
        CLOSED.push(current)

        if(current == EndNode){return true}

        const neighbours = e_as_getNodesNeighbours(current,Nodes)
        for(ni = 0; ni < neighbours.length; ni ++){
            const nei = neighbours[ni]
            if(CLOSED.findIndex(nei) == -1 || !nei.IsTraversable){continue}
            nei.GenerateFCost(current,StartNode,EndNode) // and set parent
            if(OPEN.findIndex(nei) == -1){
                OPEN.push(nei)
            }
        }

        interations += 1
    }

    if(interations >= 50){
        console.warn("A* Pathing Timed Out :(")
        return false
    }

    let path = [EndNode]
    let CurrentPathNode = EndNode

    //Find Da Path
    while(CurrentPathNode.Parent != null || CurrentPathNode != StartNode){
        path.push(CurrentPathNode.Parent)
        CurrentPathNode = CurrentPathNode.Parent
    }

    //Note: the path starts from the end to start, instead of start to end. So I guess maybe make a function to "flip" the array
    //(or just use negative indices :P [in order to use negative indices you must use "Array.at()"])
    return path
}