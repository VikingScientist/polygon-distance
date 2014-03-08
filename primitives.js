
function Vertex(x,y,z) {
	// class variables
	this.x = [x,y,z];
	this.face = [];

	// class functions
	this.add    = add;
	this.sub    = sub;
	this.mult   = mult;
	this.normalize  = normalize;
	this.dot    = dot;
	this.len    = len;
	this.dist   = dist;
	this.cross  = cross;
	this.addFace= addFace;
	this.equals = equals;
	this.toString = toString;

	function add(p) {
		return new Vertex(this.x[0]+p.x[0], this.x[1]+p.x[1], this.x[2]+p.x[2]);
	}

	function sub(p) {
		return new Vertex(this.x[0]-p.x[0], this.x[1]-p.x[1], this.x[2]-p.x[2]);
	}

	function mult(a) {
		return new Vertex(this.x[0]*a, this.x[1]*a, this.x[2]*a);
	}

	function normalize(a) {
		var d = this.len();
		this.x[0] /= d;
		this.x[1] /= d;
		this.x[2] /= d;
	}

	function dot(p) {
		var result = 0.0;
		for(var i=0; i<3; i++) 
			result += this.x[i] * p.x[i];
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

	function addFace(f) {
		for(var i in this.face)
			if(this.face[i] == f)
				return;
		this.face.push(f);
	}

	function equals(p) {
		for(var i in this.x)
			if(Math.abs(this.x[i] - p.x[i]) > 1e-10)
				return false;
		return true;
	}

	function toString() {
		return this.x[0] + ", " + this.x[1] + ", " + this.x[2];
	}
}

function Edge(start, stop) {
	// class variables
	this.vertex = [start, stop];
	this.face   = [];
	this.nextFaceVertex = [];
	this.intVertices = [];

	// class functions
	this.equals = equals;
	this.toString = toString;

	function equals(l) {
		return (this.vertex[0].equals(l.vertex[0]) && this.vertex[1].equals(l.vertex[1])) ||
		       (this.vertex[0].equals(l.vertex[1]) && this.vertex[1].equals(l.vertex[0]));
	}
	
	function toString() {
		return "(" + this.vertex[0].toString() + ") -> (" + this.vertex[1].toString() + ")";
	}
}

function Face(vertices) {
	// class variables
	this.vertices    = vertices;
	this.edge        = [];
	this.intVertices = [];
	
	// class functions
	this.reorganizePoints = reorganizePoints;
	this.equals        = equals;
	this.getCentroid   = getCentroid;
	this.getVertexList = getVertexList;
	this.toString      = toString;

	function reorganizePoints() {
		for(var j=0; j<this.vertices.length-2; j++) {
			var minLen = 1e100;
			var minI   = -1;
			for(var i=j+1; i<this.vertices.length; i++) {
				var d = this.vertices[i].dist(this.vertices[j]);
				if(d<minLen) {
					minLen = d;
					minI = i;
				}
			}
			var tmp = this.vertices[j+1];
			this.vertices[j+1] = this.vertices[minI];
			this.vertices[minI] = tmp;
		}
		var u = this.vertices[1].sub(this.vertices[0]);
		var v = this.vertices[2].sub(this.vertices[1]);
		var n = u.cross(v);
		var c = this.getCentroid();
		if(c.dot(n) < 0) { // clockwise ordering... need to swap
			var tmp = [];
			for(var i=this.vertices.length; i-->0; )
				tmp.push(this.vertices[i]);
			this.vertices = tmp;
		}
	}

	function equals(f) {
		for(var i in this.vertices)
			if(!this.vertices[i].equals(f.vertices[i]) )
				return false;
		return true;
	}

	function getCentroid() {
		var p = [0,0,0];
		for(var i in this.vertices) {
			p[0] += this.vertices[i].x[0];
			p[1] += this.vertices[i].x[1];
			p[2] += this.vertices[i].x[2];
		}
		p[0] /= this.vertices.length;
		p[1] /= this.vertices.length;
		p[2] /= this.vertices.length;
		return new Vertex(p[0], p[1], p[2]);
	}

	function getVertexList() {
		var result = []
		for(var i in this.vertices)
			for(var j in this.vertices[i].x)
				result.push(this.vertices[i].x[j]);
		return result;
	}

	function toString() {
		var result = "";
		for(var i in this.vertices) 
			// result = result + "(";
			result = result + "(" + this.vertices[i] + ") - ";
		return result;
	}


}


