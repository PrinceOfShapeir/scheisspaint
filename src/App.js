import React, {useState} from 'react';
import Canvas from './Canvas';

function App() {

  const [active, setActive] = useState(0);

  if (!active) return (
    <>
      <h1>A Paint Type App</h1>
      <p>This is meant to emulate the functionality of the original PC Paint program, used to create 16 color EGA bitmap art. </p>
      <p>You may view and comment on the source code at <a href="https://princeofshapeir.github.io/scheisspaint/">Github</a>.</p>
      <button onClick={()=>setActive(!active)}>Start Drawing</button>
    </>
  );
  else return (
    <Canvas />
  );
}

export default App;
