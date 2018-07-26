import React from 'react';
import {Rating, Image, Button, Modal } from 'semantic-ui-react';
import dish from '../../assets/dish.png';

export default ({ recipe, onClose, onUpdateRating }) => (
    recipe ? <Modal open={!!recipe} onClose={() => onClose && onClose()}>
        <Modal.Header>{recipe.title}</Modal.Header>
        <Modal.Content scrolling>
            <Image centered src={dish} size="medium" />
            <label>Rating</label><br />
            <Rating 
                icon='star'
                rating={recipe.rating} 
                maxRating={5}
                onRate={(evaluate) => {
                    recipe.rating = evaluate.target.getAttribute('aria-posinset');
                    console.log(recipe.rating);
                    return onUpdateRating && onUpdateRating(recipe)
                }}
            />
            <Modal.Description>{recipe.description}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button 
                color="green" 
                content="close" 
                onClick={() => onClose && onClose()}
            />
        </Modal.Actions>
    </Modal> : null
);