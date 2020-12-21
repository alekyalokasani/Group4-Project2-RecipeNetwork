import React, { useState, useEffect } from "react";
import { allRecipes } from "../apiCalls/recipes";
import {
  Col,
  Row,
  Card,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/cardStyling.css";

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    allRecipes().then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setRecipes(data);
      }
    });
  }, []);

  const filterRecipes = recipes.filter((recipe) => {
    return recipe.recipe_title.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <Col className='my-5'>
      <h3 style={{ textAlign: "center" }}>All recipes</h3>
      <Row>
        <Col md={5} style={{ marginLeft: "25em" }} className='my-5'>
          <InputGroup>
            <input
              placeholder='search a recipe'
              type='text'
              onChange={(e) => setSearch(e.target.value)}
              style={{ color: "black", borderBottom: "2px #000000 solid" }}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {/* <Col> */}
        <h4 style={{ marginLeft: "auto" }}>
          <Link to='/newRecipe'>
            <i className='fas fa-plus-circle'></i>
            Create a recipe
          </Link>
        </h4>
        {/* </Col> */}
      </Row>
      <Row>
        {filterRecipes
          ? filterRecipes.map((recipe, index) => (
              <Card
                className='my-3 p-3 rounded'
                style={{ width: "18rem", margin: "2em", background: "#F2F7FA" }}
                key={index}
              >
                {/* <Link to={`recipe/${recipe.recipe_id}`}>
                  <Card.Img
                    variant='top'
                    src='https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGl6emF8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60'
                    style={{ matgin: "0 auto" }}
                  />
                </Link> */}

                <Link to={`recipe/${recipe.recipe_id}`}>
                  <Card.Title>
                    <strong>{recipe.recipe_title}</strong>
                  </Card.Title>
                </Link>

                <Card.Text className='ingrediants'>
                  Ingrediants:{recipe.recipe_ingredients}
                </Card.Text>
                <Card.Text>posted by:{recipe.name}</Card.Text>
              </Card>
            ))
          : undefined}
      </Row>
    </Col>
  );
};

export default AllRecipesPage;
