import { create } from "domain";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const day5part1 = () => {
  const input = fs
    .readFileSync(path.join(__dirname, "day5-input.txt"), "utf-8")
    .split("\n")
    .filter((e) => e);

  let lineCoordinates = [];
  const findHorizontalOrVerticalLineCoordinates = (input) => {
    for (let line of input) {
      //use destructuring assignment
      let [[x1, y1], [x2, y2]] = line
        .split(" -> ")
        .map((element) => element.split(","));

      if (x1 === x2 || y1 === y2) {
        // the + triggers implicit type coercion
        // turning the strings into numbers
        let coordinates = [
          [+x1, +y1],
          [+x2, +y2],
        ];
        lineCoordinates.push(coordinates);
      }
    }
    return lineCoordinates;
  };
  findHorizontalOrVerticalLineCoordinates(input);
  //console.log(lineCoordinates);

  //to do --> expand range of points to get all (x,y) on each line
  //then ... count how many times each point appears?
  //grab all the values over 1 --> push to array
  //array.length is the answer
  //straightforward idea but feels inefficient as heck

  /*
  let allPoints = {
    (x1,y1): 1
    (x1+1, y1+1): 1
    (x1+2, y1+2): 2
    (x1+3, y1+3): 2
  }
  */
};

day5part1();
