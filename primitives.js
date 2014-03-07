
function Vertex(x,y,z) {
	// class variables
	this.x = [x,y,z];

	// class functions
	this.add   = add;
	this.sub   = sub;
	this.dot   = dot;
	this.len   = len;
	this.dist  = dist;
	this.cross = cross;

	function add(p) {
		return new Vertex(this.x[0]+p.x[0], this.x[1]+p.x[1], this.x[2]+p.x[2]);
	}

	function sub(p) {
		return new Vertex(this.x[0]-p.x[0], this.x[1]-p.x[1], this.x[2]-p.x[2]);
	}

	function dot(p) {
		var result = 0.0;
		for(var i=0; i<3; i++)  {
			result += this.x[i] * p.x[i];
		}
		return result;
	}

	function len() {
		return Math.sqrt(this.dot(this));
	}
	
	function dist(p) {
		var subP = this.sub(p);
		return subP.len();
	}

	function cross(p) {
		return new Vertex(this.x[1]*p.x[2]-this.x[2]*p.x[1],
		                  this.x[2]*p.x[0]-this.x[0]*p.x[2],
		                  this.x[0]*p.x[1]-this.x[1]*p.x[0]);
	}
}

function Edge(i,j) {
	// class variables
	this.vertex = [];
	this.face   = [];
	this.nextFaceVertex = [];
	this.intVertices = [];

	// class functions
	this.equals = equals;

	function equals(l) {
		return (this.vertex[0]==l.vertex[0] && this.vertex[1]==l.vertex[1]) ||
		       (this.vertex[0]==l.vertex[1] && this.vertex[1]==l.vertex[0]);
	}
}

function Face(vertices) {
	// class variables
	this.vertices    = vertices;
	this.edge        = [];
	this.intVertices = [];
	
	// class functions
	this.addVertex      = addVertex;
	this.containsVertex = containsVertex;
	this.reorderVertex  = reorderVertex;

}


