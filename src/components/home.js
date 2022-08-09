import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Spinner, Card, CardImg, CardBody, CardTitle, Button, Input } from "reactstrap"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Home(props) {
  const [userData, setData] = useState([])
  const [searchText, setSearchText] = useState("avocado")
  const [mealType, setMealType] = useState("breakfast")
  const [startSearching, setStartSearching] = useState(false)
  const [page, setPage] = useState(0)
  const fetchingData = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.hits)
        setData(data.hits)
      })
  }
  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  const handleSearch = () => {
    setStartSearching(!startSearching)

  }
  const handleChangeMealtype = (event) => {
    setMealType(event.target.value);
  };
  const sendObject = (item) => {
    props.bringCardObject(item)
  }
  useEffect(() => {
    const apiID = "901e6b6a"
    const apiKey = "0c490cc125cd01592c30205615da2c02"
    const url = `https://api.edamam.com/search?q=${searchText}&app_id=${apiID}&app_key=${apiKey}&mealType=${mealType}`
    fetchingData(url)
  }, [startSearching])
  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-sm-5">

          <div className="d-flex">
            <Input onChange={handleChange} value={searchText}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Meal type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mealType}
                  label="mealType"
                  onChange={handleChangeMealtype}
                >
                  <MenuItem value='breakfast'>Breakfast</MenuItem>
                  <MenuItem value='lunch'>Lunch</MenuItem>
                  <MenuItem value='dinner'>Dinner</MenuItem>
                  <MenuItem value='snack'>Snack</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button color="primary" onClick={handleSearch}>Search</Button>
          </div>

        </div>
      </div>
      <div className="row mt-5">

        {
          userData.length ?
            userData.slice(page * 4, 4 + page * 4).map(item => {
              return (
                <div className="col-12 col-sm-3 mb-2">

                  <Card>
                    <CardImg
                      alt="Card image cap"
                      src={item.recipe.image}
                      top
                      width='100%'
                    // height='120'
                    />
                    <CardBody>
                      <CardTitle tag="h5">
                        {item.recipe.label.slice(0, 20)}...
                      </CardTitle>
                      <Link to="/details/recipe">
                        <Button onClick={() => sendObject(item)}>
                          More...
                        </Button>
                      </Link>
                    </CardBody>
                  </Card>
                </div>
              )
            }) : <Spinner>
              Loading...
            </Spinner>
        }

      </div>
      <div>

        <Button color="primary" onClick={() => setPage(page - 1)}>Prev</Button>
        <Button color="primary" onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </>
  )
}

export default Home;

// https://jsonplaceholder.typicode.com/todos
// fetch data from this given api : >> todos titles
