import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import FormComponent from "../Components/FormComponent";
import { createRecipe } from "../apiCalls/recipes";
import { isAutheticated } from "../apiCalls/login";

const { data } = isAutheticated();

const NewRecipePage = () => {
  const [recipe, setRecipe] = useState({
    recipe_title: "",
    recipe_ingredients: "",
    recipe_description: "",
    recipe_type: "",
    error: "",
    success: false,
  });

  let {
    recipe_title,
    recipe_ingredients,
    recipe_description,
    recipe_type,
    success,
  } = recipe;

  const handleCreateRecipe = (name) => (event) => {
    setRecipe({
      ...recipe,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    // event.preventDefault();
    // setRecipe({ ...recipe, error: false });
    createRecipe(data.user_id, recipe)
      .then((data) => {
        if (data.errors) {
          setRecipe({
            ...recipe,
            error: data.errors,
            success: false,
          });
        } else {
          setRecipe({
            ...recipe,
            recipe_title: "",
            recipe_ingredients: "",
            recipe_description: "",
            recipe_type: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? "" : "none" }}
          >
            New recipe created
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h4>New recipe page</h4>
      {successMessage()}
      <FormComponent>
        <Form className='form-box'>
          <Form.Group className='my-2'>
            <input
              type='text'
              value={recipe_title}
              onChange={handleCreateRecipe("recipe_title")}
              placeholder='Enter recipe title'
            />
          </Form.Group>
          <Form.Group className='my-2'>
            <input
              type='text'
              onChange={handleCreateRecipe("recipe_ingredients")}
              value={recipe_ingredients}
              placeholder='Enter recipe ingredients '
            />
          </Form.Group>
          <Form.Group className='my-2'>
            <input
              type='text'
              onChange={handleCreateRecipe("recipe_description")}
              value={recipe_description}
              placeholder='Enter recipe description '
            />
          </Form.Group>

          <Form.Group className='my-2'>
            <input
              type='text'
              onChange={handleCreateRecipe("recipe_type")}
              value={recipe_type}
              placeholder='Enter recipe type'
            />
          </Form.Group>

          <Row className='my-4'>
            <Col>
              <input
                type='submit'
                name=''
                onClick={onSubmit}
                value='Create recipe'
              />
            </Col>
          </Row>
        </Form>
      </FormComponent>
    </div>
  );
};

export default NewRecipePage;
