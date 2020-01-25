<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button></v-ons-back-button>
      </div>
      <div class="center primary--text">{{stage.toUpperCase()}} LEVEL {{id}}</div>
      <div class="right">
        <v-ons-toolbar-button @click="doReset()">
          <v-ons-icon icon="md-refresh"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div class="game-board" ref="gameBoard">
      <v-ons-row v-for="(item, y) in board" :key="y">
        <v-ons-col
          v-for="(num, x) in item"
          :key="x"
          class="game-tile text-center"
          :class="[
            x % 3 === 2 && x !== 8 ? 'border-right' : '', 
            y % 3 === 2 && y !== 8 ? 'border-bottom' : '',
            exactActiveTile === getTileIndex(x, y) ? 'ractive' : '',
            activeTile.indexOf(getTileIndex(x, y)) !== -1 ? 'active' : '',
            isFailTile.indexOf(getTileIndex(x, y)) !== -1 ? 'fail-active' : ''
            ]"
          :style="`height:${tileHeight}px`"
          @click="isActive(x, y)"
        >
          <div v-if="num !== 0" :class="isEditTile(x, y) ? 'primary--text' : ''">
            <div class="tile-num">{{num}}</div>
          </div>
          <div v-else class="note-tile">
            <v-ons-row v-for="(i, index) in editTile[y][x]" :key="index">
              <v-ons-col
                v-for="(j, _index) in i"
                :key="_index"
                :style="`height: ${noteTileHeight}px`"
              >
                <span v-if="j !== 0">{{j}}</span>
              </v-ons-col>
            </v-ons-row>
          </div>
          <!-- <span v-else>
            <div class="note-tile">
              <v-ons-row v-for="(i, index) in editTile[y][x]" :key="index">
                <v-ons-col v-for="j in i" :key="j" :style="`height: ${noteTileHeight}px`">{{j}}</v-ons-col>
              </v-ons-row>
            </div>
          </span>-->
        </v-ons-col>
      </v-ons-row>
    </div>

    <div class="game-pad">
      <div class="game-numpad w-100">
        <v-ons-row class="text-center pt-2 pl-2 pr-2">
          <v-ons-col v-for="i in [1,2,3,4,5,6,7,8,9]" :key="i" @click="setNumber(i)" width="11%">
            <v-ons-button modifier="material" class="px-3">{{i}}</v-ons-button>
          </v-ons-col>
        </v-ons-row>

        <v-ons-row class="text-center pt-4 pl-2 pr-2">
          <v-ons-col>
            <v-ons-toolbar-button
              class="pa-0"
              modifier="material"
              v-if="x !== undefined && y !== undefined && isEditTile(x, y)"
            >
              <v-ons-icon @click="remove()" class="blue-grey--text game-pad-icon" icon="md-delete">
                <div style="font-size:0.5em;">DELETE</div>
              </v-ons-icon>
            </v-ons-toolbar-button>
            <v-ons-toolbar-button v-else class="pa-0" modifier="material">
              <v-ons-icon class="grey--text game-pad-icon" icon="md-delete">
                <div style="font-size:0.5em;">DELETE</div>
              </v-ons-icon>
            </v-ons-toolbar-button>
          </v-ons-col>
          <v-ons-col>
            <v-ons-toolbar-button class="pa-0" modifier="material" @click="undo()">
              <v-ons-icon
                :class="[ this.historyTile.length ? 'blue-grey--text': 'grey--text' ]"
                class="game-pad-icon"
                icon="md-undo"
              >
                <div style="font-size:0.5em;">UNDO</div>
              </v-ons-icon>
            </v-ons-toolbar-button>
          </v-ons-col>
          <v-ons-col>
            <v-ons-toolbar-button class="pa-0" modifier="material" @click="note()">
              <v-ons-icon
                :class="[ noteMode ? 'blue--text': 'blue-grey--text' ]"
                class="game-pad-icon"
                icon="md-brush"
              >
                <div style="font-size:0.5em;">NOTE</div>
              </v-ons-icon>
            </v-ons-toolbar-button>
          </v-ons-col>
          <v-ons-col>
            <v-ons-toolbar-button class="pa-0" modifier="material" v-touch:tap="hintHandler">
              <v-ons-icon class="blue-grey--text game-pad-icon" icon="md-coffee">
                <div style="font-size:0.5em;">HINT</div>
              </v-ons-icon>
            </v-ons-toolbar-button>
          </v-ons-col>
        </v-ons-row>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { showInterstitial } from "@/api/admob.js";
export default {
  name: "play",
  data() {
    return {
      board: [],
      activeTile: [], // 마우스 클릭 시 가능 여부 hover
      isFailTile: [], // 실패했을 시
      exactActiveTile: -1, // 마우스 클릭 시 가능 여부 hover exact
      editTile: [], // 현재 타일이 수정가능한지 여부,
      historyTile: [], // Undo 기능을 위한 배열
      noteTile: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      gamePad: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      tileHeight: 0,
      width: 0,
      resizeHandler: null,
      noteMode: false,
      x: undefined,
      y: undefined,
      params: this.$router.history.current.params,
      id: 0,
      stage: "",
      noteTileHeight: "",
      gamePadHeight: 100
      // isFavorite: false
    };
  },
  created() {
    // 변수 세팅
    this.id = String(this.params.id);
    this.stage = String(this.params.stage);
  },
  mounted() {
    // // // this.resizeHandler = window.addEventListener("resize", this.resize);
    setTimeout(() => {
      // this.gameSetting();
      this.gameUI();
      this.gameInit();
    }, 1);
  },
  destroyed() {
    this.board = [];
    this.activeTile = []; // 마우스 클릭 시 가능 여부 hover
    this.isFailTile = []; // 실패했을 시
    this.editTile = []; // 현재 타일이 수정가능한지 여부
  },
  // destroyed() {
  //   this.resizeHandler = null;
  // },
  methods: {
    hintHandler() {
      showInterstitial();
    },
    doReset() {
      this.$ons.notification
        .confirm("Are you sure?", { title: "Reset" })
        .then(response => {
          if (response) {
            this.gameInit();
          }
        });
    },
    gameUI() {
      let pageHeight = this.$refs.gameBoard.parentElement.clientHeight;
      let gameBoardHeight = this.$refs.gameBoard.clientHeight;

      this.gamePadHeight = pageHeight - gameBoardHeight - 4;

      this.width = this.$refs.gameBoard.clientWidth;
      this.tileHeight = this.width / 9;
      this.noteTileHeight = this.tileHeight / 3;
    },
    remove() {
      let x = this.x;
      let y = this.y;
      if (this.isEditTile(x, y)) {
        this.$set(this.board[y], x, 0);

        let index = this.isFailTile.indexOf(this.getTileIndex(x, y));

        if(index !== -1){
          this.isFailTile.splice(index, 1);
        }
      }
    },
    note() {
      this.noteMode = !this.noteMode;
    },
    undo() {
      let len = this.historyTile.length;
      let item = this.historyTile[len - 1];

      if (item === undefined || item.index === undefined) {
        return false;
      }

      let index = this.getTileXY(item.index);
      let x = index.x;
      let y = index.y;
      this.$set(this.board[x], y, 0);

      let failIndex = this.isFailTile.indexOf(this.getTileIndex(y, x));
      if (failIndex !== -1) {
        this.isFailTile.splice(failIndex, 1);
      }

      this.isActive(y, x)

      this.historyTile.pop();
    },
    isClear() {
      if (this.isFailTile.length !== 0) {
        return false;
      }

      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (this.board[x][y] === 0) {
            return false;
          }
        }
      }

      // 클리어 기록 저장
      let key = `${this.stage}-clear`;
      let result = localStorage[key];

      let clearList = result.split(",");

      let index = clearList.indexOf(this.id);
      if (index === -1) {
        clearList.push(this.id);
      }
      localStorage[key] = clearList;

      // 타일 색상 변화
      let gameBoard = this.$refs.gameBoard;
      let t = gameBoard.getElementsByClassName("game-tile");
      for (let i = 0; i < t.length; i++) {
        t[i].classList.remove("active");
        t[i].classList.add("game-clear");
      }

      // 1초 후 완료페이지 이동
      setTimeout(() => {
        this.$router.push({
          name: "Clear",
          params: { stage: this.stage, id: Number(this.id) + 1 }
        });
      }, 1000);
    },
    isCheck(number) {
      let x = this.x;
      let y = this.y;
      let key = this.getTileIndex(x, y);
      let groupTile = this.getGroupTile(key);

      // 가로행 없는지 검사
      if (this.board[y].indexOf(number) !== -1) {
        return false;
      }
      // 세로행 없는지 검사
      for (let i = 0; i < 9; i++) {
        if (this.board[i][x] === number) {
          return false;
        }
      }

      // 해당 그룹에 숫자가 있는지 검사
      for (let i = 0; i < groupTile.length; i++) {
        let obj = this.getTileXY(groupTile[i]);
        if (this.board[obj.x][obj.y] === number) {
          return false;
        }
      }
      return true;
    },
    setNumber(number) {
      // 칸을 선택하지 않았을 경우
      if (this.x === undefined || this.y === undefined) {
        return;
      }

      let x = this.x;
      let y = this.y;

      // 타일의 값과 입력한 값이 같은 경우
      if (this.board[y][x] === number) {
        this.remove()
        this.setNumber(number)
        return;
      }

      if (!this.noteMode) {
        // 노트모드가 아닐 경우
        if (this.isEditTile(x, y)) {
          // 색상체크
          let index = this.isFailTile.indexOf(this.getTileIndex(x, y));
          if (!this.isCheck(number)) {
            if (index === -1) {
              this.isFailTile.push(this.getTileIndex(x, y));
            }
          } else {
            if(index !== -1){
              this.isFailTile.splice(index, 1);
            }
          }

          // 수정 가능한 타일인지 확인
          this.$set(this.board[y], x, number);
          this.historyTile.push({
            index: this.getTileIndex(x, y),
            value: number
          });
          this.isClear();
        }
      } else {
        // 노트모드 일경우
        let temp = this.editTile[y][x] || [];
        let index = this.getNoteTileXY(number);

        if (temp[index.x][index.y] === number) {
          temp[index.x][index.y] = 0;
        } else {
          temp[index.x][index.y] = number;
        }
        this.$set(this.editTile[y], x, temp);
      }
    },
    resize() {
      this.width = this.$refs.gameBoard.clientWidth;
      this.tileHeight = this.width / 9;
    },
    gameInit() {
      // var expectedBoard = [
      //   [0, 9, 0, 0, 0, 0, 0, 0, 6],
      //   [0, 0, 0, 9, 6, 0, 4, 8, 5],
      //   [0, 0, 0, 5, 8, 1, 0, 0, 0],
      //   [0, 0, 4, 0, 0, 0, 0, 0, 0],
      //   [5, 1, 7, 2, 0, 0, 9, 0, 0],
      //   [6, 0, 2, 0, 0, 0, 3, 7, 0],
      //   [1, 0, 0, 8, 0, 4, 0, 2, 0],
      //   [7, 0, 6, 0, 0, 0, 8, 1, 0],
      //   [3, 0, 0, 0, 9, 0, 0, 0, 0]
      // ];

      let expectedBoard = this.$store.state.levels[this.stage][this.id];

      this.activeTile = []; // 마우스 클릭 시 가능 여부 hover
      this.isFailTile = []; // 실패했을 시
      this.editTile = []; // 현재 타일이 수정가능한지 여부
      this.exactActiveTile = -1;

      // 현재 타일 수정 가능여부
      this.editTile = [];
      for (let i = 0; i < 9; i++) {
        let temp = [];
        for (let j = 0; j < 9; j++) {
          if (expectedBoard[i][j] === 0) {
            // 값이 없을경우에는 노트모드 세팅
            temp.push([
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]
            ]);
          } else {
            temp.push(expectedBoard[i][j]);
          }
        }
        this.editTile.push(temp);
      }

      // 깊은 복사
      this.board = JSON.parse(JSON.stringify(expectedBoard));
    },
    isEditTile(x, y) {
      return typeof this.editTile[y][x] === "object";
    },
    isActive(i, j) {
      let key = this.getTileIndex(i, j);
      this.activeTile = [];
      for (let a = 0; a < 81; a++) {
        // 세로행
        if (a % 9 === i) {
          this.activeTile.push(a);
        }
        // 가로행
        if (9 * j <= a && a < 9 * (j + 1)) {
          this.activeTile.push(a);
        }
      }
      // 클릭한 범위의 컬럼
      this.activeTile = this.activeTile.concat(this.getGroupTile(key));

      // 클릭한 타일은 좀더 진하게
      this.exactActiveTile = this.getTileIndex(i, j);

      this.x = i;
      this.y = j;
    },
    getTileIndex(x, y) {
      return y * 9 + x;
    },
    getTileXY(index) {
      return {
        x: Math.floor(index / 9),
        y: Math.floor(index % 9)
      };
    },
    getNoteTileIndex(x, y) {
      return y * 3 + x;
    },
    getNoteTileXY(index) {
      let t = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: 1 },
        3: { x: 0, y: 2 },
        4: { x: 1, y: 0 },
        5: { x: 1, y: 1 },
        6: { x: 1, y: 2 },
        7: { x: 2, y: 0 },
        8: { x: 2, y: 1 },
        9: { x: 2, y: 2 }
      };
      return t[index];
    },
    getGroupTile(num) {
      let temp = [
        [0, 1, 2, 9, 10, 11, 18, 19, 20],
        [3, 4, 5, 12, 13, 14, 21, 22, 23],
        [6, 7, 8, 15, 16, 17, 24, 25, 26],
        [27, 28, 29, 36, 37, 38, 45, 46, 47],
        [30, 31, 32, 39, 40, 41, 48, 49, 50],
        [33, 34, 35, 42, 43, 44, 51, 52, 53],
        [54, 55, 56, 63, 64, 65, 72, 73, 74],
        [57, 58, 59, 66, 67, 68, 75, 76, 77],
        [60, 61, 62, 69, 70, 71, 78, 79, 80]
      ];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (temp[i][j] === num) {
            return temp[i];
          }
        }
      }
    },
    doFavorite() {
      let key = `${this.stage}-favorite`;
      let result = localStorage[key];

      let items = result.split(",");

      // localStorage.favoriteList = result;
      let index = items.indexOf(this.id);
      if (index === -1) {
        items.push(this.id);
        this.isFavorite = true;
      } else {
        items.splice(index, 1);
        this.isFavorite = false;
      }
      localStorage[key] = items;
      this.$emit("favoriteUpdate");
    }
  }
};
</script>

<style>
.game-board {
  margin: 0 auto;
  max-width: 480px;
  background: white;
  border: 2px solid #344861;
}
.game-pad {
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
.game-pad-icon {
  font-size: 24px;
  width: 100%;
}
.game-tile {
  border-right: 1px solid #bec6d4;
  border-bottom: 1px solid #bec6d4;
}
.game-tile.active {
  background: #ddeeff;
}
.game-tile.fail-active {
  background: #eb4e4e !important;
}
.game-tile.fail-active div {
  color: white !important;
}

.game-tile.ractive {
  background: #b5daff;
}

.game-clear,
.game-tile:hover,
.game-tile:focus,
.game-tile:active {
  background: #b5daff;
}
.game-tile.border-right {
  border-right: 2px solid #344861;
}
.game-tile.border-bottom {
  border-bottom: 2px solid #344861;
}

.num-pad {
  float: left;
  text-align: center;
}

.btn-num {
  font-size: 1.3em;
  text-align: center;
  border-radius: 0;
  /* background: transparent;
  border:1px solid #344861;
  color:black; */
}
.btn-num-col:active {
  background: #000000 !important;
}
.note-tile {
  font-size: 0.5em;
}

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .tile-num {
    font-size: 7vw;
    padding-top: 5px;
  }
  .num-pad {
    font-size: 9vw;
    padding-top: 14px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .tile-num {
    font-size: 4vw;
    padding-top: 6px;
  }
  .game-pad {
    margin-top: 20px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .tile-num {
    font-size: 4vw;
    padding-top: 2px;
  }
  .game-pad {
    margin-top: 20px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .tile-num {
    font-size: 3vw;
    padding-top: 2px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .tile-num {
    font-size: 1.5vw;
    padding-top: 4px;
  }
}
</style>