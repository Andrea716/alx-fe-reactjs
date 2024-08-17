function Counter() {
    // Step 1: Initialize state
    const [count, setCount] = useState(0);
  
    return (
      <div>
        {/* Step 2: Display the current count */}
        <p>Current Count: {count}</p>
        {/* Step 3: Create buttons with event handlers */}
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    );
  }
  
  export default Counter;
