import type { Snippet } from "svelte"
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements"
import Root from "./button.svelte"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

const buttonVariants = (variant: ButtonVariant = "default", size: ButtonSize = "default") => {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants: Record<ButtonVariant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-3 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return `${base} ${variants[variant]} ${sizes[size]}`
}

type BaseButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  class?: string
  children?: Snippet
}

type AnchorButtonProps = BaseButtonProps & { href: string } & Omit<HTMLAnchorAttributes, "href">
type NativeButtonProps = BaseButtonProps & { href?: never } & HTMLButtonAttributes

type ButtonProps = AnchorButtonProps | NativeButtonProps

export { Root as Button, buttonVariants, Root, type ButtonProps, type ButtonVariant, type ButtonSize }
