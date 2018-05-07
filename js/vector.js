// Could have jsut used p5.Vector, 
// but didn't know it existed until after this file was made
export class Vector {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static is(x, y) {
    return new Vector(x, y);
  } 

  toString() {
    return `${this.x}i ${this.y>0?'+':'-'} ${Math.abs(this.y)}j`;
  }

  get neg() {
    return Vector.scale(this, -1);
  }

  abs() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  // Functions that have side effects (change this)
  plus(b) {
    this.x += b.x;
    this.y += b.y;
    return this;
  }
  dot(b) {
    this.x *= b.x;
    this.y *= b.y;
    return this;
  }
  times(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }
  
  // Functions that don't have side effects (return new vectors)
  static Sum(a, b) {
    return new Vector(a.x+b.x, a.y+b.y);
  }
  static Dot(a, b) {
    return a.x*b.x + a.y*b.y;
  }
  static Scale(a, s) {
    return new Vector(a.x*s, a.y*s);
  }


};

Vector.zero = Vector.is(0, 0);

console.log("Vector.ts loaded");