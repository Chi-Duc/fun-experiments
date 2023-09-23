class MarsRover {
  constructor(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }

  move(instruction, gridX, gridY, occupiedPositions) {
    const newPosition = { x: this.x, y: this.y };

    if (instruction === "M") {
      switch (this.orientation) {
        case "N":
          newPosition.y += 1;
          break;
        case "S":
          newPosition.y -= 1;
          break;
        case "E":
          newPosition.x += 1;
          break;
        case "W":
          newPosition.x -= 1;
          break;
        default:
          break;
      }

      // Check if the new position is within the plateau boundaries and not occupied
      if (
        newPosition.x >= 0 &&
        newPosition.x <= gridX &&
        newPosition.y >= 0 &&
        newPosition.y <= gridY &&
        !occupiedPositions.some(
          pos => pos.x === newPosition.x && pos.y === newPosition.y
        )
      ) {
        this.x = newPosition.x;
        this.y = newPosition.y;
      }
    } else if (instruction === "L" || instruction === "R") {
      this.rotate(instruction);
    }
  }

  rotate(direction) {
    const orientations = ["N", "E", "S", "W"];
    const currentIndex = orientations.indexOf(this.orientation);

    if (direction === "L") {
      this.orientation = orientations[(currentIndex + 3) % 4];
    } else if (direction === "R") {
      this.orientation = orientations[(currentIndex + 1) % 4];
    }
  }

  executeInstructions(instructions, gridX, gridY, occupiedPositions) {
    for (const instruction of instructions) {
      this.move(instruction, gridX, gridY, occupiedPositions);
    }
  }

  getPosition() {
    return `${this.x} ${this.y} ${this.orientation}`;
  }
}

module.exports = MarsRover;
