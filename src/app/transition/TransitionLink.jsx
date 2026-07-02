import { useTransition } from './TransitionContext'

export default function TransitionLink({ to, children, onClick, ...props }) {
  const { goTo } = useTransition()

  const handleClick = (e) => {
    e.preventDefault()
    onClick?.(e)
    goTo(to)
  }

  return (
    <a href={to} {...props} onClick={handleClick}>
      {children}
    </a>
  )
}