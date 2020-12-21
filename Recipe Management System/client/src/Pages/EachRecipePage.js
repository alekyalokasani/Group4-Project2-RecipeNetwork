import React, { useState, useEffect } from "react";
import { getARecipe } from "../apiCalls/recipes";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup } from "react-bootstrap";

const EachRecipePage = ({ match }) => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getARecipe(match.params.id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRecipe(data);
      }
    });
  }, []);
  return (
    <div>
      <Col lg={2}>
        <Link
          className='btn btn-dark my-3'
          style={{ marginRight: "3em" }}
          to='/'
        >
          Go Back
        </Link>
      </Col>

      <Row className='my-3' center>
        {/* <Col md={6}>
          <img
            src='https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGl6emF8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60'
            alt='pizza'
            height='70%'
            width='70%'
            fluid
          />
        </Col> */}
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <strong>Recipe name:</strong>

              {recipe.recipe_title}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Ingredients:</strong>
              {recipe.recipe_ingredients}
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              <strong>Process:</strong>
              {recipe.recipe_description}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup variant='flush' className='my-2'>
            <ListGroup.Item>
              <strong>Posted by:</strong>

              {recipe.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong>
              {recipe.email}
            </ListGroup.Item>{" "}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default EachRecipePage;
