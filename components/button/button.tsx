import classNames from "classnames";
import { useState } from "react";

const Button = ({ children, ripple, ...props }) => {
  const [hover, setHover] = useState(false);

  const buttonClassName = classNames(
    ripple && "relative z-0 h-[90px] overflow-hidden border-none bg-sswRed text-[1.6rem] text-white",
    props["className"]
  );

  return (
    <button type="button" {...props} className={buttonClassName} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {ripple && <div className={
          classNames(
              "absolute top-1/2 left-1/2 -z-[1] before:relative before:mt-[100%] before:block before:content-[''] after:absolute after:inset-0 after:rounded-[50%] after:content-[''] -translate-x-1/2 -translate-y-1/2", 
              hover && "animate-ripple after:animate-ripple-pseudo"
          )
      } />}
    </button>
  );
};

export default Button;
