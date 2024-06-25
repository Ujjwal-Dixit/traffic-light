import { useEffect, useState } from "react";

function TrafficLights() {
  const [currentLight, setCurrentLight] = useState('red');

  useEffect(() => {
    const intervals = { red: 4000, yellow: 500, green: 3000 };
    const timer = setTimeout(() => {
      if (currentLight === 'green') {
        setCurrentLight('yellow')
      } else if (currentLight === 'yellow') {
        setCurrentLight('red')
      } else if (currentLight === 'red') {
        setCurrentLight('green')
      }
    }, intervals[currentLight])

    return () => clearTimeout(timer)
  }, [currentLight])

  return (
    <div className="traffic-signal">
      <div className={`light ${currentLight === "green" ? 'green' : ''}`}></div>
      <div className={`light ${currentLight === "yellow" ? 'yellow' : ''}`}></div>
      <div className={`light ${currentLight === "red" ? 'red' : ''}`}></div>
    </div>
  )
}

export default TrafficLights;



/*
? setTimeout: Executes a function once after a specified delay.
? setInterval: Executes a function repeatedly at specified intervals.


* setTimeout only executes the function once, but because the useEffect hook is dependent on the currentLight state, it will run again every time currentLight changes. This creates a loop, as changing the light state causes the useEffect to set a new timer, which then changes the light state again, and so on.

Here’s a step-by-step breakdown of how it runs indefinitely:

! Initial Render:

? The component mounts, and useEffect sets a timer based on the initial state ('green').         

* Timer Expiration:

? After 3000ms (the interval for green light), the timer expires, and the callback function runs. The callback function changes the light to 'yellow' by calling setCurrentLight('yellow').       

* State Change:

? Changing the state to 'yellow' triggers the useEffect hook again because the dependency array [currentLight] includes currentLight.

* New Timer:

? useEffect sets a new timer based on the current state ('yellow'), which is now 500ms.

* Next Timer Expiration:

? After 500ms, the timer expires, the callback function runs, and the light changes to 'red'.

* Repeat:

? This process repeats indefinitely, with each state change triggering a new timer and a subsequent state change.
*/