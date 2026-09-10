/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   8 PUZZLE
========================================= */

let puzzle = [
    7, 2, 4,
    5, 0, 6,
    8, 3, 1
];

const goalPuzzle = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 0
];


function displayPuzzle() {

    const board = document.getElementById("puzzleBoard");

    if (!board) return;

    board.innerHTML = "";

    puzzle.forEach(function(value, index) {

        const tile = document.createElement("div");

        tile.className = "tile";

        if (value === 0) {

            tile.classList.add("empty");

        } else {

            tile.innerHTML = value;

            tile.onclick = function() {
                movePuzzle(index);
            };
        }

        board.appendChild(tile);
    });
}


function movePuzzle(index) {

    const emptyIndex = puzzle.indexOf(0);

    const row1 = Math.floor(index / 3);
    const col1 = index % 3;

    const row2 = Math.floor(emptyIndex / 3);
    const col2 = emptyIndex % 3;

    const distance =
        Math.abs(row1 - row2) +
        Math.abs(col1 - col2);

    if (distance === 1) {

        [puzzle[index], puzzle[emptyIndex]] =
        [puzzle[emptyIndex], puzzle[index]];

        displayPuzzle();

        checkPuzzleGoal();
    }
}


function checkPuzzleGoal() {

    if (puzzle.join(",") === goalPuzzle.join(",")) {

        document.getElementById("puzzleMessage").innerHTML =
            "🎉 Congratulations! Goal state reached!";
    }
}


function shufflePuzzle() {

    for (let i = 0; i < 100; i++) {

        const empty = puzzle.indexOf(0);

        const row = Math.floor(empty / 3);
        const col = empty % 3;

        let possible = [];

        if (row > 0)
            possible.push(empty - 3);

        if (row < 2)
            possible.push(empty + 3);

        if (col > 0)
            possible.push(empty - 1);

        if (col < 2)
            possible.push(empty + 1);

        const random =
            possible[Math.floor(Math.random() * possible.length)];

        [puzzle[empty], puzzle[random]] =
        [puzzle[random], puzzle[empty]];
    }

    displayPuzzle();

    document.getElementById("puzzleMessage").innerHTML =
        "Puzzle shuffled. Click a tile next to the blank space.";
}


function solvePuzzle() {

    puzzle = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 0
    ];

    displayPuzzle();

    document.getElementById("puzzleMessage").innerHTML =
        "⭐ Goal state reached!";
}


function resetPuzzle() {

    puzzle = [
        7, 2, 4,
        5, 0, 6,
        8, 3, 1
    ];

    displayPuzzle();

    document.getElementById("puzzleMessage").innerHTML =
        "Puzzle reset.";
}


/* =========================================
   WATER JUG
========================================= */

let jug5 = 0;
let jug3 = 0;


function updateJugs() {

    document.getElementById("value5").innerHTML = jug5;

    document.getElementById("value3").innerHTML = jug3;

    document.getElementById("water5").style.height =
        (jug5 / 5 * 100) + "%";

    document.getElementById("water3").style.height =
        (jug3 / 3 * 100) + "%";

    if (jug5 === 4) {

        document.getElementById("jugMessage").innerHTML =
            "🎉 Goal reached! Exactly 4 litres is in the 5L jug.";

    } else {

        document.getElementById("jugMessage").innerHTML =
            "Current State = (" + jug5 + ", " + jug3 + ")";
    }
}


function fillJug(jug) {

    if (jug === 1) {

        jug5 = 5;

    } else {

        jug3 = 3;
    }

    updateJugs();
}


function emptyJug(jug) {

    if (jug === 1) {

        jug5 = 0;

    } else {

        jug3 = 0;
    }

    updateJugs();
}


function pourJug(from, to) {

    if (from === 1 && to === 2) {

        const amount =
            Math.min(jug5, 3 - jug3);

        jug5 -= amount;

        jug3 += amount;

    } else {

        const amount =
            Math.min(jug3, 5 - jug5);

        jug3 -= amount;

        jug5 += amount;
    }

    updateJugs();
}


function resetJugs() {

    jug5 = 0;

    jug3 = 0;

    updateJugs();
}


/* =========================================
   VACUUM CLEANER
========================================= */

let vacuumPosition = "A";

let cleanA = false;

let cleanB = false;


function vacuumClean() {

    if (vacuumPosition === "A") {

        cleanA = true;

        document.getElementById("roomA")
            .classList.add("clean");

        document.getElementById("roomA")
            .innerHTML = "✨";

    } else {

        cleanB = true;

        document.getElementById("roomB")
            .classList.add("clean");

        document.getElementById("roomB")
            .innerHTML = "✨";
    }

    updateVacuum();
}


function vacuumMove() {

    if (vacuumPosition === "A") {

        vacuumPosition = "B";

    } else {

        vacuumPosition = "A";
    }

    updateVacuum();
}


function updateVacuum() {

    document.getElementById("vacuumPosition")
        .innerHTML = vacuumPosition;

    if (cleanA && cleanB) {

        document.getElementById("vacuumMessage")
            .innerHTML =
            "🎉 Both rooms are clean!";

    } else {

        document.getElementById("vacuumMessage")
            .innerHTML =
            "Vacuum cleaner is in Room " +
            vacuumPosition;
    }
}


function resetVacuum() {

    vacuumPosition = "A";

    cleanA = false;

    cleanB = false;

    document.getElementById("roomA")
        .classList.remove("clean");

    document.getElementById("roomB")
        .classList.remove("clean");

    document.getElementById("roomA")
        .innerHTML = "🗑️";

    document.getElementById("roomB")
        .innerHTML = "🗑️";

    updateVacuum();
}


/* =========================================
   MISSIONARIES & CANNIBALS
========================================= */

let missionStep = 0;


function moveMissionaries() {

    missionStep++;

    document.getElementById("missionMessage")
        .innerHTML =
        "🚣 Move performed: 2 Missionaries.";
}


function moveCannibals() {

    missionStep++;

    document.getElementById("missionMessage")
        .innerHTML =
        "🚣 Move performed: 2 Cannibals.";
}


function moveMixed() {

    missionStep++;

    document.getElementById("missionMessage")
        .innerHTML =
        "🚣 Move performed: 1 Missionary + 1 Cannibal.";
}


function resetMission() {

    missionStep = 0;

    document.getElementById("missionMessage")
        .innerHTML =
        "Problem reset.";
}


/* =========================================
   BFS
========================================= */

function runBFS() {

    const graph = {

        A: ["B", "C"],

        B: ["D", "E"],

        C: ["F"],

        D: [],

        E: [],

        F: []
    };


    const queue = ["A"];

    const visited = [];


    while (queue.length > 0) {

        const node = queue.shift();

        if (!visited.includes(node)) {

            visited.push(node);

            queue.push(...graph[node]);
        }
    }


    document.getElementById("bfsResult")
        .innerHTML =
        "BFS Traversal:\n\n" +
        visited.join(" → ");
}


/* =========================================
   DFS
========================================= */

function runDFS() {

    const graph = {

        A: ["B", "C"],

        B: ["D", "E"],

        C: ["F"],

        D: [],

        E: [],

        F: []
    };


    const visited = [];


    function dfs(node) {

        visited.push(node);

        graph[node].forEach(function(child) {

            if (!visited.includes(child)) {

                dfs(child);
            }
        });
    }


    dfs("A");


    document.getElementById("dfsResult")
        .innerHTML =
        "DFS Traversal:\n\n" +
        visited.join(" → ");
}


/* =========================================
   A* SEARCH
========================================= */

function runAStar() {

    const steps = [

        "Start Node: A",

        "Calculate f(n) = g(n) + h(n)",

        "Select node with lowest f(n)",

        "Expand neighbouring nodes",

        "Calculate g(n), h(n) and f(n)",

        "Continue searching",

        "Goal Node reached!"
    ];


    document.getElementById("astarResult")
        .innerHTML =
        steps.join("\n");
}


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    displayPuzzle();

    updateJugs();

    updateVacuum();

});
