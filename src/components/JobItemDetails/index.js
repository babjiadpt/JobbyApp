import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {GoLocation} from 'react-icons/go'

import Header from '../Header'
import './index.css'

const jobDetailApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailList: {},
    skillsList: [],
    lifeAtCompanyList: [],
    similarJobsList: [],
    apiStatus: jobDetailApiStatus.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: jobDetailApiStatus.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedJobItemData = {
        location: fetchedData.job_details.location,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
      }

      const lifeAtCompany = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }

      const skillsData = fetchedData.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const similarJobsData = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetailList: updatedJobItemData,
        skillsList: skillsData,
        lifeAtCompanyList: lifeAtCompany,
        similarJobsList: similarJobsData,
        apiStatus: jobDetailApiStatus.success,
      })
    } else {
      this.setState({apiStatus: jobDetailApiStatus.failure})
    }
  }

  renderSkillsList = () => {
    const {skillsList} = this.state

    return (
      <>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-list-container">
          {skillsList.map(eachSkill => (
            <li className="skills-list-item-container" key={eachSkill.name}>
              <img
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
                className="skill-image"
              />
              <p className="skills-item-title">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderSimilarJobsList = () => {
    const {similarJobsList} = this.state

    return (
      <>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-item-container">
          {similarJobsList.map(eachJob => (
            <li className="similar-jobs-item-container" key={eachJob.id}>
              <div className="similar-jobs-company-role-container">
                <img
                  src={eachJob.companyLogoUrl}
                  alt="similar job company logo"
                  className="similar-jobs-company-logo"
                />
                <div className="similar-jobs-title-rating-container">
                  <h1 className="similar-title-heading">{eachJob.title}</h1>
                  <div className="similar-jobs-rating-container">
                    <AiFillStar className="similar-jobs-rating-image" />
                    <p className="similar-jobs-rating">{eachJob.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="similar-jobs-description-title">Description</h1>
              <p className="similar-jobs-description">
                {eachJob.jobDescription}
              </p>
              <div className="similar-jobs-location-jobtype-container">
                <div className="similar-jobs-location-container">
                  <GoLocation className="similar-jobs-location-icon" />
                  <p className="similar-jobs-location">{eachJob.location}</p>
                </div>
                <div className="similar-jobs-jobtype-container">
                  <BsFillBriefcaseFill className="similar-jobs-briefcase-icon" />
                  <p className="similar-jobs-employment-type">
                    {eachJob.employmentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderJobItemDetailsView = () => {
    const {jobDetailList, lifeAtCompanyList} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      title,
      rating,
    } = jobDetailList

    const {description, imageUrl} = lifeAtCompanyList

    return (
      <div className="job-item-details">
        <div className="job-item-details-container">
          <div className="job-item-company-role-container">
            <img
              src={companyLogoUrl}
              alt=" job details company logo"
              className="job-item-company-logo"
            />
            <div className="job-item-title-rating-container">
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-rating-container">
                <AiFillStar className="job-item-rating-image" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-location-jobtype-package-container">
            <div className="job-item-location-jobtype-container">
              <div className="job-item-location-container">
                <MdLocationOn className="job-item-location-icon" />
                <p className="job-item-location">{location}</p>
              </div>
              <div className="job-item-jobtype-container">
                <BsBriefcaseFill className="job-item-briefcase-icon" />
                <p className="job-item-employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="job-item-package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="job-item-description-container">
            <h1 className="job-item-description-title">Description</h1>
            <a
              href={companyWebsiteUrl}
              rel="noreferrer"
              target="_blank"
              className="company-website-url"
            >
              Visit <FiExternalLink />
            </a>
          </div>
          <p className="job-item-description-content">{jobDescription}</p>
          {this.renderSkillsList()}
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-image-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        {this.renderSimilarJobsList()}
      </div>
    )
  }

  onClickItemFailureRetryButton = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetailsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="job-item-failure-view-image"
        alt="failure view"
      />
      <h1 className="job-item-details-failure-title">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-details-failure-content">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="job-item-details-failure-button"
        onClick={this.onClickItemFailureRetryButton}
      >
        Retry
      </button>
    </>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobDetailApiStatus.success:
        return this.renderJobItemDetailsView()

      case jobDetailApiStatus.failure:
        return this.renderJobItemDetailsFailureView()

      case jobDetailApiStatus.inprogress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-route">
          {this.renderJobItemDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
