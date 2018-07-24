import React from 'react';
import { Button, Container, Statistic } from 'semantic-ui-react';

export default ({ onCreate, listLength }) => (
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Statistic size="mini">
            <Statistic.Value>{listLength}</Statistic.Value>
            <Statistic.Label>{listLength === 1 ? 'recipe' : 'recipes'}</Statistic.Label>
        </Statistic>
        <Button 
            icon="plus" 
            content="Add recipe" 
            color="green" 
            onClick={() => onCreate && onCreate()}
        >
        </Button>
    </Container>
)