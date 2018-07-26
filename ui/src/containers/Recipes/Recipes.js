import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Image, Grid, Segment } from 'semantic-ui-react';
import { fetchAllRecipes, deleteRecipe, updateRecipeRating } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import logo from '../../assets/logo.png';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeListHeader from '../../components/RecipeList/RecipeListHeader';
import EmptyRecipeList from '../../components/RecipeList/EmptyRecipeList';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import RecipeModals from '../../components/RecipeModals/RecipeModals';
import './Recipes.css';

class Recipes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRecipe: null,
            searchValue: '',
            directionOfSort: '',
            activeShortRecipes: null
        };
    }

    componentDidMount() {
        this.props.actions.fetchAllRecipes();
    }

    setSearchValue = searchLetter => {
        this.setState({
            searchValue: searchLetter
        })
    }

    handleDelete = (id) => {
        this.props.actions.deleteRecipe(id);
    }

    handleEdit = id => {
        this.props.history.push(`/recipes/${id}`);
    }

    handleRecipeCreate = () => {
        this.props.history.push(`/recipes/new`);
    }
    handleUpdateRating = (recipe) => {
        this.props.actions.updateRecipeRating(recipe);
    }

    toggleRecipeModal = id => {
        this.setState({
            activeRecipe: this.props.allRecipes.find(r => r._id === id)
        })
    }

    handleModalClose = () => {
        this.toggleRecipeModal(null);
        this.setState({
            activeShortRecipes: null
        })
    }

    handleSort = (e) => {
        this.setState({
            directionOfSort: e
        })
    }

    filterList = (searchValue, allRecipes) => {
        var filteredList = [];
        
        if(searchValue) {
            for (let i = 0; i < allRecipes.length; i++) {
                let a = allRecipes[i];
                if (a.title.toUpperCase().indexOf(searchValue.toUpperCase()) > -1) {
                    filteredList.push(allRecipes[i]);
                }
            }
            return filteredList;   
        } else {
            return allRecipes
        }            
    }

    onShowShortList = () => {
        this.setState({
            activeShortRecipes: this.props.allRecipes
        });
    }

    sorting(arrayOfRecipes, directionOfSort) {
        
        if(directionOfSort == "Increas"){

            return arrayOfRecipes.sort(function(a, b) {
                return  b.rating - a.rating
            }) 
        }

        if(directionOfSort == "Decrease"){

            return arrayOfRecipes.sort(function(a, b) {
                return  a.rating - b.rating
            }) 
        }

        return arrayOfRecipes;
    }

    showState = () => {
        console.log(this.state.searchValue);
    }

    render() {
        const { isFetching, allRecipes } = this.props;
        const { activeRecipe, searchValue, directionOfSort, activeShortRecipes} = this.state;

        let filteredMassiveOfRecipes = this.filterList(searchValue, allRecipes);
        let sortedMas = this.sorting(filteredMassiveOfRecipes, directionOfSort);
        return (<Container>
            <Grid centered columns={1}>
                <Grid.Column>
                    <Image src={logo} centered />
                </Grid.Column>
                <Grid.Row>
                    <Grid.Column>
                        <Segment raised padded textAlign="center" loading={isFetching}>
                            {!allRecipes.length && !isFetching
                                ? <EmptyRecipeList 
                                    onCreate={this.handleRecipeCreate} 
                                />
                                : <React.Fragment>
                                    <RecipeListHeader 
                                        onCreate={this.handleRecipeCreate} 
                                        listLength={allRecipes.length} 
                                        onChange={this.setSearchValue}
                                        onDirectionSort={this.handleSort} 
                                        onShowShortList={this.onShowShortList}
                                    />
                                    <RecipeList
                                        recipes={sortedMas}
                                        onUpdateRating={this.handleUpdateRating}
                                        onView={this.toggleRecipeModal} 
                                        onDelete={this.handleDelete} 
                                        onEdit={this.handleEdit}
                                    />
                                </React.Fragment>
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <RecipeModal 
                recipe={activeRecipe} 
                onClose={this.handleModalClose} 
                onUpdateRating={this.handleUpdateRating}
            />
            <RecipeModals
                recipes={activeShortRecipes} 
                onClose={this.handleModalClose} 
                onUpdateRating={this.handleUpdateRating}
            />
        </Container>)
    }
}

Recipes.propTypes = {
    allRecipes: PropTypes.array,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}
const mapStateToProps = state => ({
    allRecipes: allRecipes(state),
    isFetching: isRecipesFetching(state)
});


const mapDispatchToProps =  dispatch => ({
    actions: bindActionCreators({fetchAllRecipes, deleteRecipe, updateRecipeRating}, dispatch)
});

export default connect(mapStateToProps,  mapDispatchToProps)(Recipes);
