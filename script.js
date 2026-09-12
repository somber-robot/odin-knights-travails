function applyDelta(origin, delta) {
  const result = [origin[0] + delta[0], origin[1] + delta[1]];
  const valid =
    result[0] >= 0 && result[0] <= 7 && result[1] >= 0 && result[1] <= 7;
  return valid && result;
}

function generateAdjacencyList() {
  const DELTAS = [
    [-2, -1],
    [-2, +1],
    [-1, +2],
    [+1, +2],
    [-1, -2],
    [+1, -2],
    [+2, -1],
    [+2, +1],
  ];
  const list = {};
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const targets = [];
      for (const delta of DELTAS) {
        const result = applyDelta([row, col], delta);
        if (result) targets.push(result);
      }
      list[`${row}${col}`] = targets;
    }
  }
  return list;
}

const LIST = generateAdjacencyList();

const includes = (container, array) => {
  for (const item of container)
    if (array[0] == item[0] && array[1] == item[1]) return true;
  return false;
};

function bfs(origin, target) {
  const visited = [];
  const queue = [];
  queue.push([origin, [origin]]);
  visited.push(origin);
  while (queue.length) {
    const [node, path] = queue.shift();
    if (node[0] == target[0] && node[1] == target[1]) return path;
    const key = `${node[0]}${node[1]}`;
    for (const neighbor of LIST[key]) {
      if (includes(visited, neighbor)) continue;
      queue.push([neighbor, [...path, neighbor]]);
      visited.push(neighbor);
    }
  }
}

function knightMoves(origin, target) {
  const path = bfs(origin, target);
  console.log(
    `=> You made it in ${path.length} move${path.length === 1 ? "" : "s"}! Here's your path:`,
  );
  path.forEach((element) => {
    console.log("   ", element);
  });
}

knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
