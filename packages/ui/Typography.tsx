import React from "react";
import { cn } from "./utils";

type H1Props = React.HTMLAttributes<HTMLHeadingElement>;

const H1 = ({ className, children, ...props }: H1Props) => {
  return (
    <h1
      className={cn(
        "text-[var(--text-h)] font-medium font-[var(--heading)]",
        "text-[3.5rem] -tracking-[1.68px] my-8 mx-0",
        "max-lg:text-4xl max-lg:my-5",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export { H1 };

type H2Props = React.HTMLAttributes<HTMLHeadingElement>;

const H2 = ({ className, children, ...props }: H2Props) => {
  return (
    <h2
      className={cn(
        "text-[var(--text-h)] font-medium font-[var(--heading)]",
        "text-2xl leading-[118%] -tracking-[0.24px] m-0 mb-2",
        "max-lg:text-[1.25rem]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export { H2 };

type H3Props = React.HTMLAttributes<HTMLHeadingElement>;

const H3 = ({ className, children, ...props }: H3Props) => {
  return (
    <h3
      className={cn(
        "text-[var(--text-h)] font-[var(--heading)]",
        "text-[1.17em] mt-4",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export { H3 };

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

const P = ({ className, children, ...props }: ParagraphProps) => {
  return (
    <p className={cn("m-0 font-[var(--sans)]", className)} {...props}>
      {children}
    </p>
  );
};

export { P };