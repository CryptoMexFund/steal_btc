import {WhiteContainer} from "./Containers";

function Section({title, children}){
    return (
      <WhiteContainer>
        <div className="flex flex-col w-full">
          <h2>{title}</h2>
          <div className="flex flex-col space-y-4">
            {children}
          </div>
        </div>
      </WhiteContainer>
    )
}

export default Section;