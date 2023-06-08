import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const profileApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileDetails: '', apiStatus: profileApiStatus.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: profileApiStatus.inprogress})

    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const getProfileData = await response.json()

      const updateProfileDetails = {
        name: getProfileData.profile_details.name,
        profileImageUrl: getProfileData.profile_details.profile_image_url,
        shortBio: getProfileData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updateProfileDetails,
        apiStatus: profileApiStatus.success,
      })
    } else {
      this.setState({apiStatus: profileApiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-details-view">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-heading">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="profile-loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case profileApiStatus.success:
        return this.renderSuccessView()

      case profileApiStatus.failure:
        return this.renderFailureView()

      case profileApiStatus.inprogress:
        return this.renderLoaderView()

      default:
        return null
    }
  }
}

export default Profile
