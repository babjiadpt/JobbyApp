import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import JobsCard from '../JobsCard'

import './index.css'
import FilterGroup from '../FilterGroups'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsDetailList: [],
    searchInput: '',
    employmentType: [],
    activeSalaryRangeId: '',
    apiStatus: jobsApiStatus.initial,
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: jobsApiStatus.inprogress})

    const {searchInput, employmentType, activeSalaryRangeId} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const jobsDetailsData = await response.json()

      const upDateData = {
        jobsList: jobsDetailsData.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
        totalLength: jobsDetailsData.total,
      }
      this.setState({
        jobsDetailList: upDateData,
        apiStatus: jobsApiStatus.success,
      })
    } else {
      this.setState({apiStatus: jobsApiStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobDetails()
    this.setState({searchInput: ''})
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
      this.setState({searchInput: ''})
    }
  }

  updDateEmployeeType = id => {
    const {employmentType} = this.state
    const inputNotInList = employmentType.filter(eachItem => eachItem === id)
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getJobDetails,
      )
    } else {
      const filteredData = employmentType.filter(eachItem => eachItem !== id)

      this.setState({employmentType: filteredData}, this.getJobDetails)
    }
  }

  updDateSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRangeId: activeSalaryRange}, this.getJobDetails)
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          data-testid="searchButton"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onKeyDownSearchInput}
        />
        <button
          type="button"
          className="search-icon-sm"
          onClick={this.onClickSearchButton}
        >
          <BsSearch siz="18" />
        </button>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {jobsDetailList} = this.state
    const showJobsList = jobsDetailList.totalLength > 0

    return (
      <>
        {showJobsList ? (
          <ul className="jobs-list-container">
            {jobsDetailList.jobsList.map(eachJob => (
              <JobsCard jobItem={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsData()
        )}
      </>
    )
  }

  renderNoJobsData = () => (
    <div className="no-jobs-data-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-title">No jobs Found</h1>
      <p className="no-jobs-content">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  onClickFailureRetryButton = () => {
    this.getJobDetails()
  }

  renderJobDetailsFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="job-details-failure-title">Oops! Something Went Wrong</h1>
      <p className="job-details-failure-content">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="job-details-failure-button"
        onClick={this.onClickFailureRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="jobs-details-loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobsApiStatus.success:
        return this.renderJobDetailsView()

      case jobsApiStatus.failure:
        return this.renderJobDetailsFailureView()

      case jobsApiStatus.inprogress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="responsive-view-container">
            <div className="search-profile-filters-container">
              <div className="mobile-view-search-container">
                {this.renderSearchInput()}
              </div>
              <Profile />
              <hr className="line" />
              <FilterGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                updDateEmployeeType={this.updDateEmployeeType}
                updDateSalaryRange={this.updDateSalaryRange}
              />
            </div>
            <div className="job-card-details-container">
              <div className="desktop-search-container">
                <input
                  type="search"
                  className="search-input-desktop"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDownSearchInput}
                />

                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-button-container-desktop"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderApiStatus()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
