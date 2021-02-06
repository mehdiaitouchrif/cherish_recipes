import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	recipeListReducer,
	recipeDetailsReducer,
	userRecipesReducer,
	recipeCreateReducer,
	recipeDeleteReducer,
	recipeUpdateReducer,
	recipeFiltredReducer,
	recentlyViewedReducer,
} from './reducers/recipeReducers'

import {
	reviewListReducer,
	userReviewsReducer,
	reviewCreateReducer,
	reviewUpdateReducer,
	reviewDeleteReducer,
	recipeReviewsReducer,
	singleReviewReducer,
} from './reducers/reviewReducers'

import {
	loginReducer,
	signupReducer,
	userDetailsReducer,
	detailsUpdateReducer,
	passwordUpdateReducer,
	passwordForgotReducer,
	passwordResetReducer,
	emailConfirmationReducer,
	userConfirmEmailReducer,
	accountDeleteReducer,
} from './reducers/authReducers'

const reducer = combineReducers({
	recipeList: recipeListReducer,
	recipeFiltred: recipeFiltredReducer,
	recipeDetails: recipeDetailsReducer,
	userRecipes: userRecipesReducer,
	recipeCreate: recipeCreateReducer,
	recipeUpdate: recipeUpdateReducer,
	recipeDelete: recipeDeleteReducer,
	recentlyViewed: recentlyViewedReducer,
	userLogin: loginReducer,
	userSignup: signupReducer,
	userDetails: userDetailsReducer,
	detailsUpdate: detailsUpdateReducer,
	passwordUpdate: passwordUpdateReducer,
	passwordForgot: passwordForgotReducer,
	passwordReset: passwordResetReducer,
	emailConfirmation: emailConfirmationReducer,
	userConfirmEmail: userConfirmEmailReducer,
	accountDelete: accountDeleteReducer,
	reviewList: reviewListReducer,
	userReviews: userReviewsReducer,
	recipeReviews: recipeReviewsReducer,
	reviewCreate: reviewCreateReducer,
	reviewUpdate: reviewUpdateReducer,
	reviewDelete: reviewDeleteReducer,
	singleReview: singleReviewReducer,
})

const userInfoLS = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const recentlyViewedLS = localStorage.getItem('recentlyViewed')
	? JSON.parse(localStorage.getItem('recentlyViewed'))
	: []

const initialState = {
	userLogin: { userInfo: userInfoLS },
	recentlyViewed: { recentlyViewed: recentlyViewedLS },
}

const middleweare = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleweare))
)

export default store
