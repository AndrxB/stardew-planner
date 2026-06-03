import React from "react";
import { cn } from "./utils";

type size = "default" | "xs";
type variant = "default" | "link" | "reverse" | "outline" | "zoom";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	variant?: variant;
	size?: size;
	disabled?: boolean;
	label?: string;
};

const Button = ({
	className,
	variant = "default",
	size = "xs",
	children,
	disabled,
	label,
	...props
}: ButtonProps) => {
	const sizeClasses = size === "xs" ? "p-2 px-4" : "p-4 px-6";

	if (variant === "link") {
		return (
			<button
				className={cn(
					"w-fit underline underline-offset-4 font-semibold text-accent hover:text-primary bg-transparent transition-colors duration-200 cursor-pointer",
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
	
	if (variant === "outline") {
		return (
			<button
				className={cn(
					"w-fit rounded-xl border-2 h-12 bg-slate-700",
					sizeClasses,
					className,
					!disabled &&
					"hover:bg-slate-700/75 hover:shadow-md transition-all duration-300 cursor-pointer",
					disabled &&
					"bg-slate-700/75"
				)}
				disabled={disabled}
				{...props}
			>
				{children}
			</button>
		);
	}

	if(variant === "zoom") {
		return (
			<button
				className={cn(
					"bg-primary text-white rounded-xl font-medium ",
					sizeClasses,
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
	// Default button variant
	return (
		<button
			className={cn(
				"bg-primary text-white rounded-xl font-medium hover:bg-primary/85 hover:shadow-md transition-all duration-300 cursor-pointer",
				sizeClasses,
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;