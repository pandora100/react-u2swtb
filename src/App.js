import React,{useReducer,useEffect} from "react";
import "./style.css";
/*
1. Can I set state inside a useEffect hook?

In principle, you can set state freely where you need it - including inside useEffect and even during rendering. Just make sure to avoid infinite loops by settting Hook deps properly and/or state conditionally.

▶ 2. Lets say I have some state that is dependent on some other state. Is it appropriate to create a hook that observes A and sets B inside the useEffect hook?

You just described the classic use case for useReducer:

    useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. (React docs)

    When setting a state variable depends on the current value of another state variable, you might want to try replacing them both with useReducer. [...] When you find yourself writing setSomething(something => ...), it’s a good time to consider using a reducer instead. 
*/
export default function App() {
  let [state, dispatch] = useReducer(reducer, { a: 1, b: 2 });

  useEffect(() => {
    console.log("Some effect with B");
  }, [state.b]);

  return (
    <div>
      <p>A: {state.a}, B: {state.b}</p>
      <button onClick={() => dispatch({ type: "SET_A", payload: 5 })}>
        Set A to 5 and Check B
      </button>
      <button onClick={() => dispatch({ type: "INCREMENT_B" })}>
        Increment B
      </button>
    </div>
  );
};

// B depends on A. If B >= A, then reset B to 1.
function reducer(state, { type, payload }) {
  const someCondition = state.b >= state.a;

  if (type === "SET_A")
    return someCondition ? { a: payload, b: 1 } : { ...state, a: payload };
  else if (type === "INCREMENT_B") return { ...state, b: state.b + 1 };
  return state;
}
