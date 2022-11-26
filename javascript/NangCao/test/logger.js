export default function logger(reducer) {
    return (prevState, action, agrs) => {
        const nextState = reducer(prevState, action, agrs)

        return nextState
    }
}