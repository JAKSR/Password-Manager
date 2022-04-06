import React from 'react'
import {Component} from 'react'
import {v4} from 'uuid'

import PasswordCard from '../PasswordCard'
import './index.css'

class NoPassword extends Component {
  state = {
    webInput: '',
    nameInput: '',
    passInput: '',
    searchInput: '',
    passwordList: [],
    showPass: false,
  }

  onDeleteCard = eachId => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(eachItem => eachItem.id !== eachId),
    })
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({
      showPass: !prevState.showPass,
    }))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {webInput, nameInput, passInput} = this.state

    const newPassList = {
      id: v4(),
      name: nameInput,
      website: webInput,
      password: passInput,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassList],
      webInput: '',
      nameInput: '',
      passInput: '',
    }))
  }

  onChangeWeb = event => {
    this.setState({webInput: event.target.value})
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangePass = event => {
    this.setState({passInput: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderNoPassCardView = () => (
    <>
      <div className="noPass-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="noPass-img"
        />
        <p className="form-hd">No Passwords</p>
      </div>
    </>
  )

  iterateOverPasswordList = () => {
    const {passwordList, showPass} = this.state

    return (
      <ul className="ul-div">
        {passwordList.map(eachCard => (
          <PasswordCard
            key={eachCard.id}
            details={eachCard}
            deleteCard={this.onDeleteCard}
            isClicked={showPass}
          />
        ))}
      </ul>
    )
  }

  iterateOverFilteredList = () => {
    const {passwordList, searchInput, showPass} = this.state
    const filteredList = passwordList.filter(eachList =>
      eachList.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="ul-div">
        {filteredList.map(eachCard => (
          <PasswordCard
            key={eachCard.id}
            details={eachCard}
            deleteCard={this.onDeleteCard}
            isClicked={showPass}
          />
        ))}
      </ul>
    )
  }

  renderPasswordCardView = () => {
    const {searchInput} = this.state
    const isSearchInputEmpty = searchInput === ''

    return (
      <>
        {isSearchInputEmpty
          ? this.iterateOverPasswordList()
          : this.iterateOverFilteredList()}
      </>
    )
  }

  render() {
    const {
      passwordList,
      webInput,
      nameInput,
      passInput,
      searchInput,
    } = this.state
    const noPassCardView = passwordList.length === 0

    const filteredList = passwordList.filter(eachList =>
      eachList.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const noOfFilteredCards = filteredList.length
    const noOfPassListCards = passwordList.length
    const isSearchInputEmpty = searchInput === ''

    return (
      <div className="app-div">
        <div className="card-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />

          <div className="card1-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pass-img-sm"
            />
            <form className="form-div" onSubmit={this.onSubmitForm}>
              <h1 className="form-hd">Add New Password</h1>
              <div className="input-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={webInput}
                  onChange={this.onChangeWeb}
                />
              </div>

              <div className="input-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={nameInput}
                  onChange={this.onChangeName}
                />
              </div>

              <div className="input-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={passInput}
                  onChange={this.onChangePass}
                />
              </div>
              <div className="btn-div">
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="pass-img-lg"
            />
          </div>
          <div className="card2-div">
            <div className="nav-div">
              <div className="hd-div">
                <h1 className="form-hd ur-pass">Your Passwords</h1>
                <p className="count">
                  {isSearchInputEmpty ? noOfPassListCards : noOfFilteredCards}
                </p>
              </div>
              <div className="input-div search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img input-img"
                />
                <input
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                  className="input"
                />
              </div>
            </div>
            <hr />
            <div className="show-pass-div">
              <input
                type="checkbox"
                id="check"
                onChange={this.onClickCheckBox}
                className="check-box"
              />
              <label htmlFor="check" className="label">
                Show passwords
              </label>
            </div>
            <hr />
            {noPassCardView
              ? this.renderNoPassCardView()
              : this.renderPasswordCardView()}
          </div>
        </div>
      </div>
    )
  }
}

export default NoPassword
