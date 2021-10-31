import './App.css';
import React, { useState } from 'react';
import axios from "axios"


function App() {

  const [city, newCity] = useState('')
  const [population, newPopulation] = useState(0)
  const [area, newArea] = useState('')
  const [mayor, newMayor] = useState('')
  const [summary, newSummary] = useState('')
  const [overAllScore, newoverAllScore] = useState(0)

  const [housing, newhousing] = useState(0)


  const [cost, newCost] = useState(0)
  const [Startups, newStartups] = useState(0)
  const [ventureCapital, newventureCapital] = useState(0)
  const [TravelCon, newTravelCon] = useState(0)
  const [Commute, newCommute] = useState(0)
  const [BusinessFreedom, newBusinessFreedom] = useState(0)
  const [Safety, newSafety] = useState(0)
  const [Healthcare, newHealthcare] = useState(0)
  const [Education, newEducation] = useState(0)
  const [EnvironmentalQuality, newEnvironmentalQuality] = useState(0)
  const [Economy, newEconomy] = useState(0)
  const [Taxation, newTaxation] = useState(0)
  const [InternetAccess, newInternetAccess] = useState(0)
  const [Leisure, newLeisure] = useState(0)
  const [Tolerance, newTolerance] = useState(0)

  function returnBack() {
    document.getElementById('1').style.display = "flex"
    document.getElementById('frontPage').style.display = 'none'
    document.getElementById('2').style.display = 'none'

  }


  function getInfo() {
    newSummary('Not given')
    newMayor('Not given')
    newPopulation(0)
    newoverAllScore(0)

    document.getElementById('loadingScreen').style.display = 'block'


    var search = document.getElementById('input').value
    var newSearch = search.replace(" ", '%20')
    document.getElementById('1').style.display = 'none'
    document.getElementById('frontPage').style.display = "flex"


    axios.get("https://api.teleport.org/api/cities/?search=" + newSearch)
      .then(function (response) {
        setTimeout(waitgame, 1000)
        function waitgame() {

          document.getElementById('loadingScreen').style.animation = 'appear 2.5s ease'
          setTimeout(ease, 1000)
          function ease() {
            document.getElementById('loadingScreen').style.display = 'none'
          }


        }
        document.getElementById('1').style.display = 'none'

        var one = response.data._embedded
        var two = Object.values(one)[0]
        var citylink = Object.values(two[0]._links)
        var cityName = Object.values(two[0].matching_full_name)
        var resultCity = citylink[0].href
        newCity(cityName)

        getCitySearch(resultCity)
      })
      .catch(function (error) {
        returnBack()
        console.log(error)
      })
  }

  function getCitySearch(link) {
    axios.get(link)
      .then(function (response) {
        var urban = Object.values(response.data._links)
        newPopulation(response.data.population)
        newArea(urban[4].name)
        getCityScoresLink(urban[4].href)
      })
  }

  function getCityScoresLink(link) {
    axios.get(link)
      .then(function (response) {
        newMayor(response.data.mayor)
        var linkScore = Object.values(response.data._links)[11].href
        getScores(linkScore)
        document.getElementById('2').style.display = "grid"
      }).catch(function (error) {
        console.log(error)
      })
  }

  function getScores(link) {
    axios.get(link)
      .then(function (response) {
        var text = (((response.data.summary.replaceAll('<p>', '')).replaceAll('</p>', '')).replaceAll('<b>', '')).replaceAll('</b>', '')
        newSummary(text)
        newoverAllScore(response.data.teleport_city_score)

        newhousing(Object.values(response.data.categories)[0].score_out_of_10)
        newCost(Object.values(response.data.categories)[1].score_out_of_10)
        newStartups(Object.values(response.data.categories)[2].score_out_of_10)
        newventureCapital(Object.values(response.data.categories)[3].score_out_of_10)
        newTravelCon(Object.values(response.data.categories)[4].score_out_of_10)
        newCommute(Object.values(response.data.categories)[5].score_out_of_10)
        newBusinessFreedom(Object.values(response.data.categories)[6].score_out_of_10)
        newSafety(Object.values(response.data.categories)[7].score_out_of_10)
        newHealthcare(Object.values(response.data.categories)[8].score_out_of_10)
        newEducation(Object.values(response.data.categories)[9].score_out_of_10)
        newEnvironmentalQuality(Object.values(response.data.categories)[10].score_out_of_10)
        newEconomy(Object.values(response.data.categories)[11].score_out_of_10)
        newTaxation(Object.values(response.data.categories)[12].score_out_of_10)
        newInternetAccess(Object.values(response.data.categories)[13].score_out_of_10)
        newLeisure(Object.values(response.data.categories)[14].score_out_of_10)
        newTolerance(Object.values(response.data.categories)[15].score_out_of_10)
      })
  }

  return (
    <div className="App">
      <div id='loadingScreen'></div>
      <button onClick={() => returnBack()} id='back'>Return</button>
      <div id='1' className='search'>
        <div className='searchInputs'>
          <input autocomplete="off" type="text" placeholder='city...' id='input'></input>
          <button id='searchButton' onClick={() => getInfo()}>Search!</button>
        </div>
      </div>

      <div id="frontPage">
        <div className='contentx'>
          <h1>{city}</h1>
          <h1>Population : {population}</h1>
          <h1>Area : {area}</h1>
          <h1>Mayor : {mayor}</h1>
          <p> Summary : {summary}</p>
          <h1>Overall Score : {overAllScore.toFixed(2)}/100</h1>
        </div>
      </div>


      <div id='2' className='Scorez'>

        <div className='catagory'>

          <h2>housing : {housing.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (housing.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>
            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Cost of Living : {cost.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (cost.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Startups : {Startups.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Startups.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>
            </div>
          </div>


        </div>

        <div className='catagory'>

          <h2>Venture Capital : {ventureCapital.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (ventureCapital.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Travel connectivity : {TravelCon.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (TravelCon.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Commute : {Commute.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Commute.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Business Freedom : {BusinessFreedom.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (BusinessFreedom.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Safety : {Safety.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Safety.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Healthcare : {Healthcare.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Healthcare.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Education : {Education.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Education.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Environmental Quality : {EnvironmentalQuality.toFixed(2)}/10</h2>
          <div className='outlinebar'>
            <div style={{ width: (EnvironmentalQuality.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>


        <div className='catagory'>

          <h2>Economy : {Economy.toFixed(2)}/10</h2>
          <div className='outlinebar'>
            <div style={{ width: (Economy.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Taxation : {Taxation.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Taxation.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>

          <h2>Internet Access : {InternetAccess.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (InternetAccess.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>

          </div>
        </div>


        <div className='catagory'>

          <h2>Leisure & Culture : {Leisure.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Leisure.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>
          </div>

        </div>

        <div className='catagory'>
          <h2>Tolerance : {Tolerance.toFixed(2)}/10</h2>
          <div className='outlinebar'>

            <div style={{ width: (Tolerance.toFixed(2) * 10) + '%' }} className='bar'>
              <div id='animationBar'></div>

            </div>

          </div>
        </div>




      </div>


    </div >
  );
}

export default App;
