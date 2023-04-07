
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  
  // setting date condition
  const choiceDate = new Date(`${choice}`);
  console.log(choiceDate)
  const dateLimit = new Date("1996-01-01")
  console.log(dateLimit)
  const todaysDate = new Date()
  
  if(choiceDate > dateLimit && choiceDate < todaysDate){

    // To empty data on each request
    document.querySelector('img').src = ''
    document.querySelector('iframe').src = ''
    document.querySelector('.explanation').innerText = ''
    document.querySelector('.explanation').style.padding = '0rem'
    document.querySelector('p').classList.remove('error')
    //
    
    const url = `https://api.nasa.gov/planetary/apod?api_key=qWCRPmj5gDod3u6MJFLykXRQVMAmMrGfIU2iV1my&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        // condition for setting image or video
        if(data.media_type === 'image'){
          document.querySelector('img').src = data.hdurl
          document.querySelector('.explanation').style.padding = '1rem'
          document.querySelector('iframe').src = ''
        }else if (data.media_type === 'video'){
          document.querySelector('img').src = ''
          document.querySelector('iframe').classList.remove('hidden')
          document.querySelector('iframe').src = data.url
          document.querySelector('.explanation').style.padding = '1rem'

        }
        document.querySelector('.explanation').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });



  } else {
    console.log("out")
    document.querySelector('img').src = ''
    document.querySelector('iframe').src = ''
    document.querySelector('.explanation').innerText = ''
    document.querySelector('.explanation').style.padding = '0rem'
    document.querySelector('p').classList.toggle('error')
  }

  
}

