
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

	// class functions
	this.equals = equals;

	function equals(l) {
		return (this.i==l.i && this.j==l.j) || (this.i==l.j && this.j==l.i);
	}
}



function Face(vertices) {
	// class variables
	this.vertices = vertices;
	
	// class functions
	this.addVertex      = addVertex;
	this.containsVertex = containsVertex;
	this.reorderVertex  = reorderVertex;

	function addVertex(p) {
		var exist = false;
		for(var i in this.vertices) {
			if(this.vertices[i] == p) {
				exist = true;
				break;
			}
		}
		if(!exist)
			this.vertices.push(p);
	}

	function containsVertex(p) {
		var result;
	}

	function reorderVertex(coordinates) {
		var d = 1e10;
		var p0 = coordinates.pts[this.vertices[0]];
		for(var i=1; i<this.vertices.length; i++) {
			var newDist = p0.dist(coordinates.pts[this.vertices[i]]);
			d = (d<newDist) ? d : newDist;
		}
	}
}


function VertexSet() {
	// class variables
	this.pts = []

	// class functions
	this.push = push;
	this.dump = dump;

	function push(p) {
		var exist = false;
		for( var i in this.pts ) {
			if(this.pts[i].dist(p) < 1e-10) {
				exist = true;
			}
		}
		if(!exist) {
			this.pts.push(p);
			return this.pts.length;
		} else {
			return i;
		}
	}
	
	function dump() {
		var result = [];
		for(var i in this.pts) {
			for(var j in this.pts[i].x) {
				result.push(this.pts[i].x[j]);
			}
		}
		return result;
	}
}

