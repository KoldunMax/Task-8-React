import React from 'react';
import chef from '../../assets/chef.jpg';
import { Image, Header, Button, Container } from 'semantic-ui-react';

export default ({onCreate}) => (
    <Container>
        <Image centered rounded src={chef} size="medium"/>
        <Header textAlign="center" as="h3">You haven't added recipes</Header>
        <Button 
            size="big" 
            content="Quickly add one!" 
            color="green" 
            onClick={() => onCreate && onCreate()} 
        /> 
    </Container>
)
