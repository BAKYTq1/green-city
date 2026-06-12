import 'react'
import './Button.scss'

function Button({ text = '', onClick, type = 'button', variant = 'primary' }) {
  return (
    <button 
      className={`gc-button gc-button--${variant}`}
      onClick={onClick}
      type={type}
    >
      <div className="gc-button-bg">
        <span></span>
      </div>
      <span className="gc-button-text">{text}</span>
    </button>
  )
}

export default Button