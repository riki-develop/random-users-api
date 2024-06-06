const fetchData = async (url) => {
  const outputElement = document.getElementById('output')
  outputElement.innerHTML = ''

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {}
    })
    console.log('Status code: ', response.status)

    if(!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }

    const jsonData = await response.json()
    console.table(jsonData);

    jsonData.results.map((user, index) => {
      const id = index + 1
      const picture = user.picture.medium
      const name = `${user.name.first} ${user.name.last}`
      const age = user.dob.age
      const gender = user.gender
      const nat = user.nat.toLowerCase()
      const address = `${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`
      const email = user.email

      const newRow = document.createElement('tr')
      newRow.innerHTML = `
        <td><img src="${picture}" alt="User picture"><br><span>${id}</span></td>
        <td>${name}</td>
        <td>${age}</td>
        <td>${gender}</td>
        <td><img src="https://flagcdn.com/20x15/${nat}.png"> ${address}</td>
        <td>${email}</td>
      `

      outputElement.appendChild(newRow)
    })
  } catch(error) {
    console.error('Fetch error: ', error.message)
  }
}

const handleFormSubmit = () => {
  console.log('DOM loaded')

  const userForm = document.getElementById('user-form')
  userForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const userCount = document.getElementById('user-count').value
    fetchData(`https://api.randomuser.me/?results=${userCount}`)

    console.log('Submited: ', `${userCount} data requested`)
  })
}

document.addEventListener('DOMContentLoaded', handleFormSubmit)
