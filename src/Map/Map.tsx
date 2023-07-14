import Cell from "./Cell";
import { useState } from "react";
import config from "./config.json";

import "./Map.scss";

const seedrandom = require("seedrandom");

function intensity(position: number[], peakPoints: number[][]) {
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
  return generator() * config.color.noiseBoundary;
}

function generate(generator: any, dimensions: number) {
  const peakPoints = [...Array(config.board.peakCount)].map(() =>
    place(dimensions, 0, generator)
  );

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
  return image
    .slice(position[0], position[0] + subdimensions)
    .map((row: any) => row.slice(position[1], position[1] + subdimensions));
}

function place(dimensions: number, subdimensions: number, generator: any) {
  return [
    Math.floor(generator() * (dimensions - subdimensions)),
    Math.floor(generator() * (dimensions - subdimensions)),
  ];
}

function render(theme: string, space: number[][]) {
  var count: number = 0;
  return space.map((row: number[], rowIndex: number) => (
    <tr>
      {row.map((cell: number, cellIndex: number) => (
        <Cell color={theme} intensity={cell} reference={count++} />
      ))}
    </tr>
  ));
}

interface MapProps {
  darkMode: boolean;
  theme: string;
  seed: string;
}

export default function Map({ darkMode, theme, seed }: MapProps) {
  const generator = seedrandom(seed);
  const image: number[][] = generate(generator, config.board.dimensions);

  const [position, setPosition] = useState(
    place(config.board.dimensions, config.board.subdimensions, Math.random)
  );
  const [moves, setMoves] = useState(config.board.initialMoves);

  function move(x_change: number, y_change: number) {
    const row = position[0] + y_change;
    const col = position[1] + x_change;

    if (
      0 <= row &&
      row < config.board.dimensions - config.board.subdimensions &&
      0 <= col &&
      col < config.board.dimensions - config.board.subdimensions
    ) {
      setPosition([row, col]);
      setMoves(moves - 1);
    }
  }

  const style = darkMode
    ? { backgroundColor: "black", color: "white" }
    : { backgroundColor: "white", color: "black" };

  return (
    <div className="Map">
      {moves > 0 ? (
        <div>
          <table>
            <tbody>
              {render(
                theme,
                sample(image, position, config.board.subdimensions)
              )}
            </tbody>
          </table>
          <div className="Controls">
            <button
              className="Control"
              onClick={() => move(+0, -1)}
              style={style}
            >
              &#8593;
            </button>
            <button
              className="Control"
              onClick={() => move(+0, +1)}
              style={style}
            >
              &#8595;
            </button>
            <button
              className="Control"
              onClick={() => move(-1, +0)}
              style={style}
            >
              &#8592;
            </button>
            <button
              className="Control"
              onClick={() => move(+1, +0)}
              style={style}
            >
              &#8594;
            </button>
          </div>
          <p className="Move" style={style}>{moves}</p>
        </div>
      ) : (
        <p className="End" style={style}>
          {position[0]}, {position[1]}
        </p>
      )}
    </div>
  );
}
