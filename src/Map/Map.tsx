import Cell from "./Cell";
import { useState } from "react";
import "./Map.scss";

const seedrandom = require("seedrandom");

function intensity(position: number[], peakPoints: number[][]) {
  return peakPoints
    .map(
      (peakPoint: number[]) =>
        1 /
        Math.sqrt(
          (peakPoint[0] - position[0]) ** 2 + (peakPoint[1] - position[1]) ** 2
        )
    )
    .reduce((a, b) => a + b);
}

function generate(generator: any, dimensions: number) {
  const colorVariety: number = 100;
  const colorBoundary: number = 255;

  const peaks = 3;
  const peakPoints = [...Array(peaks)].map(() =>
    place(dimensions, 0, generator)
  );

  const image = [...Array(dimensions)].map((_, row) =>
    [...Array(dimensions)].map(
      (_, col) =>
        intensity([row, col], peakPoints) * colorBoundary +
        generator() * colorVariety
    )
  );

  console.log(image);

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

function render(space: number[][]) {
  var count: number = 0;
  return space.map((row: number[], rowIndex: number) => (
    <tr>
      {row.map((cell: number, cellIndex: number) => (
        <Cell intensity={cell} reference={count++} />
      ))}
    </tr>
  ));
}

export default function Map() {
  const initialMoves = 42;

  const dimensions: number = 100;
  const subdimensions: number = 10;

  const [seed, setSeed] = useState("start");
  const generator = seedrandom(seed);
  const image: number[][] = generate(generator, dimensions);

  const [position, setPosition] = useState(
    place(dimensions, subdimensions, Math.random)
  );
  const [moves, setMoves] = useState(initialMoves);

  function move(x_change: number, y_change: number) {
    const row = position[0] + y_change;
    const col = position[1] + x_change;

    if (
      0 <= row &&
      row < dimensions - subdimensions &&
      0 <= col &&
      col < dimensions - subdimensions
    ) {
      setPosition([row, col]);
      setMoves(moves - 1);
    }
  }

  return (
    <div className="Map">
      {moves > 0 ? (
        <div>
          <table>
            <tbody>{render(sample(image, position, subdimensions))}</tbody>
          </table>
          <input
            type="text"
            name="game"
            className="seed"
            placeholder="Insert game room: Currently 'start'"
            onChange={(e) => {
              setSeed(e.target.value);
            }}
          />
          <div className="Controls">
            <button onClick={() => move(+0, -1)}>&#8593;</button>
            <button onClick={() => move(+0, +1)}>&#8595;</button>
            <button onClick={() => move(-1, +0)}>&#8592;</button>
            <button onClick={() => move(+1, +0)}>&#8594;</button>
          </div>
          <p className="Move">{moves}</p>
        </div>
      ) : (
        <p className="End">
          {position[0]}, {position[1]}
        </p>
      )}
    </div>
  );
}
