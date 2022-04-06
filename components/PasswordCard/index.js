import './index.css'
import React from 'react'
const PasswordCard = props => {
  const {details, deleteCard, isClicked} = props
  const {id, name, password, website} = details
  const initial = name ? name[0].toUpperCase() : ''

  const onClickDelete = () => {
    deleteCard(id)
  }

  return (
    <li className="li-style">
      <div className="container">
        <div className="initial-div">
          <p className="initial">{initial}</p>
        </div>

        <div className="details-div">
          <p className="website">{website}</p>
          <p className="website">{name}</p>
          {isClicked ? (
            <p className="website">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        testid="delete"
        onClick={onClickDelete}
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="btn-img"
        />
      </button>
    </li>
  )
}

export default PasswordCard
