import './index.css'

const FilterGroup = props => {
  const renderEmployeeList = () => {
    const {employmentTypesList} = props

    return (
      <ul className="list-container">
        {employmentTypesList.map(eachType => {
          const {updDateEmployeeType} = props

          const onChangeEmployee = () => {
            updDateEmployeeType(eachType.employmentTypeId)
          }

          return (
            <>
              <li key={eachType.employmentTypeId} className="list-item">
                <input
                  type="checkbox"
                  id={eachType.employmentTypeId}
                  onChange={onChangeEmployee}
                />
                <label htmlFor={eachType.employmentTypeId} className="label">
                  {eachType.label}
                </label>
              </li>
            </>
          )
        })}
      </ul>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <ul className="list-container">
        {salaryRangesList.map(eachSalaryRange => {
          const {updDateSalaryRange} = props

          const onChangeSalaryRange = () => {
            updDateSalaryRange(eachSalaryRange.salaryRangeId)
          }
          return (
            <li key={eachSalaryRange.salaryRangeId} className="list-item">
              <input
                type="radio"
                name="option"
                id={eachSalaryRange.salaryRangeId}
                onChange={onChangeSalaryRange}
              />
              <label htmlFor={eachSalaryRange.salaryRangeId} className="label">
                {eachSalaryRange.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <h1 className="filter-type-title">Type of Employment</h1>
      {renderEmployeeList()}
      <hr className="line" />
      <h1 className="filter-type-title">Salary Range</h1>
      {renderSalaryRange()}
    </>
  )
}

export default FilterGroup
