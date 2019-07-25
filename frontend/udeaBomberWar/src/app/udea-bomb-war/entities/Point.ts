export class Point {
  x;
  y;
  coincide: (punto: any) => boolean;
  constructor(x, y) {
    this.x = x;
    this.y = y

  }
}

Point.prototype.coincide = function (point) {
  return (this.x === point.x && this.y === point.y)
}
