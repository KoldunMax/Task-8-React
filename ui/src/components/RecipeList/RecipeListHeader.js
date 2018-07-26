import React from 'react';
import { Button, Container, Input, Dropdown, Menu } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'No sort', value: 1 },
    { key: 2, text: 'Up to Down', value: 2 },
    { key: 3, text: 'Down to up', value: 3 },
]

export default ({ onCreate, listLength, onChange }) => (
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    
        <Button
            content={listLength === 1 ? 'Recipe' : 'Recipes'}
            icon='food'
            label={{ as: 'a', basic: true, pointing: 'right', content: listLength }}
            labelPosition='left'
        />
        <Input 
            style={{width: '30%'}}
            icon='search' 
            placeholder='Search...' 
            onChange={e => onChange && onChange(e.target.value)}
        />
        <Button.Group>
            <Button
                icon="plus" 
                content="Add recipe" 
                color="green" 
                onClick={() => onCreate && onCreate()}
            >    
            </Button>
            <Button.Or />
            <Button
                icon="list" 
                content="Show recipes" 
                color="purple" 
            ></Button>
            <Button.Or />
            <Menu compact color='blue'>
                <Dropdown 
                    text='Sorting' 
                    options={options} 
                    simple item     
                />
            </Menu>
        </Button.Group>
    </Container>
)