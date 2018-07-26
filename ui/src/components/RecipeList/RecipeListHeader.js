import React from 'react';
import { Button, Container, Input, Dropdown, Menu } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Increas', value: 1 },
    { key: 2, text: 'Decrease', value: 2 },
]

export default ({ onCreate, listLength, onChange, onDirectionSort, onShowShortList }) => (
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
                onClick={() => onShowShortList && onShowShortList()}
            ></Button>
            <Button.Or />
            <Menu compact color='blue'>
                <Dropdown 
                    text='Sorting' 
                    options={options} 
                    simple item   
                    onChange={(e) => onDirectionSort && onDirectionSort(e.target.innerText)} 
                />
            </Menu>
        </Button.Group>
    </Container>
)