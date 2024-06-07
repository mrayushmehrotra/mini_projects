import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { scroll } from "framer-motion";

function App() {
  const [count, setCount] = useState(0);
  scroll((progress) => console.log(progress), {
    source: document.getElementById("carousel"),
  });

  return (
    <>
      <div id="carousel">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more lorem21 sadmsadjasl
        dadcslakdlcksam dlcksajlksc ajldksca mdlksa jcdilsa jldcksadl csakjd
        lcsajc ioaj dlkawd iwajd lcksa diawjiwjdlaewjicfejfiekldac mdlsa c lksa
        dmc aio jewalkd jwiaojdciwadlkaewjciae jica jacdjlwakdijcadw jic Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Aperiam dolores,
        molestiae ullam reprehenderit quidem, tempora sed laborum explicabo
        adipisci culpa officia harum maiores. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Iusto expedita corrupti praesentium
        dignissimos molestias? Aliquam voluptates voluptate, mollitia ullam
        similique, sunt molestiae unde aut modi officia iure repellendus, nisi
        cum accusantium sequi aperiam. Magni reprehenderit non architecto omnis
        ipsam, dolor earum, consectetur fuga praesentium vel porro sed optio
        recusandae facere corporis rerum illum modi velit! Voluptates
        accusantium fuga rerum eveniet amet, atque voluptatibus facere ea
        accusamus adipisci, labore ipsum ab inventore aut excepturi esse minima
        ex ut! Cum ratione odio explicabo adipisci quis impedit, ex totam saepe
        assumenda molestias vitae minima beatae eveniet atque consectetur qui
        reiciendis id labore itaque! Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Libero maxime sunt animi consequuntur fugit deserunt
        optio amet! Animi veniam molestias ipsam dolores culpa, asperiores modi.
        Pariatur inventore, placeat, quidem unde modi repellat asperiores quia
        maiores doloribus perferendis ipsam vel voluptates ducimus ipsa possimus
        sed consectetur explicabo. Temporibus distinctio laudantium nihil
        exercitationem consequuntur iste atque, possimus inventore, alias
        perspiciatis ad. Dolorem aperiam illo porro voluptate et iure
        dignissimos enim ipsum ipsa tempore? Praesentium perferendis explicabo,
        labore rem ea laudantium amet sunt ipsum molestiae natus. Aspernatur
        tempore commodi, eligendi ullam quasi nihil natus aliquid esse culpa,
        saepe officiis minus impedit. Accusamus, beatae expedita. Veritatis a
        dolores illum esse voluptates minus, voluptatibus corrupti ab at enim,
        impedit, laborum exercitationem hic deleniti cupiditate! Natus,
        recusandae? Placeat dolore fuga cumque sed quibusdam assumenda
        accusantium, fugiat similique pariatur magni quaerat rem, repudiandae
        totam dolor aliquam qui quasi eaque beatae ea. Reprehenderit dicta
        praesentium id aut deserunt, voluptatibus repellat iste, blanditiis
        delectus autem ut nulla? Tempore molestiae repellat nesciunt aspernatur
        debitis porro. Ab nemo qui fugiat temporibus vitae quasi magni, commodi
        magnam dolore illum sed praesentium vel in beatae tempora accusamus.
        Esse maiores temporibus quae eum iure incidunt reprehenderit quis dolore
        laboriosam necessitatibus dolorem eaque, neque excepturi vitae eligendi
        similique sit voluptas porro ea debitis eos officiis! Quo et odio sed
        vitae inventore eos quod quis vel, incidunt corporis sapiente, enim
        ullam deleniti obcaecati soluta architecto, rerum eum! Iste unde
        aliquam, quia repellat rem fuga voluptatibus quas. Ipsum dolorem
        veritatis fugit, recusandae voluptate vitae possimus. Sapiente obcaecati
        itaque porro hic praesentium excepturi fuga maiores vitae rem dolores
        illum voluptates eos cupiditate facilis suscipit architecto, temporibus
        repellat vero laboriosam delectus! Ratione veniam maxime sequi
        reiciendis ullam odit doloremque dolore consectetur in velit ducimus,
        tempora natus rem reprehenderit ipsum nam. Consequuntur molestiae sunt
        aliquid veniam voluptate possimus magni earum facilis, officiis quasi
        quo voluptas magnam iste pariatur repellat quibusdam. Alias libero
        pariatur, modi architecto cumque quam maxime asperiores harum saepe
        repellat delectus eveniet, earum explicabo totam temporibus
        reprehenderit iure tempora! Tempore corporis nam, ullam nostrum iure
        deserunt tempora doloremque! Vitae ab iste itaque unde? Magni, quas!
        Dolore pariatur soluta perspiciatis id non possimus odio dolorum totam!
        Delectus impedit pariatur saepe corrupti voluptates eius aut fugiat?
        Quas repellendus tenetur est ipsam ab. Neque mollitia velit maxime.
        Eaque rerum ex suscipit obcaecati veniam? Veritatis blanditiis
        laudantium, magnam illum reiciendis sed rem, unde numquam repellendus
        ratione veniam dolorem aliquid similique architecto? Culpa cupiditate
        iste optio inventore, sint totam consequatur numquam eaque excepturi
        eligendi nemo vero veritatis quidem ex eum, quia vel. Voluptate dolor
        sit nemo earum excepturi repellendus! Atque quaerat optio corrupti,
        neque mollitia in doloribus rem repudiandae! Nobis ex ad adipisci
        debitis sed fuga voluptatum voluptate consequatur dolores quasi earum
        ipsum eos corrupti obcaecati exercitationem veritatis, ipsa quas vitae
        nam. Accusantium vel molestiae eaque recusandae. Deserunt repellendus
        eos possimus ullam minus blanditiis modi repellat enim tempora
        reiciendis, magnam, dolorum accusantium voluptates ex architecto itaque
        molestias voluptatum vero temporibus totam natus et distinctio odio!
        Quia numquam amet eius id obcaecati illo voluptate!
      </p>
    </>
  );
}

export default App;
