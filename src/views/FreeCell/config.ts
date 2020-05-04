
export const config: FreeCellSetting = {
  initCardsGroupCount: [7, 7, 7, 7, 6, 6, 6, 6],
  undoabledStepsCount: 3,
  cardTypes: ['S', 'H', 'D', 'C'],
  cardMaxNum: 13,
};

const homeCards = config.cardTypes.map((type) => ({ type, cards: [] }));

export const defaultSetting: CardDefaultSetting = {
  freeCards: ['', '', '', ''], // left-top area
  homeCards, // right-top area,
};

export const popupSetting: PopupConfig = {
  init: {
    mood: 'sad',
    title: 'START A NEW GAME',
    content: 'Are you sure you want to give up?',
    buttons: [{ text: 'NEW GAME', action: 'init' }],
  },
  restart: {
    mood: 'sad',
    title: 'RESTART A NEW GAME',
    content: 'Are you sure you want to restart this game?',
    buttons: [{ text: 'RESTART', action: 'restart' }],
  },
  rule: {
    mood: 'happy',
    title: 'FREECELL RULE',
    content: '',
    buttons: [],
  },
  complete: {
    mood: 'joy',
    title: 'CONTRATULATIONS!',
    content: 'You win the game!',
    buttons: [{ text: 'PLAY AGAIN', action: 'restart' }, { text: 'NEW GAME', action: 'init' }],
  },
  stuck: {
    mood: 'sad',
    title: 'NO MORE MOVE',
    content: 'There are no moves available.',
    buttons: [
      { text: 'RESTART', action: 'restart' },
      { text: 'NEW GAME', action: 'init' },
      { text: 'UNDO', action: 'undo' },
    ],
  },
};


// ===============================================

interface TypeCardGroup {
  type: string,
  cards: string[]; // e.g. ['S-1', 'S-2']
}

interface Buttons {
  text: string,
  action: string,
}

interface FreeCellSetting {
  initCardsGroupCount: number[],
  undoabledStepsCount: number,
  cardTypes: string[],
  cardMaxNum: number,
}

interface CardDefaultSetting {
  homeCards: TypeCardGroup[],
  freeCards: string[],
}

interface PopupContent {
  mood: string,
  title: string,
  content: string,
  buttons: Buttons[] | [],
}

interface PopupConfig {
  init: PopupContent,
  restart: PopupContent,
  rule: PopupContent,
  complete: PopupContent,
  stuck: PopupContent,
}
