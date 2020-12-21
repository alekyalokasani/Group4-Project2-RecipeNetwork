import React, { useState, useEffect } from "react";
import { deleteRecipe, getUserRecipes } from "../apiCalls/recipes";
import { isAutheticated } from "../apiCalls/login";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../Styles/cardStyling.css";

const UserRecipes = () => {
  const { data } = isAutheticated();
  const [userRecipes, setUserRecipes] = useState([]);

  const getURecipes = () => {
    getUserRecipes(data.user_id)
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
        } else {
          setUserRecipes(data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getURecipes();
  }, [data.user_id]);

  const deleteARecipe = (recipe_id) => {
    deleteRecipe(recipe_id).then((data) => {
      getURecipes();
    });
  };
  return (
    <Row className='userrecipes'>
      {/* <Col md={5} lg={2}> */}
      {userRecipes.map((userRecipe, index) => (
        <Card
          className='my-3 p-3 rounded'
          style={{ width: "18rem", margin: "2em", background: "#F2F7FA" }}
          key={index}
        >
          <Card.Img
            variant='top'
            src='https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGl6emF8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60'
            style={{ matgin: "0 auto" }}
          ></Card.Img>
          <Card.Body>
            <Card.Title>{userRecipe.recipe_title}</Card.Title>
            <Card.Text>{userRecipe.recipe_description}</Card.Text>
            <Button
              variant='danger'
              onClick={() => {
                deleteARecipe(userRecipe.recipe_id);
              }}
            >
              Delete Recipe
            </Button>
          </Card.Body>
        </Card>
      ))}
      {/* </Col> */}
    </Row>
  );
};

export default UserRecipes;
