import Cell from "./Cell";
import config from "../config.json";

import "./Board.scss";

const seedrandom = require("seedrandom");

function intensity(position: number[], peakPoints: number[][]) {
  // Generate intensity heatmap based on manhattan distance from peak points
  // Inverted so that closer points are brighter

  return peakPoints
    .map((peakPoint: number[]) =>
      peakPoint[0] === position[0] && peakPoint[1] === position[1]
        ? 1
        : 1 /
          (Math.abs(peakPoint[0] - position[0]) +
            Math.abs(peakPoint[1] - position[1]))
    )
    .reduce((a, b) => a + b);
}

function noise(generator: any) {
  // (Seeded) random noise to make the map harder to memorize
  return generator() * config.color.noiseBoundary;
}

function generate(generator: any, dimensions: number) {
  // Generate a map based on a seeded random number generator

  // Generate peak points where the intensity is highest
  const peakPoints = [...Array(config.board.peakCount)].map(() =>
    place(dimensions, 0, generator)
  );

  // Generate the image based on the intensity heatmap with noise
  const image = [...Array(dimensions)].map((_, row) =>
    [...Array(dimensions)].map(
      (_, col) =>
        (intensity([row, col], peakPoints) * config.color.boundary +
          noise(generator)) /
        config.color.boundary
    )
  );

  return image;
}

function sample(image: number[][], position: number[], subdimensions: number) {
  // Returns a portion of the image based on the player's position (center)

  return image
    .slice(position[0], position[0] + subdimensions)
    .map((row: any) => row.slice(position[1], position[1] + subdimensions));
}

function place(dimensions: number, subdimensions: number, generator: any) {
  // Randomly returns a point on the map

  const walkableSpace = dimensions - subdimensions;
  return [
    Math.floor(generator() * walkableSpace),
    Math.floor(generator() * walkableSpace),
  ];
}

function render(theme: string, heatmap: number[][]) {
  // Generates the cells of the map with the appropriate theme and heatmap

  return heatmap.map((row: number[], rowIndex: number) => (
    <tr key={rowIndex}>
      {row.map((cell: number, cellIndex: number) => (
        <Cell
          color={theme}
          intensity={cell}
          key={rowIndex * config.board.dimensions + cellIndex}
        />
      ))}
    </tr>
  ));
}

interface BoardProps {
  config: any;
  theme: string;
  seed: string;
  position: number[];
}

export default function Map({ config, theme, seed, position }: BoardProps) {
  // Seeded random number generator to ensure the same map is generated
  // for the same seed so players can share maps asynchronously

  const generator = seedrandom(seed);
  const image: number[][] = generate(generator, config.board.dimensions);

  return (
    <table>
      <tbody>
        {render(theme, sample(image, position, config.board.subdimensions))}
      </tbody>
    </table>
  );
}
