# Fruit Search

A simple React app to search fruits and highlight matching text.

## Run locally

```sh
npm install
npm run dev
```

1. What is the difference between an event and an effect?
   An event is triggered by a user action, an effect is triggered by its dependant states changing or on first render.

2. When should you use useEffect?
   An effect is for functions and logic not directly related to react, but still need to interact with react's state.

3. When should you avoid it?
   when the logic can be handled during rendering or by and event handler.

4. What does the dependency array do?
   its the state that on its change triggers the effect.

5. Why is cleanup important?
   to prevent infinite loops and mmany effect going at the same time slowing the app down.
