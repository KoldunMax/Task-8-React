import React from 'react';
import { Image, Button, Card, Rating} from 'semantic-ui-react';
import dish from '../../assets/dish.png';

export default ({ recipes, onEdit, onDelete, onView }) => (

<Card.Group itemsPerRow={3} centered style={{ marginTop: '.8rem' }}>
   {recipes && recipes.map((recipe, index) => (
        <Card key={index}>
            <Card.Content>
                <Image centered src={dish} style={{ marginBottom: '.5rem' }}/>
                <Card.Header>{recipe.title}</Card.Header>
                <Card.Meta><Rating 
                    icon='star'
                    defaultRating={0} 
                    maxRating={5} 
                 /></Card.Meta>
                <Card.Description>
                    {recipe.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui three buttons'>
                <Button 
                    icon="eye" 
                    floated="right" 
                    onClick={() => onView && onView(recipe._id)} 
                />
                <Button 
                    icon="pencil" 
                    floated="right" 
                    onClick={() => onEdit && onEdit(recipe._id)} 
                />
                <Button 
                    color="red" 
                    icon="trash" 
                    floated="right" 
                    onClick={() => onDelete && onDelete(recipe._id)} 
                />
                </div>
            </Card.Content>
        </Card>
    ))
    }
    </Card.Group>
)
 

