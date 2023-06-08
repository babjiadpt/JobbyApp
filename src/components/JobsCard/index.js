import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsCard = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} className="card-item">
      <li className="job-card-container">
        <div className="company-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-card-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-image" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-jobtype-package-container">
          <div className="location-jobtype-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="jobtype-container">
              <BsBriefcaseFill className="briefcase-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobsCard
