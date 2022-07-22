import {WhiteContainer} from "./Containers";

function Section({title, children}){
    return (
      <WhiteContainer>
        <div className="flex flex-col">
          <h2>{title}</h2>
          {children}
        </div>
      </WhiteContainer>
    )
}

export default Section;