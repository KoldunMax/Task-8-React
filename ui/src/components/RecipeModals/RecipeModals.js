import React from 'react';
import {Image, Rating ,Card, Feed, Button, Modal } from 'semantic-ui-react';
import dish from '../../assets/dish.png';

export default ({ recipes, onClose, onUpdateRating }) => (
    recipes ? <Modal open={!!recipes} onClose={() => onClose && onClose()} style={{width: '30%'}}>
        <Card.Content>
            <Card.Header>Short list of recipes</Card.Header>
        </Card.Content>
        <Card.Content>
            <Feed>
                {
                    recipes && recipes.map((recipe, index) => (
                        <Feed.Event key={index}>
                        <Image style={{height: '64px', width: '64px'}} floated='left' src={dish} />
                        <Feed.Content>
                          <Feed.Date content={recipe.title} />
                          <Feed.Summary>
                            <p>{recipe.description}</p>
                            <label>Rating: </label>
                            <Rating 
                                icon='star'
                                rating={recipe.rating} 
                                maxRating={5}
                                onRate={(evaluate) => {
                                    recipe.rating = evaluate.target.getAttribute('aria-posinset');
                                    return onUpdateRating && onUpdateRating(recipe)
                                }}
                            />
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    ))
                }
            </Feed>
        </Card.Content>

        <Modal.Actions>
                    <Button 
                        color="green" 
                        content="close" 
                        onClick={() => onClose && onClose()}
                    />
        </Modal.Actions>
    </Modal> : null
);