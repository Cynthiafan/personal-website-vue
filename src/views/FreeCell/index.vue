<template lang="pug">
  div.free-cell(@mouseup="dragEnd")
    div.free-cell__top

      div.free-cell__top__free-area
        div.free-area.free(v-for="(card, i) in freeCards" :key="i" :id="`free-${i}`" data-area="free")
          img.free(
            v-if="card"
            :src="cards[card]"
            :id="card"
            draggable="false"
            @mousedown="dragStart"
            @dblclick="autoGetHome")

      div.free-cell__top__logo
        img.image(src="@/assets/images/free-cell/king_happy.png")
        div.text FREECELL

      div.free-cell__top__home-area
        div.home-area.home(
          v-for="group in homeCards"
          :key="group.type"
          :class="group.type"
          :id="`${group.type}-0`"
          data-area="home")
          img.home(
            v-for="(card,i) in group.cards"
            :key="card"
            :id="card"
            :src="cards[card]"
            :style="`z-index: ${i + 1}`"
            draggable="false"
            @mousedown="dragStart")

    div.free-cell__bottom
      div.free-cell__bottom__column(
        v-for="(group, i) in newCards" 
        :key="`group-${i + 1}`"
        :id="`column-${i}`"
        data-area="cards")
        div.empty(v-if="!group.length" data-area="cards")
        img.card(
          v-for="(card, j) in group"
          draggable="false"
          :id="card"
          :key="card"
          :src="cards[card]"
          :class="group.length > 12 ? `narrow-card-${j}` : `card-${j}`"
          @mousedown="dragStart"
          @dblclick="autoGetHome")

    footer-nav(
      ref="footer"
      @action="fireAction"
      :btnDisabled="btnDisabled"
      :isStartTimer="isMoved")
    transition(name="fade")
      Popup(
        v-show="isShowPopup" 
        :config="popupConfig" 
        @close="isShowPopup = false"
        @init="initGame"
        @restart="resetCards")
</template>
<script>
import FooterNav from './footer';
import Popup from './popup';
import { cards } from './image-binary';
import { flow, cloneDeep } from 'lodash/fp';
import { shuffle, groupByCount } from '@/utils/array.utils';
import { localStorageFn } from '@/utils/browser.utils';
import { config, defaultSetting, popupSetting } from './config';

export default {
  components: {
    FooterNav,
    Popup,
  },
  data() {
    return {
      cards,
      originalCards: [],
      newCards: [],
      freeCards: cloneDeep(defaultSetting.freeCards), // left-top cards
      homeCards: cloneDeep(defaultSetting.homeCards),
      popupConfig: undefined,
      isShowPopup: false,
      clickOffset: {
        x: 0,
        y: 0,
      },
      draggingCards: [],
      isCardsMovable: false,
      movement: [],
      isMoved: false,
      fcLocalStorageFn: localStorageFn('fc'),
    };
  },
  computed: {
    allCards() {
      const { cardTypes, cardMaxNum } = config;

      const allCards = [];

      cardTypes.forEach((type) => {
        for (let i = 1; i <= cardMaxNum; i++) {
          allCards.push(`${type}-${i}`);
        }
      });

      return allCards;
    },
    btnDisabled() {
      const restart = !this.isMoved;
      const undo = !this.movement.length;

      return { restart, undo };
    },
    hintCardToSort() {
      const target = this.newCards.map((column) => column[column.length - 1]);

      /* TODO:
        1. CARD to SORT
        2. CARD to CARD
        3. CARD to TEMP
        4. TEMP to SORT
        5. TEMP to CARD
      */

      return target;
    },
  },
  created() {
    if (this.fcLocalStorageFn.getItem()) {
      this.restoreGame();
    } else {
      this.initGame();
      this.showRules();
    }
  },
  updated() {
    this.checkIsWin();
    this.saveGame();
  },
  methods: {
    showRules() {
      this.setPopupStatus(popupSetting.rule);
    },
    changeCardPlace(movingCard, targetPlace, isUndo = false) {
      if (!isUndo && !this.checkIsMovementValid(movingCard, targetPlace)) {
        return;
      }

      const isTargetACard = targetPlace.tagName === 'IMG';
      const targetArea = isTargetACard ? targetPlace.parentElement.dataset.area : targetPlace.dataset.area;

      const originalArea = movingCard[0].parentNode.dataset.area;
      const movingCardIds = Array.apply(null, movingCard).map((card) => card.id);

      const movement = {
        cards: movingCardIds,
        from: { place: originalArea, index: 0 },
      };

      const action = {
        home: {
          moveTo: () => {
            const targetType = targetPlace.id.split('-')[0];
            const targetGroupIndex = this.homeCards.findIndex((group) => group.type === targetType);
            this.homeCards[targetGroupIndex].cards.push(movingCard[0].id);

            if (!isUndo) {
              this.$refs.footer.addScore(config.validMovementScore);
            }
          },
          moveFrom: () => {
            const movingType = movingCard[0].id.split('-')[0];
            const movingGroupIndex = this.homeCards.findIndex((group) => group.type === movingType);

            this.homeCards[movingGroupIndex].cards.pop();
            movement.from.index = movingGroupIndex;
          },
        },
        free: {
          moveTo: () => {
            const freeAreaIndex = Number(targetPlace.id.split('-')[1]);
            this.$set(this.freeCards, freeAreaIndex, movingCard[0].id);
          },
          moveFrom: () => {
            const freeAreaIndex = Number(movingCard[0].parentElement.id.split('-')[1]);
            this.$set(this.freeCards, freeAreaIndex, '');

            movement.from.index = freeAreaIndex;
          },
        },
        cards: {
          moveTo: () => {
            const targetIndex = Number(targetPlace.parentElement.id.split('-')[1]);

            this.$set(this.newCards, targetIndex, [...this.newCards[targetIndex], ...movingCardIds]);
          },
          moveFrom: () => {
            const columnIndex = Number(movingCard[0].parentElement.id.split('-')[1]);
            const startIndex = this.newCards[columnIndex].findIndex((card) => card === movingCard[0].id);
            this.newCards[columnIndex].splice(startIndex);

            movement.from.index = columnIndex;
          },
        },
      };

      action[targetArea].moveTo();
      action[originalArea].moveFrom();

      if (!isUndo) {
        this.saveMovement(movement);
        this.isMoved = true;
      }
    },
    saveGame() {
      const all = {
        free: this.freeCards,
        home: this.homeCards,
        card: this.newCards,
        movement: this.movement,
        oriCard: cloneDeep(this.originalCards),
      };
      this.fcLocalStorageFn.setItem(all);
    },
    saveMovement(m) {
      this.movement.push(m);
      if (this.movement.length > config.undoabledStepsCount) {
        this.movement.shift();
      }
    },
    undoMovement() {
      if (!this.movement.length) {
        return;
      }

      const movement = this.movement.pop();
      const { cards: movedCards, from } = movement;
      const movingCard = movedCards.map((card) => {
        return document.getElementById(card);
      });
      let targetPlace;

      switch (from.place) {
        case 'free': {
          targetPlace = document.getElementById(`free-${from.index}`);
          break;
        }
        case 'sort': {
          const type = movedCards[0].split('-')[0];
          targetPlace = document.getElementById(`${type}-${from.index}`);
          break;
        }
        case 'cards': {
          targetPlace =
            document.getElementById(`column-${from.index}`).lastChild ||
            document.getElementById(`column-${from.index}`);
          break;
        }
        case 'home': {
          const type = movedCards[0].split('-')[0];
          targetPlace =
            document.getElementById(`${type}-${from.index}`).lastChild ||
            document.getElementById(`${type}-${from.index}`);
        }
      }

      this.changeCardPlace(movingCard, targetPlace, true);
      this.$refs.footer.minusScore(100);
    },
    removeAllHintBox() {
      const boxes = document.getElementsByClassName('hint-box');

      while (boxes.length > 0) {
        boxes[0].parentNode.removeChild(boxes[0]);
      }
    },
    giveHint() {
      const column = Array.apply(null, document.getElementById('column-0').childNodes);
      const cardGroup = column.splice(4);

      const { left, top } = cardGroup[0].getBoundingClientRect();
      const { bottom } = cardGroup[cardGroup.length - 1].getBoundingClientRect();
      const height = bottom - top;
      const hintBox = document.createElement('div');

      hintBox.classList.add('hint-box');
      hintBox.style.left = `${left}px`;
      hintBox.style.top = `${top}px`;
      hintBox.style.height = `${height}px`;
      hintBox.style.opacity = '1';

      document.getElementById('app').appendChild(hintBox);

      setTimeout(() => {
        this.removeAllHintBox();
      }, 2000);
    },
    dragEnd(e) {
      if (!this.draggingCards.length || !this.isCardsMovable) {
        return;
      }

      this.removeListenMousemove();
      this.changeCardPlace(this.draggingCards, e.target);

      this.draggingCards = [];
    },
    getMousePosition(e) {
      if (!this.isCardsMovable) {
        return;
      }

      const x = e.clientX - this.clickOffset.x;
      const y = e.clientY - this.clickOffset.y;

      this.draggingCards.forEach((card, i) => {
        card.classList.add('dragging');
        card.style.left = `${x}px`;
        card.style.top = `${i > 0 ? y + 25 * i : y}px`;
      });
    },
    removeListenMousemove() {
      document.removeEventListener('mousemove', this.getMousePosition);
      this.draggingCards.forEach((card) => {
        card.classList.remove('dragging');
      });
    },
    // act when double clicking the cards
    autoGetHome(e) {
      const movingCard = e.target.id;
      const [type, num] = movingCard.split('-');

      const sameTypeGroup = this.homeCards.find((group) => group.type === type);
      const lastCard = sameTypeGroup.cards[sameTypeGroup.cards.length - 1] || `${type}-0`;
      const targetNum = lastCard.split('-')[1];
      const freeEmptyIndex = this.freeCards.findIndex((card) => !card);
      let targetEl;

      if (Number(targetNum) === Number(num) - 1) {
        targetEl = document.getElementById(lastCard);
      } else if (freeEmptyIndex >= 0) {
        targetEl = document.getElementById(`free-${freeEmptyIndex}`);
      }

      if (!targetEl) {
        return;
      }

      this.changeCardPlace([e.target], targetEl);
    },
    dragStart(e) {
      const targetSiblings = Array.apply(null, e.target.parentElement.childNodes);
      const targetIndex = targetSiblings.findIndex((el) => el === e.target);

      if (targetIndex !== targetSiblings.length - 1) {
        this.draggingCards = targetSiblings.slice(targetIndex);
      } else {
        this.draggingCards = [e.target];
      }

      this.checkIsDraggable();

      if (!this.isCardsMovable) {
        return;
      }

      document.addEventListener('mousemove', this.getMousePosition);

      const { left, top } = e.target.getBoundingClientRect();

      this.clickOffset.x = e.clientX - left;
      this.clickOffset.y = e.clientY - top;
    },
    checkIsWin() {
      const isWin = this.homeCards.every((type) => type.cards.length === 13);

      if (isWin) {
        this.$refs.footer.pauseTimer();
        this.setPopupStatus(popupSetting.complete);
      }
    },
    checkIsDraggable() {
      let hasWrong = false;

      this.draggingCards.forEach((card, i) => {
        const [type, num] = card.id.split('-');

        if (i !== this.draggingCards.length - 1) {
          const [nextType, nextNum] = this.draggingCards[i + 1].id.split('-');

          const isContinuousNumber = Number(nextNum) !== Number(num) - 1;
          const isSameColor = config.redTypes.includes(type) === config.redTypes.includes(nextType);

          if (isContinuousNumber || isSameColor) {
            hasWrong = true;
            return;
          }
        }
      });

      this.isCardsMovable = hasWrong ? false : true;
    },
    fireAction(type) {
      const actions = {
        init: () => {
          this.setPopupStatus(popupSetting[type]);
        },
        restart: () => {
          this.setPopupStatus(popupSetting[type]);
        },
        hint: this.giveHint,
        undo: this.undoMovement,
      };

      actions[type]();
    },
    initGame() {
      const groupCardsFn = groupByCount(config.initCardsGroupCount);
      const initialedCards = flow(shuffle, groupCardsFn)([...this.allCards]);

      this.newCards = initialedCards;
      this.originalCards = cloneDeep(initialedCards);

      this.initFreeAndHomeCards();
    },
    resetCards() {
      const copy = cloneDeep(this.originalCards);
      copy.forEach((column, i) => {
        this.$set(this.newCards, i, column);
      });

      this.initFreeAndHomeCards();
    },
    initFreeAndHomeCards() {
      const { freeCards, homeCards } = defaultSetting;

      this.freeCards = cloneDeep(freeCards);
      this.homeCards = cloneDeep(homeCards);
      this.isMoved = false;
      this.isShowPopup = false;
      this.movement = [];
    },
    restoreGame() {
      const { free, home, card, movement, oriCard } = this.fcLocalStorageFn.getItem();

      this.freeCards = [...free];
      this.homeCards = [...home];
      this.movement = [...movement];
      this.originalCards = JSON.parse(JSON.stringify(oriCard));
      this.isMoved = true;

      card.forEach((column, i) => {
        this.$set(this.newCards, i, column);
      });

      this.$nextTick(() => this.checkIsWin());
    },
    setPopupStatus(setting, isShow = true) {
      this.popupConfig = setting;
      this.isShowPopup = isShow;
    },
    checkIsMovementValid(movingCards, target) {
      const isTargetACard = target.tagName === 'IMG';
      const isOneCardOnly = movingCards.length === 1;
      const targetArea = isTargetACard ? target.parentElement.dataset.area : target.dataset.area;
      const isFromSameArea = movingCards[0].parentElement.dataset.area === targetArea;
      const [movingType, movingNumber] = movingCards[0].id.split('-');

      const validate = {
        home: () => {
          const [targetType, targetNumber] = target.id.split('-');

          const isSameType = targetType === movingType;
          const isValidNumber = Number(targetNumber) === Number(movingNumber) - 1;

          return isOneCardOnly && isSameType && isValidNumber && !isFromSameArea;
        },
        free: () => {
          const isFromSamePosition =
            isFromSameArea && this.freeCards[Number(target.id.split('-')[1])] === movingCards[0].id;

          return !isTargetACard && isOneCardOnly && !isFromSamePosition;
        },
        cards: () => {
          /* moving to bottom area has 3 situations:
           * a. move to card
           * b. move to column which has cards
           * c. move to empty column
           */
          const isEmptyColumn = target.classList.contains('empty');

          const targetColumnIndex =
            isTargetACard || isEmptyColumn
              ? Number(target.parentElement.id.split('-')[1])
              : Number(target.id.split('-')[1]);

          const targetColumn = this.newCards[targetColumnIndex];
          const lastCardInTargetColumn = targetColumn.length ? targetColumn[targetColumn.length - 1] : '';
          const isFromSameColumn = movingCards[0].parentElement === target.parentElement;

          let isValidType;
          let isValidNumber;

          if (lastCardInTargetColumn) {
            const [targetType, targetNumber] = lastCardInTargetColumn.split('-');
            isValidType = config.redTypes.includes(targetType) !== config.redTypes.includes(movingType);
            isValidNumber = Number(targetNumber) === Number(movingNumber) + 1;
          }

          return lastCardInTargetColumn ? isValidType && isValidNumber && !isFromSameColumn : !isFromSameColumn;
        },
      };

      const validArea = Object.keys(validate);

      return validArea.includes(targetArea) ? validate[targetArea]() : false;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  -webkit-user-select: none;
}

/deep/ button {
  background: $fc-black;
  color: #fff;
  padding: 12px 30px;
  border-radius: 50px;
  transition: 0.2s;
  font-weight: bold;
  letter-spacing: 1px;
  border: none;
  &:hover {
    background: $fc-yellow;
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
}

.free-cell {
  font-family: 'Lato';
  background: $fc-gray;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  font-size: 12px;
  padding: 50px 0;
  position: relative;
  img {
    width: 95px;
    &.dragging {
      position: absolute;
      transform: translate(0, 0) !important;
      z-index: 10;
      pointer-events: none;
    }
  }
  &__top {
    width: 85%;
    max-width: 1000px;
    margin: 0 auto;
    @include flex(space-between, center, row);
    &__free-area {
      @include flex(center, center, row);
      .free-area {
        margin-right: 15px;
        border: 2px solid $fc-lightgray;
        border-radius: 5px;
        width: 95px;
        height: 145px;

        &:last-child {
          margin-right: 0;
        }
        img {
          transform: translate(-2px, -2px);
        }
      }
    }
    &__logo {
      @include flex(center, center, column);
      margin: 0 20px;
      .image {
        width: 60px;
      }
      .text {
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;
        letter-spacing: 2px;
      }
    }
    &__home-area {
      @include flex(center, center, row);
      .home-area {
        box-shadow: 0 0 0 2px rgba($fc-lightgray, 0.6);
        background: rgba($fc-lightgray, 0.6);
        border-radius: 5px;
        margin-right: 15px;
        width: 91px;
        height: 141px;

        $images: 13;

        @for $i from 0 to $images {
          img:nth-child(#{$i + 1}) {
            transform: translate(-2px, -145px * $i + -2px * ($i + 1));
          }
        }

        &:last-child {
          margin-right: 0;
        }

        &.S {
          background-image: url('~@/assets/images/free-cell/S.png');
        }
        &.H {
          background-image: url('~@/assets/images/free-cell/H.png');
        }
        &.D {
          background-image: url('~@/assets/images/free-cell/D.png');
        }
        &.C {
          background-image: url('~@/assets/images/free-cell/C.png');
        }

        &.S,
        &.H,
        &.D,
        &.C {
          background-size: 35px;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
  &__bottom {
    width: 80%;
    max-width: 1000px;
    margin: 30px auto 0;
    @include flex(space-between, flex-start, row);
    &__column {
      min-width: 95px;
      .empty {
        min-width: 95px;
        min-height: 200px;
      }
      @include flex(flex-start, center, column);
      @for $i from 0 through 10 {
        .card-#{$i} {
          transform: translateY(-120px * $i);
        }
      }
      @for $j from 0 through 20 {
        .narrow-card-#{$j} {
          transform: translateY(-128px * $j);
        }
      }
    }
  }
}
</style>
