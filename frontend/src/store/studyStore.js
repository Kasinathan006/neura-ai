import { create } from 'zustand'

const useStudyStore = create((set) => ({
    flashcards: [],
    currentDeck: null,
    currentCard: 0,
    isFlipped: false,
    studyMode: 'review',
    sessionStats: {
        cardsStudied: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
    },

    setFlashcards: (flashcards) => set({ flashcards, currentCard: 0 }),

    setCurrentDeck: (deck) => set({ currentDeck }),

    nextCard: () =>
        set((state) => ({
            currentCard: Math.min(state.currentCard + 1, state.flashcards.length - 1),
            isFlipped: false,
        })),

    previousCard: () =>
        set((state) => ({
            currentCard: Math.max(state.currentCard - 1, 0),
            isFlipped: false,
        })),

    flipCard: () => set((state) => ({ isFlipped: !state.isFlipped })),

    setStudyMode: (mode) => set({ studyMode: mode }),

    updateStats: (correct) =>
        set((state) => ({
            sessionStats: {
                cardsStudied: state.sessionStats.cardsStudied + 1,
                correctAnswers: correct
                    ? state.sessionStats.correctAnswers + 1
                    : state.sessionStats.correctAnswers,
                incorrectAnswers: !correct
                    ? state.sessionStats.incorrectAnswers + 1
                    : state.sessionStats.incorrectAnswers,
            },
        })),

    resetSession: () =>
        set({
            currentCard: 0,
            isFlipped: false,
            sessionStats: {
                cardsStudied: 0,
                correctAnswers: 0,
                incorrectAnswers: 0,
            },
        }),
}))

export default useStudyStore
