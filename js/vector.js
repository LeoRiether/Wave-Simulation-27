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

  abs() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }
  plus(b) {
    return Vector.Sum(this, b);
  }
  dot(b) {
    return Vector.Dot(this, b);
  }
  times(s) {
    return Vector.Scale(this, s);
  }
  
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