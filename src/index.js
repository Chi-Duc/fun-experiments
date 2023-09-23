const fs = require("fs");

function readInputFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (err) {
    console.error("Error reading input file:", err);
    process.exit(1);
  }
}

function processInput(input) {
  const lines = input.trim().split("\n");
  const [gridX, gridY] = lines[0].split(" ").map(Number);
  const rovers = [];
  const occupiedPositions = [];

  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, orientation] = lines[i].split(" ");
    const instructions = lines[i + 1];
    const rover = new MarsRover(parseInt(x), parseInt(y), orientation);
    rover.executeInstructions(instructions, gridX, gridY, occupiedPositions);
    rovers.push(rover);

    occupiedPositions.push({ x: rover.x, y: rover.y });
  }

  return { gridX, gridY, rovers };
}

function main() {
  const inputFilePath = "input.txt"; // Specify the path to your text input file
  const inputText = readInputFromFile(inputFilePath);
  const { gridX, gridY, rovers } = processInput(inputText);

  const results = [];
  for (const rover of rovers) {
    results.push(rover.getPosition());
  }

  console.log(results.join("\n"));
}

main();
